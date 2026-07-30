import { Elysia } from "elysia";

import { backupGJAccountNew } from "./accounts/backupGJAccountNew";
import { loginGJAccount } from "./accounts/loginGJAccount";
import { registerGJAccount } from "./accounts/registerGJAccount";
import { syncGJAccountNew } from "./accounts/syncGJAccountNew";

export const accounts = new Elysia({ prefix: "/accounts" })
    .use(backupGJAccountNew)
    .use(loginGJAccount)
    .use(registerGJAccount)
    .use(syncGJAccountNew);