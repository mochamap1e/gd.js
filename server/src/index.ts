import fs from "fs";
import { Elysia } from "elysia";

import { dailyLevelJob } from "@server/cron/dailyLevel";

import { common } from "@server/endpoints/common";
import { accounts } from "@server/endpoints/accounts";

import { GDError } from "@server/utils/errors";

export function getServerAddress() {
    if (!GDPS.server) return;
    return `https://${GDPS.server.hostname}:${GDPS.server.port}`;
}

const GDPS = new Elysia({
        serve: {
            tls: {
                cert: fs.readFileSync("certs/cert.pem"),
                key: fs.readFileSync("certs/key.pem")
            }
        }
    })

    // lifecycle
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

    // cron jobs
    .use(dailyLevelJob)
    
    // endpoints
    .use(common)
    .use(accounts)

    // error for undefined routes
    .all("*", () => GDError.Generic)

    .listen(4500, ({ port }) => console.log("GDPS running on port", port));