import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const uploadGJLevel21 = new Elysia()
    .use(auth)
    .post("/uploadGJLevel21.php", async ({ body, account }) => {
        const submittedId = body.levelID;

        let data: typeof levels.$inferInsert = {
            game_version: body.gameVersion,
            player_id: account.account_id,
            id: undefined,
            level_name: body.levelName,
            description: body.levelDesc,
            version: body.levelVersion,
            length: body.levelLength,
            official_song: body.audioTrack,
            auto: Boolean(body.auto),
            password: body.password,
            copied_id: body.original,
            two_player: Boolean(body.twoPlayer),
            custom_song_id: body.songID,
            objects: body.objects,
            coins: body.coins,
            stars_requested: body.requestedStars,
            unlisted: body.unlisted,
            low_detail_mode: Boolean(body.ldm),
            level_string: body.levelString,
            editor_time: body.wt,
            editor_time_copies: body.wt2,
            verification_time: body.ts
        }

        try {
            if (submittedId === 0) { // upload as new level
                const [response] = await db.insert(levels).values(data).returning({ levelId: levels.id });
                return response!.levelId;
            } else { // update existing level
                const equality = eq(levels.id, submittedId);

                const query = await db
                    .select()
                    .from(levels)
                    .where(equality);

                const levelData = query[0]; if(!levelData) return -1;

                if (levelData.player_id === account.account_id) {
                    data.id = submittedId;
                    data.version = levelData.version + 1;
                    data.exact_update_time = Date.now();

                    await db
                        .update(levels)
                        .set(data)
                        .where(equality);

                    return submittedId;
                } else {
                    return -1;
                }
            }
        } catch(error) {
            console.log("Error uploading level:", error);
            return -1;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            gameVersion: t.Integer(),
            levelID: t.Integer(),
            levelName: t.String(),
            levelDesc: t.String(),
            levelVersion: t.Integer(),
            levelLength: t.Integer(),
            audioTrack: t.Integer(),
            auto: t.Integer(),
            password: t.String(),
            original: t.Integer(),
            twoPlayer: t.Integer(),
            songID: t.Integer(),
            objects: t.Integer(),
            coins: t.Integer(),
            requestedStars: t.Integer(),
            unlisted: t.Integer(),
            ldm: t.Integer(),
            levelString: t.String(),
            wt: t.Integer(),
            wt2: t.Integer(),
            ts: t.Integer()
        })
    });