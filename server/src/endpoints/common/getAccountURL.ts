import { Elysia } from "elysia";

import { auth } from "@server/utils/plugins";
import { getServerAddress } from "@server/index";

export const getAccountURL = new Elysia()
    .use(auth)
    .post("/getAccountURL.php", (): string | number => {
        return getServerAddress() ?? -1;
    }, {
        commonSecret: true
    });