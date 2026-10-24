import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { Secrets } from "@server/constants";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const gd = new Elysia()
    .macro({
        secret: (name: keyof typeof Secrets) => ({
            body: t.Object({
                secret: t.Literal(Secrets[name])
            })
        }),
        requiresAccount: (enabled: true) => ({
            async resolve({ body }) {
                const { accountID, gjp2 } = body as { accountID: number, gjp2: string };

                const [account] = await db
                    .select()
                    .from(accounts)
                    .where(eq(accounts.account_id, accountID));

                if (account && (account.password === gjp2)) {
                    return { account };
                } else {
                    return;
                }
            },
            body: t.Object({
                accountID: t.Numeric(),
                gjp2: t.String()
            })
        })
    });