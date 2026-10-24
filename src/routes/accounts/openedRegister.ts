import Elysia from "elysia";

import { gd } from "@server/middleware";
import { generateHex } from "@server/lib/text";
import { registerSessions } from "@server/lib/sessions";

export const openedRegister = new Elysia()
    .use(gd)
    .post("/accounts/openedRegister.php", ({ body }) => {
        const token = generateHex(32);

        registerSessions.push({ token, timestamp: Date.now()  });

        return token;
    }, {
        secret: "Account"
    });