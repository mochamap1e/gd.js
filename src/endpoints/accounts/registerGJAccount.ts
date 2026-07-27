import { Elysia, t } from "elysia";

import { secrets } from "../../utils/secrets";

export const registerGJAccount = new Elysia()
    .post("/registerGJAccount.php", ({ body }) => {
        return -1;
    }, {
        body: t.Object({
            userName: t.String(),
            password: t.String(),
            email: t.String(),
            secret: t.Literal(secrets.account)
        })
    });