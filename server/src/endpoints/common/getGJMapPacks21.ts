import { Elysia, t } from "elysia";

import { db } from "@server/db/client";
import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";
import { Salt } from "@server/utils/salts";
import { createHash, join } from "@server/utils/text";

export const getGJMapPacks21 = new Elysia()
    .use(auth)
    .post("/getGJMapPacks21.php", async ({ body }) => {
        try {
            const response = await db.query.mapPacks.findMany({ with: { levels: true } });

            //////// build packs

            let packs = "";

            function object(pack: typeof response[number]) {
                let levelsString = "";

                //- todo: make whatever this is called a reusable function
                pack.levels.forEach((level) => levelsString += `${level.level_id},`);
                levelsString = levelsString.slice(0, -1);

                return join(":",
                    1, pack.id,
                    2, pack.name,
                    3, levelsString,
                    4, pack.stars,
                    5, pack.coins,
                    6, pack.difficulty,
                    7, pack.text_color,
                    8, pack.bar_color
                );
            }

            //- HERE IT IS AGAIN
            response.forEach((pack) => packs += `${object(pack)}|`);
            packs = packs.slice(0, -1);

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

            return join("#", packs, page, hash);
        } catch(error) {
            console.error("Failed to fetch map packs:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true
    });