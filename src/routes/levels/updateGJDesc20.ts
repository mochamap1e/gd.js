import { Elysia, t } from "elysia";
import { and, eq } from "drizzle-orm";

import { DESCRIPTION_MAX_LENGTH } from "@server/constants";
import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";

export const updateGJDesc20 = new Elysia()
    .use(gd)
    .post("/updateGJDesc20.php", async ({ body, account }) => {
        try {
            const result = await db
                .update(levels)
                .set({
                    description: body.levelDesc
                })
                .where(
                    and(
                        eq(levels.id, body.levelID),
                        eq(levels.author, account.id)
                    )
                )
                .returning();
            
            return result.length ? 1 : -1;
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        requiresAccount: true,
        body: t.Object({
            levelID: t.Numeric(),
            levelDesc: t.String({ maxLength: DESCRIPTION_MAX_LENGTH })
        })
    });