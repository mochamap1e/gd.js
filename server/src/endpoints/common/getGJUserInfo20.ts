import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";
import { createUserObject } from "@server/utils/objects/user";

export const getGJUserInfo20 = new Elysia()
    .use(auth)
    .post("/getGJUserInfo20.php", async ({ body }) => {
        const { targetAccountID } = body;

        try {
            const query = await db
                .select()
                .from(users)
                .where(eq(users.account_id, targetAccountID));

            const targetUserData = query[0]; if (!targetUserData) return -1;

            return createUserObject(targetUserData);
        } catch(error) {
            return -1;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            targetAccountID: t.Integer()
        })
    });