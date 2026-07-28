import { Elysia, t } from "elysia";
import { randomInt } from "mathjs";

import { db } from "../../db/client";
import { level } from "../../db/schema";
import { GDError } from "../../utils/errors";
import { auth } from "../../utils/macros";

export const uploadGJLevel21 = new Elysia()
    .use(auth)
    .post("/uploadGJLevel21.php", async ({ body }) => {
        console.log("Uploading:", body);

        try {
            await db.insert(level).values({
                level_id: parseInt(body.levelID) === 0 ? randomInt(1000, 9999) : 0, // need to add level updating
                level_name: body.levelName,
                description: body.levelDesc,
                version: body.levelVersion,
                length: parseInt(body.levelLength),
                official_song: parseInt(body.audioTrack),
                auto: Boolean(body.auto),
                password: body.password,
                copied_id: parseInt(body.original),
                two_player: Boolean(body.twoPlayer),
                stars_requested: parseInt(body.requestedStars),
                unlisted: parseInt(body.unlisted),
                low_detail_mode: Boolean(body.ldm),
                level_string: body.levelString,
                // need to finish
            });
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
            seed2: t.String(),
            wt: t.String(),
            wt2: t.String(),
            ts: t.String(),
            lrs: t.String()
        })
    });