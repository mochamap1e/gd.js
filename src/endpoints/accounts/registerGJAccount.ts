import { Elysia, t } from "elysia";

import { db } from "../../db/client";
import { user } from "../../db/schema";
import { secrets, generateGJP2 } from "../../utils/secrets";
import { GDError, GDRegisterError, TypeError } from "../../utils/errors";

export const registerGJAccount = new Elysia()
    .post("/registerGJAccount.php", async ({ body }) => {
        let { userName, password, email } = body;

        try {
            password = generateGJP2(password);

            await db.insert(user).values({
                username: userName,
                password,
                email
            });

            return 1;
        } catch(error: any) {
            const constraint = error.cause && error.cause.constraint;

            if (constraint) {
                switch (constraint) {
                    case "user_username_unique":
                        return GDRegisterError.UsernameTaken;
                    case "user_email_unique":
                        return GDRegisterError.EmailTaken;
                    default:
                        return GDError.Generic;
                }
            }

            console.error("Error registering user:", error);

            return GDError.Generic;
        }
    }, {
        body: t.Object({
            userName: t.String({
                minLength: 3,
                maxLength: 15,
                error({ errors }) {
                    const error = errors[0]; if (!error) return GDError.Generic;

                    if (error.type === TypeError.StringTooShort) return GDRegisterError.UsernameTooShort;
                    if (error.type === TypeError.StringTooLong) return GDRegisterError.UsernameTooLong;

                    return GDError.Generic;
                }
            }),
            password: t.String({
                minLength: 6,
                maxLength: 20,
                pattern: "^[a-zA-Z0-9_-]+$",
                error({ errors }) {
                    const error = errors[0]; if (!error) return GDError.Generic;

                    if (error.type === TypeError.StringTooShort) return GDRegisterError.PasswordTooShort;
                    if (error.type === TypeError.StringTooLong || error.type === TypeError.PatternFail) return GDRegisterError.PasswordInvalid;

                    return GDError.Generic;
                }
            }),
            email: t.String({
                maxLength: 50,
                pattern: "^[a-zA-Z0-9_-]+@gmail\.com$",
                error({ errors }) {
                    const error = errors[0]; if (!error) return GDError.Generic;

                    if (error.type === TypeError.StringTooLong || error.type === TypeError.PatternFail) return GDRegisterError.EmailInvalid;

                    return GDError.Generic;
                }
            }),
            secret: t.Literal(secrets.account, { error() { return GDError.Generic; } })
        })
    });