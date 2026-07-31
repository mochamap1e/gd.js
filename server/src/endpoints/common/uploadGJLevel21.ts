import { Elysia, t } from "elysia";
import { randomInt } from "mathjs";
import { eq } from "drizzle-orm";

import { db } from "@/server/db/client";
import { level } from "@/server/db/schema";
import { GDError } from "@/server/utils/errors";
import { auth } from "@/server/utils/plugins";

export const uploadGJLevel21 = new Elysia()
    .use(auth)
    .post("/uploadGJLevel21.php", async ({ body, account }) => {
        const submittedId = parseInt(body.levelID);

        let data: typeof level.$inferInsert = {
            game_version: parseInt(body.gameVersion),
            player_id: parseInt(body.accountID!),
            level_id: undefined!,
            level_name: body.levelName,
            description: body.levelDesc,
            version: parseInt(body.levelVersion),
            length: parseInt(body.levelLength),
            official_song: parseInt(body.audioTrack),
            auto: Boolean(parseInt(body.auto)),
            password: body.password,
            copied_id: parseInt(body.original),
            two_player: Boolean(parseInt(body.twoPlayer)),
            custom_song_id: parseInt(body.songID),
            objects: parseInt(body.objects),
            coins: parseInt(body.coins),
            stars_requested: parseInt(body.requestedStars),
            unlisted: parseInt(body.unlisted),
            low_detail_mode: Boolean(parseInt(body.ldm)),
            level_string: body.levelString,
            editor_time: parseInt(body.wt),
            editor_time_copies: parseInt(body.wt2),
            verification_time: parseInt(body.ts),
            exact_upload_time: Date.now()
        }

        try {
            if (submittedId === 0) {
                // upload as new level
                const id = randomInt(1000, 9999);

                data.level_id = id;

                await db.insert(level).values(data);

                return id;
            } else {
                // update existing level
                const equality = eq(level.level_id, submittedId);

                const query = await db
                    .select()
                    .from(level)
                    .where(equality);

                const levelData = query[0]; if(!levelData) return GDError.Generic;

                if (levelData.player_id === account.account_id) {
                    data.level_id = submittedId;
                    data.version = levelData.version + 1;

                    await db
                        .update(level)
                        .set(data)
                        .where(equality);

                    return submittedId;
                } else {
                    return GDError.Generic;
                }
            }
        } catch(error) {
            console.log("Error uploading level:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            gameVersion: t.String(),
            levelID: t.String(),
            levelName: t.String(),
            levelDesc: t.String(),
            levelVersion: t.String(),
            levelLength: t.String(),
            audioTrack: t.String(),
            auto: t.String(),
            password: t.String(),
            original: t.String(),
            twoPlayer: t.String(),
            songID: t.String(),
            objects: t.String(),
            coins: t.String(),
            requestedStars: t.String(),
            unlisted: t.String(),
            ldm: t.String(),
            levelString: t.String(),
            wt: t.String(),
            wt2: t.String(),
            ts: t.String()
        })
    });