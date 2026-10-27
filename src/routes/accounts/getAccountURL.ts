import Elysia from "elysia";

import { config } from "@server/lib/config";
import { gd } from "@server/lib/middleware";

export const getAccountURL = new Elysia()
    .use(gd)
    .post("/getAccountURL.php", () => {
        return config.get("gdps_url");
    }, {
        secret: "Common"
    });