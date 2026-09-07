import fs from "fs";
import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";

import { dailyLevelJob } from "@server/cron/dailyLevel";

import { common } from "@server/endpoints/common";
import { accounts } from "@server/endpoints/accounts";
import { switcher } from "@server/endpoints/switcher";

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
        beforeHandle({ request, body, status, redirect }) {
            console.log("Requested:", request.url);
            console.log("Body:", body);
            
            // require null/blank user agent
            if (![null, ""].includes(request.headers.get("User-Agent"))) {
                return status(403);
            }

            // route /database to / (account endpoints use /database)
            if (request.url.includes("database")) {
                return redirect(request.url.replace("/database", ""), 308);
            }
        },
        afterHandle({ responseValue }) {
            console.log("Response:", responseValue);
        }
    })

    // cron jobs
    .use(dailyLevelJob)

    // rate limit
    .use(rateLimit({
        duration: 1000,
        max: 2
    }))
    
    // endpoints
    .use(common)
    .use(accounts)
    .use(switcher)

    // 404 for undefined routes
    .all("*", ({ status }) => { return status(404); })

    .listen(4500, ({ port }) => console.log("GDPS running on port", port));