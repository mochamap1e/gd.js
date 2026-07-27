import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "../../db/client";
import { user } from "../../db/schema";
import { secrets } from "../../utils/secrets";
import { GDError, GDLoginError } from "../../utils/errors";

export const loginGJAccount = new Elysia()
    .post("/loginGJAccount.php", async ({ body }) => {
        const { userName, gjp2 } = body;

        const query = await db
            .select()
            .from(user)
            .where(eq(user.username, userName));

        const userData = query[0]; if (!userData) return GDError.Generic;

        if (userData.password === gjp2) {
            return `${userData.account_id},${userData.user_id}`;
        } else {
            return GDLoginError.InvalidCredentials;
        }
    }, {
        body: t.Object({
            userName: t.String(),
            gjp2: t.String(),
            secret: t.Literal(secrets.account, { error() { return GDError.Generic; } })
        })
    });