import fs from "fs";
import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { staticPlugin } from "@elysiajs/static";

import { dailyLevelJob } from "./cron/dailyLevel";

import { common } from "./endpoints/common";
import { accounts } from "./endpoints/accounts";
import { panel } from "./endpoints/panel";

import { GDError } from "./utils/errors";

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

    // cdn
    .use(staticPlugin({
        assets: "./cdn",
        prefix: "/cdn"
    }))

    // cron jobs
    .use(dailyLevelJob)
    
    // endpoints
    .use(common)
    .use(accounts)

    // error for undefined routes
    .all("*", () => GDError.Generic)

    .listen(4500, ({ port }) => console.log("GDPS running on port", port));

const panelServer = new Elysia()
    // cors
    .use(cors({
        origin: "http://localhost:5173" // Change later ok? ok.
    }))

    // api
    .use(panel)

    .listen(4501, ({ port }) => console.log("Panel running on port", port));

export type Panel = typeof panelServer;