import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc.js";
import timezonePlugin from "dayjs/plugin/timezone.js";
import { Elysia } from "elysia";
import { cron, Patterns } from "@elysia/cron";

import { db } from "@/server/db/client";
import { daily, dailyHistory } from "@/server/db/schema";

const timezone = "America/New_York"; // which time zone it has to be midnight in for the daily level to reset
const pattern = Patterns.EVERY_DAY_AT_MIDNIGHT;

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

export function getDailyLevelTimeRemaining() {
    const now = dayjs().tz(timezone);
    const midnight = now.startOf("day").add(1, "day");

    return midnight.diff(now, "second"); 
}

export const dailyLevelJob = new Elysia()
    .use(cron({
        name: "Daily Level",
        pattern,
        timezone,
        async run() {
            try {
                const query = await db.select().from(daily).limit(1);
                const currentLevel = query[0];
                
                if (!currentLevel)
                    throw new Error("Failed to find daily level in database!");

                if ((currentLevel.level_id == null) && (currentLevel.next_level_id == null)) {
                    console.log("Current daily has neither a level id or a next level id. Skipping daily rotation.");
                    return;
                }

                const newDailyId = currentLevel.next_level_id ?? null;

                await db.transaction(async (tx) => {
                    // add current daily to history
                    if (currentLevel.level_id != null) {
                        await tx.insert(dailyHistory).values({
                            index: currentLevel.index,
                            level_id: currentLevel.level_id
                        });
                    }

                    // update daily
                    await tx.update(daily).set({
                        level_id: newDailyId,
                        next_level_id: null
                    });
                });

                if (newDailyId != null) {
                    console.log(`Updated daily level to ${newDailyId}`);
                } else {
                    console.log("Cleared daily level (no next level was provided)");
                }
            } catch(error) {
                console.error("Failed to update daily level:", error);
            }
        }
    }));