import { Elysia } from "elysia";

import { backupGJAccountNew } from "@server/endpoints/accounts/backupGJAccountNew";
import { loginGJAccount } from "@server/endpoints/accounts/loginGJAccount";
import { registerGJAccount } from "@server/endpoints/accounts/registerGJAccount";
import { syncGJAccountNew } from "@server/endpoints/accounts/syncGJAccountNew";
import { verify } from "@server/endpoints/accounts/verify";

export const accounts = new Elysia({ prefix: "/accounts" })
    .use(backupGJAccountNew)
    .use(loginGJAccount)
    .use(registerGJAccount)
    .use(syncGJAccountNew)
    .use(verify);