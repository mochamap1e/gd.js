import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "@server/constants";
import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const loginGJAccount = new Elysia()
    .use(gd)
    .post("/accounts/loginGJAccount.php", async ({ body }) => {
        try {
            const [account] = await db
                .select()
                .from(accounts)
                .where(eq(accounts.username, body.userName));

            if (account) {
                if (account.password === body.gjp2) {
                    return [account.id, account.id].join(",");
                } else {
                    return -11;
                }
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Account",
        body: t.Object({
            userName: t.String({
                minLength: USERNAME_MIN_LENGTH,
                maxLength: USERNAME_MAX_LENGTH
            }),
            gjp2: t.String()
        })
    });