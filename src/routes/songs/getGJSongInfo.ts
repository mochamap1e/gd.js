import Elysia from "elysia";

import { boomlingsRequest } from "@server/lib/proxy";

export const getGJSongInfo = new Elysia()
    .post("/getGJSongInfo.php", async ({ body }) => {
        try {
            const response = await boomlingsRequest("getGJSongInfo.php", body);

            return response;
        } catch(error) {
            console.log(error);
            return -1;
        }
    });