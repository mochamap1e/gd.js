import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { Secrets } from "@server/constants";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

async function authenticate(accountID?: number, gjp2?: string) {
    if (accountID === undefined || !gjp2) return null;

    const [account] = await db
        .select()
        .from(accounts)
        .where(eq(accounts.id, accountID));

    if (account) {
        if (account.password === gjp2) {
            return account;
        }
    }

    return null;
}

export const gd = new Elysia()
    .macro({
        secret: (name: keyof typeof Secrets) => ({
            body: t.Object({
                secret: t.Literal(Secrets[name])
            })
        }),

        requiresAccount: (enabled: true) => ({
            async resolve({ body, status }) {
                const { accountID, gjp2 } = body as Credentials;
                const account = await authenticate(accountID, gjp2);

                if (!account) return status(200, -1);

                return { account };
            },
            body: t.Object({
                accountID: t.Numeric(),
                gjp2: t.String()
            })
        }),

        optionalAccount: (enabled: true) => ({
            async resolve({ body }) {
                const { accountID, gjp2 } = body as Credentials;

                return { account: await authenticate(accountID, gjp2) };
            },
            body: t.Object({
                accountID: t.Optional(t.Numeric()),
                gjp2: t.Optional(t.String())
            })
        })
    });