import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/middleware";

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
                    return [account.account_id, account.account_id].join(",");
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
            userName: t.String(),
            gjp2: t.String()
        })
    });