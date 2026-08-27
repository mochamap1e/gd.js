import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@/server/db/client";
import { user } from "@/server/db/schema";
import { auth } from "@/server/utils/plugins";
import { GDError } from "@/server/utils/errors";
import { createUserObject } from "@/server/utils/objects/user";

export const getGJUserInfo20 = new Elysia()
    .use(auth)
    .post("/getGJUserInfo20.php", async ({ body }) => {
        const { targetAccountID } = body;

        try {
            const query = await db
                .select()
                .from(user)
                .where(eq(user.account_id, parseInt(targetAccountID)));

            const targetUserData = query[0]; if (!targetUserData) return GDError.Generic;

            return createUserObject(targetUserData);
        } catch(error) {
            console.error("Failed to get user info:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            targetAccountID: t.String()
        })
    });