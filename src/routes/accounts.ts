import Elysia from "elysia";

import { openedRegister } from "@server/routes/accounts/openedRegister";
import { registerGJAccount } from "@server/routes/accounts/registerGJAccount";

export const accounts = new Elysia({ prefix: "/accounts" })
    .use(openedRegister)
    .use(registerGJAccount);