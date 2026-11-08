import Elysia from "elysia";

import { config } from "@server/lib/config";

export const getCustomContentURL = new Elysia()
    .post("/getCustomContentURL.php", () => {
        return config.get("cdn_url");
    });