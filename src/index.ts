// https://wyliemaster.github.io/gddocs/#/endpoints/endpoints

import fs from "fs";
import path from "path";
import axios from "axios";
import { Elysia } from "elysia";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpointHandlers: Record<string, any> = {};

for (const endpoint of fs.readdirSync(path.join(__dirname, "endpoints"))) {
    const module = await import(path.join(__dirname, "endpoints", endpoint));
    endpointHandlers[endpoint.replace(".ts", "")] = module.default;
}

const PORT = 4500;

new Elysia({
    serve: {
        tls: {
            cert: fs.readFileSync("cert.pem"),
            key: fs.readFileSync("key.pem")
        }
    }
})
    .post("*", async ({ request, body }) => {
        const endpoint = new URL(request.url).pathname.replace("/", "").replace(".php", "");
        console.log("path:", endpoint);

        if (endpointHandlers[endpoint]) {
            return endpointHandlers[endpoint](body);
        }

        // @ts-ignore
        const fixedBody = new URLSearchParams(Object.fromEntries(Object.entries(body).map(([key, value]) => [key, Array.isArray(value) ? value.join(",") : value]))).toString();
        const url = `http://www.boomlings.com/database/${endpoint}.php`;

        try {
            const response = await axios.post(url, fixedBody, {
                validateStatus: () => true,
                headers: {
                    "User-Agent": "",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const code = await response.status;
            console.log("GD response code:", code);
            console.log("GD response data:", response.data);
            return response.data;
        } catch(error) {
            console.error(error);
            return null;
        }
    })
    .listen(PORT);

console.log("GD backend running on port", PORT);