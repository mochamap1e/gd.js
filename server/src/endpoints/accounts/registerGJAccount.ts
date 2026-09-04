import crypto from "crypto";
import { Elysia, t } from "elysia";

import { db } from "@server/db/client";
import { user } from "@server/db/schema/user";
import { auth } from "@server/utils/plugins";
import { username } from "@server/utils/types";
import { TypeError, GDError, GDAccountError } from "@server/utils/errors";

function generateGJP2(string: string) {
    return crypto.createHash("sha1").update(string += "mI29fmAnxgTs").digest("hex");
}

export const registerGJAccount = new Elysia()
    .use(auth)
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
                        return GDAccountError.UsernameTaken;
                    case "user_email_unique":
                        return GDAccountError.EmailTaken;
                    default:
                        return GDError.Generic;
                }
            }

            console.error("Error registering user:", error);

            return GDError.Generic;
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
                    const error = errors[0]; if (!error) return GDError.Generic;

                    if (error.type === TypeError.StringTooShort) return GDAccountError.PasswordTooShort;
                    if (error.type === TypeError.StringTooLong || error.type === TypeError.PatternFail) return GDAccountError.PasswordInvalid;

                    return GDError.Generic;
                }
            }),
            email: t.String({
                maxLength: 50,
                pattern: "^[a-zA-Z0-9_-]+@gmail\.com$",
                error({ errors }) {
                    const error = errors[0]; if (!error) return GDError.Generic;

                    if (error.type === TypeError.StringTooLong || error.type === TypeError.PatternFail) return GDAccountError.EmailInvalid;

                    return GDError.Generic;
                }
            })
        })
    });