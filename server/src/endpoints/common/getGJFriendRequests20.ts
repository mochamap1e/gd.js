import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { friendRequests, users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";
import { relativeTimestamp } from "@server/utils/text";

export const getGJFriendRequests20 = new Elysia()
    .use(auth)
    .post("/getGJFriendRequests20.php", async ({ body, account }) => {
        try {
            const requests = await db
                .select()
                .from(friendRequests)
                .where(eq(friendRequests.to, account.account_id));

            const objects: string[] = [];

            for (const request of requests) {
                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.account_id, request.from));

                if (!user) return;

                objects.push([
                    1, user.username,
                    2, user.user_id,
                    9, user.icon_id,
                    10, user.color,
                    11, user.color2,
                    14, user.icon_type,
                    15, user.acc_glow,
                    16, user.account_id,
                    32, request.id,
                    35, request.message,
                    37, relativeTimestamp(request.sent_at),
                    41, request.new,
                    51, user.color3
                ].join(":"));
            };

            return [
                objects.join("|"),
                [
                    objects.length,
                    0,
                    10
                ].join(":")
            ].join("#");
        } catch(error) {
            return -1;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true
    })