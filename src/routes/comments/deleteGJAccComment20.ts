import { Elysia, t } from "elysia";
import { eq, and } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accountComments } from "@server/db/schema";

export const deleteGJAccComment20 = new Elysia()
    .use(gd)
    .post("/deleteGJAccComment20.php", async ({ body, account }) => {
        try {
            const result = await db
                .delete(accountComments)
                .where(
                    and(
                        eq(accountComments.id, body.commentID),
                        eq(accountComments.author, account.id)
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
            commentID: t.Numeric()
        })
    });