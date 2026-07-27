import { Elysia } from "elysia";

import { registerGJAccount } from "./accounts/registerGJAccount";

export const accounts = new Elysia({ prefix: "/accounts" })
    .use(registerGJAccount);