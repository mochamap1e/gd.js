import { Elysia, t } from "elysia";

import { auth } from "@/server/utils/plugins";

export const getGJLevels21 = new Elysia()
    .use(auth)
    .post("/getGJLevels21.php", async ({ body }) => {
        console.log(body.type);
    }, {
        commonSecret: true,
        body: t.Object({
            type: t.String()
        })
    });