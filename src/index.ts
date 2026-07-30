// https://boomlings.dev i love you <3

import fs from "fs";
import { Elysia } from "elysia";

import { dailyLevelJob } from "./cron/dailyLevel";

import { common } from "./endpoints/common";
import { accounts } from "./endpoints/accounts";
import { GDError } from "./utils/errors";

new Elysia({
        serve: {
            tls: {
                cert: fs.readFileSync("certs/cert.pem"),
                key: fs.readFileSync("certs/key.pem")
            }
        }
    })
    .guard({
        beforeHandle({ request, body, redirect }) {
            console.log("Requested:", request.url);
            console.log("Body:", body);

            if (request.url.includes("database")) // some requests such as backing up data go to /database
                return redirect(request.url.replace("/database", ""), 308); // 308 preserves data unlike 301 smh!
        },
        afterHandle({ responseValue }) {
            console.log("Response:", responseValue);
        }
    })

    .use(dailyLevelJob)
    
    .use(common)
    .use(accounts)

    // return error for undefined routes
    .all("*", () => GDError.Generic)

    .listen(4500, ({ port }) => console.log("Server running on port", port));