import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const getGJUserInfo20 = new Elysia()
    .use(auth)
    .post("/getGJUserInfo20.php", async ({ body }) => {
        const { targetAccountID } = body;

        try {
            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.account_id, targetAccountID));

            if (!user) return -1;

            return [
                1, user.username,
                2, user.user_id,
                3, user.stars,
                4, user.demon_count,
                6, 0, // TEMPORARY, LEADERBOARD RANK
                8, user.creator_points,
                9, user.icon_id,
                10, user.color,
                11, user.color2,
                12, user.acc_ship,
                13, user.secret_coins,
                14, user.icon_type,
                15, user.acc_glow,
                16, user.account_id,
                17, user.user_coins,
                18, user.message_state,
                19, user.friends_state,
                20, user.youtube,
                21, user.acc_icon,
                22, user.acc_ship,
                23, user.acc_ball,
                24, user.acc_bird,
                25, user.acc_dart,
                26, user.acc_robot,
                28, user.acc_glow,
                29, user.is_registered,
                30, 0, // TEMPORARY, GLOBAL RANK
                //31, 1, // TEMPORARY
                43, user.acc_spider,
                44, user.twitter,
                45, user.twitch,
                46, user.diamonds,
                48, user.acc_explosion,
                49, user.mod,
                50, user.comment_history_state,
                51, user.color3,
                52, user.moons,
                53, user.acc_swing,
                54, user.acc_jetpack,
                55, user.demons, // FIX IN SCHEMA
                56, user.classic_levels, // FIX IN SCHEMA
                57, user.platformer_levels, // FIX IN SCHEMA
                58, user.discord,
                59, user.instagram,
                60, user.tiktok,
                61, user.custom
            ].join(":");
        } catch(error) {
            return -1;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            targetAccountID: t.Integer()
        })
    });