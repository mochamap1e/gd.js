import fs from "fs";
import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";

import { dailyLevelJob } from "@server/cron/dailyLevel";

import { common } from "@server/endpoints/common";
import { accounts } from "@server/endpoints/accounts";
import { switcher } from "@server/endpoints/switcher";

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

    // block invalid requests (no valid ip, has user agent)
    .resolve(({ request, server, status }) => {
        const ip = request.headers.get("CF-Connecting-IP") || server?.requestIP(request)?.address;
        const hasUserAgent = ![null, ""].includes(request.headers.get("User-Agent"));

        if (!ip) { return status(400); }
        if (hasUserAgent) { return status(403); }

        return { ip };
    })

    // lifecycle
    .guard({
        beforeHandle({ request, body, redirect }) {
            console.log("Requested:", request.url);
            console.log("Body:", body);

            // route /database to / (account endpoints use /database)
            if (request.url.includes("database")) {
                return redirect(request.url.replace("/database", ""), 308);
            }
        },
        afterHandle({ responseValue }) {
            console.log("Response:", responseValue);
        }
    })

    // rate limit (2 requests per second)
    .use(rateLimit({
        // apply rate limit per route instead of across the entire api
        generator: (request, _, derived) => {
            return `${request.url} / ${derived.ip}`;
        },
        duration: 1000,
        max: 2
    }))

    // cron jobs
    .use(dailyLevelJob)
    
    // endpoints
    .use(common)
    .use(accounts)
    .use(switcher)

    // 404 for undefined routes
    .all("*", ({ status }) => { return status(404); })

    // run
    .listen(4500, ({ port }) => console.log("GDPS running on port", port));