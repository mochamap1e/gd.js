import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const activate = new Elysia()
    .get("/accounts/activate", async ({ request, status }) => {
        const url = new URL(request.url)
        const token = url.searchParams.get("token");

        if (token) {
            const equality = eq(accounts.activation_token, token);

            try {
                const [user] = await db
                    .select()
                    .from(accounts)
                    .where(equality);

                if (user && !user.activated) {
                    await db
                        .update(accounts)
                        .set({ activated: true })
                        .where(equality);

                    return "Your account has been successfully activated. You may now log in.";
                }
            } catch(error) {
                return status(400);
            }

            return status(400);
        }
    }, {
        body: t.Object({
            token: t.String()
        })
    });