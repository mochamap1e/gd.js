import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";
import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";

export const deleteGJLevelUser20 = new Elysia()
    .use(auth)
    .post("/deleteGJLevelUser20.php", async ({ body, account }) => {
        const { levelID } = body;

        const equality = eq(levels.level_id, parseInt(levelID));

        try {
            const query = await db
                .select()
                .from(levels)
                .where(equality);

            const targetLevel = query[0];

            if (!targetLevel) return GDError.Generic; // level does not exist
            if (targetLevel.player_id !== account.account_id) return GDError.Generic; // user does not own level

            await db
                .delete(levels)
                .where(equality);

            return 1;
        } catch(error) {
            console.error("Failed to delete level:", error);
        }
    }, {
        requiresAuthentication: true,
        levelSecret: true,
        body: t.Object({
            levelID: t.String()
        })
    });