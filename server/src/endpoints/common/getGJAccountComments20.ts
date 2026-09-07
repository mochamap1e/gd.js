import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { accountComments } from "@server/db/schema";
import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";
import { relativeTimestamp } from "@server/utils/text";

// todo: add pages

export const getGJAccountComments20 = new Elysia()
    .use(auth)
    .post("/getGJAccountComments20.php", async ({ body }) => {
        const { accountID, page } = body;
        const targetAccountId = accountID[1] ?? accountID;

        try {
            const query = await db
                .select()
                .from(accountComments)
                .where(eq(accountComments.account_id, parseInt(targetAccountId)));

            const commentObjects: any[] = [];

            query.forEach(comment => {
                commentObjects.push([
                    2, comment.comment,
                    4, comment.likes,
                    5, comment.dislikes,
                    6, comment.comment_id,
                    8, comment.account_id,
                    9, relativeTimestamp(comment.posted_at)
                ].join("~"))
            });

            const pageInfo = [
                query.length,
                page,
                10
            ].join(":");

            // return

            return [
                commentObjects.join("|"),
                pageInfo
            ].join("#");
        } catch(error) {
            console.error("Failed to fetch account comments:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        body: t.Object({
            // sometimes the client sends just the target id and sometimes it sends an array like ["client account id", "target's account id"]
            // not sure why it does that but it's ok
            accountID: t.Union([
                t.String(),
                t.Tuple([t.String(), t.String()])
            ]),
            page: t.String()
        })
    });