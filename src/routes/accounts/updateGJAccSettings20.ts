import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const updateGJAccSettings20 = new Elysia()
    .use(gd)
    .post("/updateGJAccSettings20.php", async ({ body, account }) => {
        try {
            await db
                .update(accounts)
                .set({
                    message_state: body.mS,
                    friends_state: body.frS,
                    comment_history_state: body.cS,
                    group_state: body.gF,
                    youtube: body.yt,
                    twitter: body.twitter,
                    twitch: body.twitch,
                    instagram: body.instagram,
                    tiktok: body.tiktok,
                    discord: body.discord,
                    custom: body.custom
                })
                .where(eq(accounts.id, account.id));

            return 1;
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Account",
        requiresAccount: true,
        body: t.Object({
            mS: t.Numeric({ minimum: 0, maximum: 2 }),
            frS: t.Numeric({ minimum: 0, maximum: 2 }),
            cS: t.Numeric({ minimum: 0, maximum: 2 }),
            gF: t.Numeric({ minimum: 0, maximum: 2 }),
            yt: t.String({ maxLength: 30 }),
            twitter: t.String({ maxLength: 20 }),
            twitch: t.String({ maxLength: 30 }),
            instagram: t.String({ maxLength: 30 }),
            tiktok: t.String({ maxLength: 30 }),
            discord: t.String({ maxLength: 40 }),
            custom: t.String({ maxLength: 30 })
        })
    });