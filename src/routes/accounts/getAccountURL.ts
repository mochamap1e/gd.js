import Elysia from "elysia";

import { config } from "@server/config";
import { gd } from "@server/middleware";

export const getAccountURL = new Elysia()
    .use(gd)
    .post("/getAccountURL.php", () => {
        return config.get("gdps_url");
    }, {
        secret: "Common"
    });