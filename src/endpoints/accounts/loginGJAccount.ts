import { Elysia, t } from "elysia";

import { auth } from "../../utils/macros";

export const loginGJAccount = new Elysia()
    .use(auth)
    .post("/loginGJAccount.php", async ({ account }) => {
        return `${account.account_id},${account.user_id}`;
    }, {
        accountSecret: true,
        requiresAuthentication: true
    })