import Elysia from "elysia";

import { activate } from "@server/routes/accounts/activate";
import { backupGJAccountNew } from "@server/routes/accounts/backupGJAccountNew";
import { getAccountURL } from "@server/routes/accounts/getAccountURL";
import { loginGJAccount } from "@server/routes/accounts/loginGJAccount";
import { openedRegister } from "@server/routes/accounts/openedRegister";
import { registerGJAccount } from "@server/routes/accounts/registerGJAccount";

export const accounts = new Elysia()
    .use(activate)
    .use(backupGJAccountNew)
    .use(getAccountURL)
    .use(loginGJAccount)
    .use(openedRegister)
    .use(registerGJAccount);