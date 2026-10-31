import { Elysia, t } from "elysia";
import { Resend } from "resend";
import { eq } from "drizzle-orm";

import { config } from "@server/lib/config";
import {
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    REGISTER_SESSION_CHARS,
    ACTIVATION_TOKEN_CHARS
} from "@server/constants";
import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

import { registerSessions, deleteSession } from "@server/lib/session";
import { generateHex, generateGJP2 } from "@server/lib/text";

import { ValueErrorType } from "@sinclair/typebox/errors";

const accountActivationEnabled = config.get("require_account_activation");
const resend = accountActivationEnabled ?
    new Resend(config.get("resend_api_key")) :
    null;

export const registerGJAccount = new Elysia()
    .use(gd)
    .post("/accounts/registerGJAccount.php", async ({ body }) => {
        const session = registerSessions.find(session => session.token === body.rsession);

        if (!session) { return -1; };

        deleteSession(session.token);

        const { userName: username, password, email } = body;
        const token = generateHex(ACTIVATION_TOKEN_CHARS);

        try {
            await db.insert(accounts).values({
                activated: !accountActivationEnabled,
                activation_token: token,
                username,
                password: generateGJP2(password),
                email
            });
        } catch (error: any) {
            const constraint = (error.cause) && error.cause.constraint;

            if (constraint) {
                if (constraint === "accounts_username_key") return -2; // username taken
                if (constraint === "accounts_email_key") return -3; // email taken
            }

            return -1;
        }

        if (accountActivationEnabled) {
            const { error } = await resend!.emails.send({
                from: config.get("resend_email"),
                to: email,
                template: {
                    id: config.get("resend_template_id"),
                    variables: {
                        USERNAME: username,
                        LINK: `${config.get("gdps_url")}/accounts/activate?token=${token}`,
                        GDPS_NAME: config.get("gdps_name")
                    }
                }
            });

            if (error) {
                console.error("Resend error:", error);
                await db.delete(accounts).where(eq(accounts.username, username));
                return -1;
            }
        }

        return 1;
    }, {
        secret: "Account",
        body: t.Object({
            userName: t.String({
                minLength: USERNAME_MIN_LENGTH,
                maxLength: USERNAME_MAX_LENGTH
            }),
            password: t.String({
                minLength: PASSWORD_MIN_LENGTH,
                maxLength: PASSWORD_MAX_LENGTH
            }),
            email: t.String({
                pattern: "^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*@[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*\\.[A-Za-z]{2,}$",
                maxLength: 50
            }),
            rsession: t.String({
                minLength: REGISTER_SESSION_CHARS,
                maxLength: REGISTER_SESSION_CHARS
            })
        }),
        error: ({ code, error }) => {
            if (code === "VALIDATION") {
                const err = error.valueError;

                if (err) {
                    if (err.path.includes("userName")) {
                        if (err.type === ValueErrorType.StringMinLength) return -9;
                        if (err.type === ValueErrorType.StringMaxLength) return -4;
                    }
                    if (err.path.includes("password")) {
                        if (err.type === ValueErrorType.StringMinLength) return -8;
                        if (err.type === ValueErrorType.StringMaxLength) return -5;
                    }
                    if (err.path.includes("email")) {
                        if ((err.type === ValueErrorType.StringPattern) || (err.type === ValueErrorType.StringMaxLength)) return -6;
                    }
                }
            }
        }
    });