import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";
import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";

export const updateGJDesc20 = new Elysia()
    .use(auth)
    .post("/updateGJDesc20.php", async ({ body, account }) => {
        const equality = eq(levels.level_id, parseInt(body.levelID));

        try {
            const query = await db
                .select()
                .from(levels)
                .where(equality);

            const levelData = query[0]; if(!levelData) return GDError.Generic;

            if (levelData.player_id === account.account_id) {
                await db
                    .update(levels)
                    .set({ description: body.levelDesc })
                    .where(equality);

                return 1;
            } else {
                return GDError.Generic;
            }
        } catch(error) {
            console.error("Error updating level description:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            levelID: t.String(),
            levelDesc: t.String()
        })
    });