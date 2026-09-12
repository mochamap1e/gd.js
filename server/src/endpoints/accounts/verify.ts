import { Elysia } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";

export const verify = new Elysia()
    .get("/verify", async ({ request, status, redirect }) => {
        const url = new URL(request.url)
        const code = url.searchParams.get("code");

        if (code) {
            const equality = eq(users.verification_code, code);

            try {
                const [user] = await db
                    .select()
                    .from(users)
                    .where(equality);

                if (user && !user.email_verified) {
                    await db
                        .update(users)
                        .set({ email_verified: true })
                        .where(equality);

                    return redirect("https://" + url.hostname + `/verified?username=${user.username}`);
                }
            } catch(error) {}
        }

        return status(400);
    });