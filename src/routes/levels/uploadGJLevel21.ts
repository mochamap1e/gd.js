import { Elysia, t } from "elysia";

import { DESCRIPTION_MAX_LENGTH } from "@server/constants";
import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";

export const uploadGJLevel21 = new Elysia()
    .use(gd)
    .post("/uploadGJLevel21.php", async ({ body, account }) => {
        try {
            const [level] = await db
                .insert(levels)
                .values({
                    author: account.id,
                    name: body.levelName,
                    description: body.levelDesc,
                    version: body.levelVersion,
                    length: body.levelLength,
                    audio_track: body.audioTrack,
                    auto: Boolean(body.auto),
                    original: body.original !== 0 ? body.original : null,
                    two_player: Boolean(body.twoPlayer),
                    song_id: body.songID,
                    objects:  body.objects,
                    coins: body.coins,
                    requested_stars: body.requestedStars,
                    unlisted: body.unlisted,
                    ldm: Boolean(body.ldm),
                    level_string: body.levelString,
                    editor_time: body.wt,
                    editor_time_prev: body.wt2,
                    capacity_string: body.extraString,
                    steps: body.ts,
                    replay_string: body.lrs,
                    timestamp: body.ct,
                    song_ids: body.songIDs,
                    sfx_ids: body.sfxIDs
                })
                .returning();

            if (level) {
                return level.id;
            } else {
                return -1;
            }
        } catch(error) {
            console.error(error);
            return -1;
        }
    }, {
        secret: "Common",
        requiresAccount: true,
        body: t.Object({
            levelID: t.Numeric(),
            levelName: t.String(),
            levelDesc: t.String({ maxLength: DESCRIPTION_MAX_LENGTH }),
            levelVersion: t.Numeric(),
            levelLength: t.Numeric(),
            audioTrack: t.Numeric(),
            auto: t.Numeric(),
            original: t.Numeric(),
            twoPlayer: t.Numeric(),
            songID: t.Numeric(),
            objects: t.Numeric(),
            coins: t.Numeric(),
            requestedStars: t.Numeric(),
            unlisted: t.Numeric(),
            ldm: t.Numeric(),
            levelString: t.String(),
            wt: t.Optional(t.Numeric()),
            wt2: t.Optional(t.Numeric()),
            extraString: t.Optional(t.String()),
            ts: t.Optional(t.Numeric()),
            lrs: t.Optional(t.String()),
            notify: t.Optional(t.Numeric()),
            ct: t.Optional(t.Numeric()),
            songIDs: t.Optional(t.String()),
            sfxIDs: t.Optional(t.String())
        })
    });