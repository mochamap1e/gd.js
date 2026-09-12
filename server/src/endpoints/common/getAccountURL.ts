import { Elysia } from "elysia";

import { getServerAddress } from "@server/index";
import { auth } from "@server/utils/plugins";

export const getAccountURL = new Elysia()
    .use(auth)
    .post("/getAccountURL.php", (): any => {
        return getServerAddress();
    }, {
        commonSecret: true
    });