import { Elysia, t } from "elysia";

import { getDailyLevelTimeRemaining } from "@/cron/dailyLevel";
import { db } from "@/db/client";
import { daily } from "@/db/schema";
import { GDError } from "@/utils/errors";
import { auth } from "@/utils/macros";

export const getGJDailyLevel = new Elysia()
    .use(auth)
    .post("/getGJDailyLevel.php", async ({ body }) => {
        const { chk, type } = body;

        // event level requires chk
        if ((type === "2") && (!chk)) return GDError.Generic;

        try {
            const query = await db.select().from(daily).limit(1);
            const currentLevel = query[0]; if (!currentLevel) return GDError.Generic;

            const currentLevelIndex = currentLevel.index;
            const timeRemaining = getDailyLevelTimeRemaining();

            return `${currentLevelIndex}|${timeRemaining}`;
        } catch(error) {
            console.error("Error fetching daily level:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        body: t.Object({
            chk: t.Optional(t.String()),
            type: t.Union([t.Literal("0"), t.Literal("1"), t.Literal("2")])
        })
    });