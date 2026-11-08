import { Elysia, t } from "elysia";

import { COMMENT_MAX_LENGTH } from "@server/constants";
import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accountComments } from "@server/db/schema";

export const uploadGJAccComment20 = new Elysia()
    .use(gd)
    .post("/uploadGJAccComment20.php", async ({ body, account }) => {
        try {
            const [result] = await db
                .insert(accountComments)
                .values({
                    author: account.id,
                    comment: body.comment
                })
                .returning();

            if (result) {
                return result.id;
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        requiresAccount: true,
        body: t.Object({
            comment: t.String({ minLength: 1, maxLength: COMMENT_MAX_LENGTH })
        })
    });