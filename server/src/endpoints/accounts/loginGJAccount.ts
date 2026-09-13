import { Elysia, t } from "elysia";

import { auth } from "@server/utils/plugins";

export const loginGJAccount = new Elysia()
    .use(auth)
    .post("/loginGJAccount.php", async ({ account }) => {
        if (account.email_verified) {
            return `${account.account_id},${account.user_id}`;
        } else {
            return -1;
        }
    }, {
        accountSecret: true,
        requiresAuthentication: true
    })