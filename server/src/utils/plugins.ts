import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { user } from "@server/db/schema/user";
import { GDError } from "@server/utils/errors";
import { username } from "@server/utils/types";

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

        // auth
        // some endpoints send the account id, some send the username, this works for both
        requiresAuthentication: {
            async resolve({ body }) {
                const { gjp2, userName, accountID } = body as { gjp2: string, userName?: string, accountID?: string };

                let equality;

                // if both are provided it will resort to account id
                if (!userName && !accountID) return;
                if (userName) equality = eq(user.username, userName);
                if (accountID) equality = eq(user.account_id, parseInt(accountID));

                const query = await db
                    .select()
                    .from(user)
                    .where(equality)

                const userData = query[0]; if (!userData) return;

                if (userData.password === gjp2) {
                    return { account: userData };
                } else {
                    return;
                }
            },
            body: t.Object({
                gjp2: t.String(),
                userName: t.Optional(username),
                accountID: t.Optional(t.String())
            })
        }
    });