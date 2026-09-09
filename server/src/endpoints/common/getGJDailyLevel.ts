import { Elysia, t } from "elysia";

import { getDailyLevelTimeRemaining } from "@server/cron/dailyLevel";

import { db } from "@server/db/client";
import { dailyLevel } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const getGJDailyLevel = new Elysia()
    .use(auth)
    .post("/getGJDailyLevel.php", async ({ body }) => {
        const { chk, type } = body;

        // event level requires chk
        if ((type === 2) && (!chk)) return -1;

        try {
            const [response] = await db.select().from(dailyLevel).limit(1);
            
            if (!response) return -1;

            const currentLevelIndex = response.index;
            const timeRemaining = getDailyLevelTimeRemaining();

            return `${currentLevelIndex}|${timeRemaining}`;
        } catch(error) {
            console.error("Error fetching daily level:", error);
            return -1;
        }
    }, {
        commonSecret: true,
        body: t.Object({
            chk: t.Optional(t.String()),
            type: t.Integer({ minimum: 0, maximum: 2 })
        })
    });