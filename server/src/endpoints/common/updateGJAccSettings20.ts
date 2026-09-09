import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const updateGJAccSettings20 = new Elysia()
    .use(auth)
    .post("/updateGJAccSettings20.php", async ({ body, account }) => {
        try {
            await db
                .update(users)
                .set({
                    message_state: body.mS,
                    friends_state: body.frS,
                    comment_history_state: body.cS,
                    youtube: body.yt,
                    twitter: body.twitter,
                    twitch: body.twitch,
                    instagram: body.instagram,
                    tiktok: body.tiktok,
                    discord: body.discord,
                    custom: body.custom
                })
                .where(eq(users.account_id, account.account_id));

            return 1;
        } catch(error) {
            return -1;
        }
    }, {
        accountSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            mS: t.Integer(),
            frS: t.Integer(),
            cS: t.Integer(),
            yt: t.String(),
            twitter: t.String(),
            twitch: t.String(),
            instagram: t.String(),
            tiktok: t.String(),
            discord: t.String(),
            custom: t.String()
        })
    });