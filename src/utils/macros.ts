import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "../db/client";
import { user } from "../db/schema";
import { TypeError, GDError, GDAccountError } from "./errors";

function secret(secret: string) {
    return t.Object({
        secret: t.Literal(secret, { error() { return GDError.Generic; } })
    })
}

export const auth = new Elysia()
    .macro({
        // secrets
        commonSecret: { body: secret("Wmfd2893gb7") },
        accountSecret: { body: secret("Wmfv3899gc9") },
        levelSecret: { body: secret("Wmfv2898gc9") },
        modSecret: { body: secret("Wmfp3879gc3") },
        adminSecret: { body: secret("Wmfx2878gb9") },

        // account id
        accountId: {
            body: t.Object({
                accountID: t.String()
            })
        },

        // login
        account: {
            async resolve({ body }) {
                const { gjp2, accountID } = body as { gjp2: string, accountID: string }

                const query = await db
                    .select()
                    .from(user)
                    .where(eq(user.account_id, parseInt(accountID)))

                const userData = query[0]; if (!userData) return;

                if (userData.password === gjp2) {
                    return { account: userData };
                } else {
                    return;
                }
            },
            body: t.Object({
                accountID: t.String(),
                gjp2: t.String()
            })
        },

        // username
        username: {
            body: t.Object({
                userName: t.String({
                    minLength: 3,
                    maxLength: 15,
                    error({ errors }) {
                        const error = errors[0]; if (!error) return GDError.Generic;

                        if (error.type === TypeError.StringTooShort) return GDAccountError.UsernameTooShort;
                        if (error.type === TypeError.StringTooLong) return GDAccountError.UsernameTooLong;

                        return GDError.Generic;
                    }
                })
            })
        }
    });