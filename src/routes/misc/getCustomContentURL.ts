import Elysia from "elysia";

import { config } from "@server/lib/config";

const url = config.get("cdn_url");

export const getCustomContentURL = new Elysia()
    .post("/getCustomContentURL.php", () => {
        return url;
    });