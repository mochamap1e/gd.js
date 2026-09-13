import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { friendRequests } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const readGJFriendRequest20 = new Elysia()
    .use(auth)
    .post("/readGJFriendRequest20.php", async ({ body }) => {
        try {
            await db
                .update(friendRequests)
                .set({ new: false })
                .where(eq(friendRequests.id, body.requestID));
            
            return 1;
        } catch(error) {
            return -1;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            requestID: t.Integer()
        })
    });