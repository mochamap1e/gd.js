import { Elysia } from "elysia";

import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";
import { getServerAddress } from "@server/index";

export const getAccountURL = new Elysia()
    .use(auth)
    .post("/getAccountURL.php", (): string | number => {
        return getServerAddress() ?? GDError.Generic;
    }, {
        commonSecret: true
    });