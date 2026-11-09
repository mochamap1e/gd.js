import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";

export const downloadGJLevel22 = new Elysia()
    .use(gd)
    .post("/downloadGJLevel22.php", async ({ body, account }) => {
        try {
            const [level] = await db
                .select()
                .from(levels)
                .where(eq(levels.id, body.levelID));

            if (level) {
                return [
                    1, level.id,
                    2, level.name,
                    3, level.description,
                    4, level.level_string,
                    5, level.version,
                    6, level.author,
                    8, 0, // temp denominator
                    9, 0, // temp numerator
                    10, 9999, // temp downloads
                    12, level.audio_track,
                    13, level.game_version,
                    14, 9999, // temp likes
                    15, level.length,
                    16, 0, // temp dislikes
                    17, false, // tmep demon
                    18, 9999, // tmep stars

                    // finish later bleh
                ].join(":");
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        optionalAccount: true,
        body: t.Object({
            levelID: t.Numeric()
        })
    });