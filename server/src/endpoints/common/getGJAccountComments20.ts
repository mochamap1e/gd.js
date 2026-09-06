import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { accountComment } from "@server/db/schema/comment";
import { createAccountCommentObject } from "@server/utils/objects/comment";
import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";
import { join } from "@server/utils/text";

// todo: add pages

export const getGJAccountComments20 = new Elysia()
    .use(auth)
    .post("/getGJAccountComments20.php", async ({ body }) => {
        const { accountID, page } = body;
        const targetAccountId = accountID[1] ?? accountID;

        try {
            const query = await db
                .select()
                .from(accountComment)
                .where(eq(accountComment.account_id, parseInt(targetAccountId)));

            let response = "";

            // convert all comments to comment objects

            const commentObjects: any[] = [];
            query.forEach(comment => commentObjects.push(createAccountCommentObject(comment)));

            // append comment objects

            commentObjects.forEach(object => response += (object + "|"));
            response = response.slice(0, -1); // remove last |

            // add page info

            response += "#";
            response += join(":",
                query.length,
                page,
                10
            );

            // return

            return response;
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