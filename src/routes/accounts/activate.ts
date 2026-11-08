import { Elysia, t } from "elysia";
import { eq, and } from "drizzle-orm";

import { config } from "@server/lib/config";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const activate = new Elysia()
    .get("/accounts/activate", async ({ request, status }) => {
        const url = new URL(request.url);
        const token = url.searchParams.get("token");

        if (token) {
            try {
                const result = await db
                    .update(accounts)
                    .set({
                        activated: true
                    })
                    .where(
                        and(
                            eq(accounts.activation_token, token),
                            eq(accounts.activated, false)
                        )
                    )
                    .returning();

                return result.length ?
                    config.get("activation_message") :
                    status(400);
            } catch(error) {
                return status(500);
            }
        } else {
            return status(400);
        }
    }, {
        body: t.Object({
            token: t.String()
        })
    });