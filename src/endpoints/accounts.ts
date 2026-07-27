import { Elysia } from "elysia";

import { loginGJAccount } from "./accounts/loginGJAccount";
import { registerGJAccount } from "./accounts/registerGJAccount";

export const accounts = new Elysia({ prefix: "/accounts" })
    .use(loginGJAccount)
    .use(registerGJAccount);