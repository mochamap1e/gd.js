import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";

import { gd } from "@server/lib/middleware";
import { unixSeconds, timestampString } from "@server/lib/text";

import { db } from "@server/db/client";
import { accountComments } from "@server/db/schema";

export const getGJAccountComments20 = new Elysia()
    .use(gd)
    .post("/getGJAccountComments20.php", async ({ body }) => {
        const accountId = body.accountID;
        const targetAccountId = typeof accountId === "number" ?
            accountId :
            accountId[1];

        try {
            const comments = await db
                .select()
                .from(accountComments)
                .where(eq(accountComments.author, targetAccountId))
                .orderBy(desc(accountComments.created_at));

            const commentObjects: string[] = [];
            
            comments.forEach(comment => {
                commentObjects.push([
                    2, comment.comment,
                    4, comment.likes,
                    5, comment.dislikes,
                    6, comment.id,
                    8, comment.author,
                    9, timestampString(comment.created_at),
                    15, unixSeconds(comment.created_at)
                ].join("~"));
            });

            const pageInfo = [
                comments.length,
                body.page,
                10 // temp page size
            ].join(":");

            return [commentObjects.join("|"), pageInfo].join("#");
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        body: t.Object({
            accountID: t.Union([
                t.Numeric(),
                t.Tuple([t.Numeric(), t.Numeric()])
            ]),
            page: t.Numeric()
        })
    });