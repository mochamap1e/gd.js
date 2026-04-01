// https://wyliemaster.github.io/gddocs/#/endpoints/endpoints

import fs from "fs";
import axios from "axios";
import { Elysia } from "elysia";

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
        const url = `http://www.boomlings.com/database/${endpoint}.php`;

        console.log("path:", endpoint);
        console.log("url:", url);
        console.log("body:", body);

        body = new URLSearchParams(Object.fromEntries(Object.entries(body).map(([key, value]) => [key, Array.isArray(value) ? value.join(",") : value]))).toString();

        try {
            const response = await axios.post(url, body, {
                validateStatus: () => true,
                headers: {
                    "User-Agent": "",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const code = await response.status;
            console.log("GD response code:", code);
            console.log("GD response data:", response.data)
            return response.data;
        } catch(error) {
            console.error(error);
            return null;
        }

        /*
        switch (endpoint) {
            case "getGJDailyLevel": // Returns the index of the current daily level and the time left in seconds, separated by a pipe.
                return "1|1";
            default:
                const response = await fetch(`https://www.boomlings.com/database/${endpoint}`, {
                    method: "POST",
                    headers: {
                        "User-Agent": "",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: body as any
                });

                const responseText = await response.text();

                console.log("GD response:", responseText);

                return responseText;
        }
        */
    })
    .listen(PORT);

console.log("GD backend running on port", PORT);