import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { accountComments } from "@server/db/schema";
import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";

export const deleteGJAccComment20 = new Elysia()
    .use(auth)
    .post("/deleteGJAccComment20.php", async ({ body, account }) => {
        const { commentID } = body;

        const equality = eq(accountComments.comment_id, parseInt(commentID));

        try {
            const query = await db
                .select()
                .from(accountComments)
                .where(equality);

            const targetComment = query[0];

            if (!targetComment) return GDError.Generic;
            if (targetComment.account_id !== account.account_id) return GDError.Generic;

            await db
                .delete(accountComments)
                .where(equality);

            return 1;
        } catch(error) {
            console.error("Failed to delete account comment:", error);
        }
    }, {
        requiresAuthentication: true,
        commonSecret: true,
        body: t.Object({
            commentID: t.String()
        })
    });