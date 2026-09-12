import { Elysia } from "elysia";

import { config } from "@server/lib/config";

export const getInfo = new Elysia()
    .get("/getInfo.php", () => {
        return {
            motd: config.get("gdps_name"),
            icon: config.get("gdps_icon"),
            version: 1
        };
    });