import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";
import { GDError } from "@server/utils/errors";

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

            if (response.length !== 0) {
                let userObjects: string[] = [];

                response.forEach((user) => {
                    userObjects.push([
                        1, user.username,
                        2, user.user_id,
                        3, user.stars,
                        4, user.demon_count,
                        6, 999999,
                        7, user.account_highlight,
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
                        46, user.diamonds,
                        51, user.color3,
                        52, user.moons
                    ].join(":"));
                });

                const payload = userObjects.join("|");
                const page = [response.length, 0, 10].join(":");

                return [payload, page].join("#");
            } else {
                return GDError.Generic;
            }
        } catch(error) {
            console.error("Failed to fetch user:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        body: t.Object({
            str: t.String({ maxLength: 20 })
        })
    });