import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const deleteGJLevelUser20 = new Elysia()
    .use(auth)
    .post("/deleteGJLevelUser20.php", async ({ body, account }) => {
        const { levelID } = body;

        const equality = eq(levels.id, levelID);

        try {
            const query = await db
                .select()
                .from(levels)
                .where(equality);

            const targetLevel = query[0];

            if (!targetLevel) return -1; // level does not exist
            if (targetLevel.player_id !== account.account_id) return -1; // user does not own level

            await db
                .delete(levels)
                .where(equality);

            return 1;
        } catch(error) {
            return -1;
        }
    }, {
        requiresAuthentication: true,
        levelSecret: true,
        body: t.Object({
            levelID: t.Integer()
        })
    });