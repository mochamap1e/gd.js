// https://boomlings.dev i love you <3

import fs from "fs";
import { Elysia } from "elysia";

import { accounts } from "./endpoints/accounts";

new Elysia({
        serve: {
            tls: {
                cert: fs.readFileSync("certs/cert.pem"),
                key: fs.readFileSync("certs/key.pem")
            }
        }
    })

    .use(accounts)
    
    .all("*", async ({ request, body }) => {
        console.log("Requested:", request.url);
        console.log("Body:", body);
        return "-1";
    })

    .listen(4500, ({ port }) => console.log("Server running on port", port));