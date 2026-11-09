import { Elysia, t } from "elysia";
import { eq, and } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";

const boolean = t.Optional(t.Numeric({ minimum: 0, maximum: 1 }));

export const getGJLevels21 = new Elysia()
    .use(gd)
    .post("/getGJLevels21.php", async ({ body }) => {
        try {

        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        body: t.Object({
            type: t.Optional(t.Numeric()),
            str: t.Optional(t.String()),
            diff: t.Optional(t.String()),
            len: t.Optional(t.Numeric()),
            page: t.Optional(t.Numeric()),
            total: t.Optional(t.Numeric()),
            uncompleted: boolean,
            onlyCompleted: boolean,
            featured: boolean,
            original: boolean,
            twoPlayer: boolean

            // todo later
        })
    })