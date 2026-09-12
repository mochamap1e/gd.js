import { Elysia, t } from "elysia";

import { db } from "@server/db/client";
import { friendRequests } from "@server/db/schema";
import { hasObscenity } from "@server/lib/obscenity";
import { auth } from "@server/utils/plugins";
import { decodeB64 } from "@server/utils/text";

export const uploadFriendRequest20 = new Elysia()
    .use(auth)
    .post("/uploadFriendRequest20.php", async ({ body, account }) => {
        const message = body.comment;
        const rawMessage = decodeB64(message);

        try {
            if (!hasObscenity(rawMessage)) {
                await db
                    .insert(friendRequests)
                    .values({
                        to: body.toAccountID,
                        from: account.account_id,
                        message
                    });

                return 1;
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            toAccountID: t.Integer(),
            comment: t.String({ maxLength: 188 })
        })
    });