import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const getGJUserInfo20 = new Elysia()
    .use(gd)
    .post("/getGJUserInfo20.php", async ({ body }) => {
        try {
            const [account] = await db
                .select()
                .from(accounts)
                .where(eq(accounts.account_id, body.targetAccountID));
            
            if (account) {
                return [
                    1, account.username,
                    2, account.account_id,
                    3, account.stars,
                    4, 0, // TEMP DEMON COUNT
                    6, 0, // TEMP GLOBAL LEADERBOARD RANK
                    8, account.creator_points,
                    9, account.icon_id,
                    10, account.color,
                    11, account.color2,
                    13, account.secret_coins,
                    14, account.icon_type,
                    15, 0, // TEMP SPECIAL
                    16, account.account_id,
                    17, account.user_coins,
                    18, account.message_state,
                    19, account.friends_state,
                    20, account.youtube,
                    21, account.icon,
                    22, account.ship,
                    23, account.ball,
                    24, account.bird,
                    25, account.dart,
                    26, account.robot,
                    28, account.glow,
                    29, true,
                    30, 0, // TEMP GLOBAL RANK
                    31, 0, // TEMP FRIEND STATE
                    43, account.spider,
                    44, account.twitter,
                    45, account.twitch,
                    46, account.diamonds,
                    48, account.explosion,
                    49, account.mod,
                    50, account.comment_history_state,
                    51, account.color3,
                    52, account.moons,
                    53, account.swing,
                    54, account.jetpack,
                    55, "0,0,0,0,0,0,0,0,0,0,0,0", // TEMP DEMONS
                    56, "0,0,0,0,0,0,0,0", // TEMP CLASSIC LEVELS
                    57, "0,0,0,0,0,0,0", // TEMP PLAT LEVELS
                    58, account.discord,
                    59, account.instagram,
                    60, account.tiktok,
                    61, "", // TEMP CUSTOM
                    62, account.group_state,
                    67, 0, // TEMP FOLLOWERS
                    69, false // TEMP ISFOLLOWING
                ].join(":");
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        body: t.Object({
            targetAccountID: t.Numeric()
        })
    });