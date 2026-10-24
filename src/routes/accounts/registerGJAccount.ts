import { Elysia, t } from "elysia";

import { gd } from "@server/middleware";
import { Secrets } from "@server/constants";
import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { generateGJP2 } from "@server/lib/text";
import { registerSessions } from "@server/lib/sessions";

export const registerGJAccount = new Elysia()
    .use(gd)
    .post("/registerGJAccount.php", async ({ body }) => {
        // verify & remove session
        if (!registerSessions.includes(body.rsession)) { return -1; };
        registerSessions.splice(registerSessions.indexOf(body.rsession), 1);

        try {
            await db
                .insert(users)
                .values({
                    username: body.userName,
                    password: generateGJP2(body.password),
                    email: body.email
                });

            return 1;
        } catch(error) {
            return -1;
        }
    }, {
        secret: Secrets.Account,
        body: t.Object({
            userName: t.String(),
            password: t.String(),
            email: t.String(),
            rsession: t.String()
        })
    });