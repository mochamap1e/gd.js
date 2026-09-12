import crypto from "crypto";
import { Elysia, t } from "elysia";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";
import { generateGJP2 } from "@server/utils/text";
import { username } from "@server/utils/types";
import { config } from "@server/lib/config";
import { sendVerificationEmail } from "@server/lib/resend";
import { TypeError, GDAccountError } from "@server/utils/errors";

export const registerGJAccount = new Elysia()
    .use(auth)
    .post("/registerGJAccount.php", async ({ body }) => {
        let { userName, password, email } = body;

        try {
            const verificationCode = crypto.randomUUID().replaceAll("-", "");

            password = generateGJP2(password);

            await db.insert(users).values({
                username: userName,
                password,
                email,
                verification_code: verificationCode
            });

            await sendVerificationEmail(
                email,
                userName,
                `https://${config.get("domain")}/accounts/verify?code=${verificationCode}`
            );

            return 1;
        } catch(error: any) {
            const constraint = error.cause && error.cause.constraint;

            if (constraint) {
                switch (constraint) {
                    case "user_username_unique":
                        return GDAccountError.UsernameTaken;
                    case "user_email_unique":
                        return GDAccountError.EmailTaken;
                    default:
                        return -1;
                }
            }

            console.error("Error registering user:", error);

            return -1;
        }
    }, {
        accountSecret: true,
        body: t.Object({
            userName: username,
            password: t.String({
                minLength: 6,
                maxLength: 20,
                pattern: "^[a-zA-Z0-9_-]+$",
                error({ errors }) {
                    const error = errors[0]; if (!error) return -1;

                    if (error.type === TypeError.StringTooShort) return GDAccountError.PasswordTooShort;
                    if (error.type === TypeError.StringTooLong || error.type === TypeError.PatternFail) return GDAccountError.PasswordInvalid;

                    return -1;
                }
            }),
            email: t.String({
                maxLength: 50,
                pattern: "^[a-zA-Z0-9._-]+@gmail\.com$",
                error({ errors }) {
                    const error = errors[0]; if (!error) return -1;

                    if (error.type === TypeError.StringTooLong || error.type === TypeError.PatternFail) return GDAccountError.EmailInvalid;

                    return -1;
                }
            })
        })
    });