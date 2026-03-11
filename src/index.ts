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
        const endpoint = new URL(request.url).pathname.replace("/", "").replace(".php", "")

        console.log("path:", endpoint);

        console.log("request:", request);
        console.log("body:", body);

        const response = await axios.post(`https://www.boomlings.com/database/${endpoint}.php`, body,
            {
                headers: {
                    "User-Agent": "",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const data = await response.data;

        console.log("GD response:", data);

        return data;

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