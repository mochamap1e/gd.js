import Elysia from "elysia";

import { activate } from "@server/routes/accounts/activate";
import { backupGJAccountNew } from "@server/routes/accounts/backupGJAccountNew";
import { getAccountURL } from "@server/routes/accounts/getAccountURL";
import { loginGJAccount } from "@server/routes/accounts/loginGJAccount";
import { openedRegister } from "@server/routes/accounts/openedRegister";
import { registerGJAccount } from "@server/routes/accounts/registerGJAccount";
import { updateGJAccSettings20 } from "@server/routes/accounts/updateGJAccSettings20";
import { updateGJUserScore22 } from "@server/routes/accounts/updateGJUserScore22";

export const accounts = new Elysia()
    .use(activate)
    .use(backupGJAccountNew)
    .use(getAccountURL)
    .use(loginGJAccount)
    .use(openedRegister)
    .use(registerGJAccount)
    .use(updateGJAccSettings20)
    .use(updateGJUserScore22);