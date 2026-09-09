import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const getGJUsers20 = new Elysia()
    .use(auth)
    .post("/getGJUsers20.php", async ({ body }) => {
        const isId = /^\d+$/.test(body.str);

        const equality = isId ?
            eq(users.account_id, parseInt(body.str)) :
            eq(users.username, body.str);

        try {
            const response = await db
                .select()
                .from(users)
                .where(equality);

            const targetUser = response[0];

            if (targetUser) {
                const payload = [
                    1, targetUser.username,
                    2, targetUser.user_id,
                    3, targetUser.stars,
                    4, targetUser.demon_count,
                    6, 999999,
                    7, targetUser.account_highlight,
                    8, targetUser.creator_points,
                    9, targetUser.icon_id,
                    10, targetUser.color,
                    11, targetUser.color2,
                    12, targetUser.acc_ship,
                    13, targetUser.secret_coins,
                    14, targetUser.icon_type,
                    15, targetUser.acc_glow,
                    16, targetUser.account_id,
                    17, targetUser.user_coins,
                    46, targetUser.diamonds,
                    51, targetUser.color3,
                    52, targetUser.moons
                ].join(":");

                const page = [response.length, 0, 10].join(":");

                return [payload, page].join("#");
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        commonSecret: true,
        body: t.Object({
            str: t.String({ maxLength: 20 })
        })
    });