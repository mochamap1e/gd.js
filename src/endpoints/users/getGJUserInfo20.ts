import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "../../db/client";
import { user } from "../../db/schema";
import { secrets } from "../../utils/secrets";
import { GDError } from "../../utils/errors";
import { createUserObject } from "../../utils/objects/user";

export const getGJUserInfo20 = new Elysia()
    .post("/getGJUserInfo20.php", async ({ body }) => {
        const { gjp2, accountID, targetAccountID } = body;

        const query = await db
            .select()
            .from(user)
            .where(eq(user.account_id, parseInt(accountID)));

        const userData = query[0]; if (!userData) return GDError.Generic;

        if (userData.password === gjp2) {
            const query = await db
                .select()
                .from(user)
                .where(eq(user.account_id, parseInt(targetAccountID)));

            const targetUserData = query[0]; if (!targetUserData) return GDError.Generic;

            return createUserObject(targetUserData);
        } else {
            return GDError.Generic;
        }
    }, {
        body: t.Object({
            gjp2: t.String(),
            accountID: t.String(),
            targetAccountID: t.String(),
            secret: t.Literal(secrets.common, { error() { return GDError.Generic; } })
        })
    });