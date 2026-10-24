import Elysia from "elysia";

import { gd } from "@server/middleware";
import { Secrets } from "@server/constants";
import { generateHex } from "@server/lib/text";
import { registerSessions } from "@server/lib/sessions";

export const openedRegister = new Elysia()
    .use(gd)
    .post("/openedRegister.php", ({ body }) => {
        const session = generateHex(32);

        registerSessions.push(session);

        return session;
    }, {
        secret: Secrets.Account
    });