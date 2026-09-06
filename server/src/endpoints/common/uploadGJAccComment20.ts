import { Elysia, t } from "elysia";

import { db } from "@server/db/client";
import { accountComment } from "@server/db/schema/comment";
import { GDError } from "@server/utils/errors";
import { hasObscenity } from "@server/utils/obscenity";
import { auth } from "@server/utils/plugins";

export const uploadGJAccComment20 = new Elysia()
    .use(auth)
    .post("/uploadGJAccComment20.php", async ({ body, account }) => {
        const comment = body.comment;
        const rawComment = Buffer.from(comment, "base64url").toString("utf-8");

        if (!hasObscenity(rawComment)) {
            try {
                const [response] = await db
                    .insert(accountComment)
                    .values({
                        account_id: account.account_id,
                        comment
                    })
                    .returning({ commentId: accountComment.comment_id });

                return response!.commentId;
            } catch(error) {
                console.error("Failed to upload account comment", error);
                return GDError.Generic;
            }
        } else {
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            comment: t.String({ minLength: 1, maxLength: 188 }) // 140 chars to base64 is 188
        })
    });