import Elysia from "elysia";

import { REGISTER_SESSION_CHARS } from "@server/constants";
import { gd } from "@server/lib/middleware";

import { generateHex } from "@server/lib/text";
import { registerSessions } from "@server/lib/session";

export const openedRegister = new Elysia()
    .use(gd)
    .post("/accounts/openedRegister.php", ({ body }) => {
        const token = generateHex(REGISTER_SESSION_CHARS);

        registerSessions.push({ token, timestamp: Date.now() });

        return token;
    }, {
        secret: "Account"
    });