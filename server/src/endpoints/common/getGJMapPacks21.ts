import { Elysia, t } from "elysia";

import { db } from "@server/db/client";
import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";
import { Salt } from "@server/utils/salts";
import { createHash } from "@server/utils/text";

export const getGJMapPacks21 = new Elysia()
    .use(auth)
    .post("/getGJMapPacks21.php", async ({ body }) => {
        try {
            const response = await db.query.mapPacks.findMany({ with: { levels: true } });

            //////// build packs

            let packs: string[] = [];

            function object(pack: typeof response[number]) {
                let levels: number[] = [];

                pack.levels.forEach((level) => levels.push(level.level_id));

                return [
                    1, pack.id,
                    2, pack.name,
                    3, levels.join(","),
                    4, pack.stars,
                    5, pack.coins,
                    6, pack.difficulty,
                    7, pack.text_color,
                    8, pack.bar_color
                ].join(":");
            }
            
            response.forEach((pack) => packs.push(object(pack)));

            //////// build page

            // todo Add pagination i also need to do that on account comments
            const page = "1:0:1";

            //////// build hash

            let hashSegments = "";

            response.forEach((pack) => {
                const idString = String(pack.id);
                hashSegments += 
                    idString[0] +
                    idString.slice(-1) +
                    pack.stars +
                    pack.coins;
            });

            const hash = createHash(hashSegments, Salt.Level);

            //////// return

            return [
                packs.join("|"),
                page,
                hash
            ].join("#");
        } catch(error) {
            console.error("Failed to fetch map packs:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true
    });