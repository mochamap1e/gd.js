import { Elysia, t } from "elysia";

import { db } from "@server/db/client";
import { friendRequests } from "@server/db/schema";
import { GDError } from "@server/utils/errors";
import { hasObscenity } from "@server/utils/obscenity";
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
                        to: parseInt(body.toAccountID),
                        from: account.account_id,
                        message
                    });

                return 1;
            } else {
                return GDError.Generic;
            }
        } catch(error) {
            console.error("Failed to send friend request:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            toAccountID: t.String(),
            comment: t.String({ maxLength: 188 })
        })
    });