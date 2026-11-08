import { Elysia, t } from "elysia";
import { eq, and } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";

export const deleteGJLevelUser20 = new Elysia()
    .use(gd)
    .post("/deleteGJLevelUser20.php", async ({ body, account }) => {
        try {
            const result = await db
                .delete(levels)
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
        secret: "Level",
        requiresAccount: true,
        body: t.Object({
            levelID: t.Numeric()
        })
    });