import { Elysia, t } from "elysia";

import { config } from "@server/config";
import { gd } from "@server/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

import { sendActivationEmail } from "@server/lib/resend";
import { registerSessions } from "@server/lib/sessions";
import { generateHex, generateGJP2 } from "@server/lib/text";

const accountActivationEnabled = config.get("require_account_activation");

export const registerGJAccount = new Elysia()
    .use(gd)
    .post("/accounts/registerGJAccount.php", async ({ body }) => {
        const session = registerSessions.find(session => session.token === body.rsession);

        if (!session) { return -1; };

        const { userName: username, password, email } = body;
        const token = generateHex(32);

        try {
            if (accountActivationEnabled) {
                const success = await sendActivationEmail(email, username, `${config.get("gdps_url")}/accounts/activate?token=${token}`);

                // added this because accounts were still being added to the db if resend errored
                if (!success) {
                    return console.error("Failed to register account due to Resend error.");
                }
            }
            
            await db
                .insert(accounts)
                .values({
                    activated: !accountActivationEnabled,
                    activation_token: token,
                    username,
                    password: generateGJP2(password),
                    email
                });

            return 1;
        } catch(error) {
            console.log(error);
            return -1;
        }
    }, {
        secret: "Account",
        body: t.Object({
            userName: t.String(),
            password: t.String(),
            email: t.String(),
            rsession: t.String()
        })
    });