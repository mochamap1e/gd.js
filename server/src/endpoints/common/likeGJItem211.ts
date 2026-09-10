import { Elysia, t } from "elysia";
import { eq, sql } from "drizzle-orm";

import { db } from "@server/db/client";
import { levels, levelLists, accountComments } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const likeGJItem211 = new Elysia()
    .use(auth)
    .post("/likeGJItem211.php", async ({ body }) => {
        const { itemID, type, like } = body;
        const operator = like === 0 ? "-" : "+";

        let table;
        let equality;

        switch(type) {
            case 1:
                table = levels;
                equality = eq(levels.id, itemID);
                break;
            case 2:
                // add when level comments exist
                break;
            case 3:
                table = accountComments;
                equality = eq(accountComments.comment_id, itemID); 
                break;
            case 4:
                table = levelLists;
                equality = eq(levelLists.id, itemID);
                break;
        }

        if (table && equality) {
            try {
                const [item] = await db
                    .select()
                    .from(table)
                    .where(equality);

                if (item) {
                    await db
                        .update(table)
                        .set({
                            likes: sql`${item.likes} ${operator} 1`
                        });
                }
            } catch(error) {
                return 1;
            }
        }

        return 1;
    }, {
        commonSecret: true,
        body: t.Object({
            itemID: t.Integer(),
            type: t.Integer({ minimum: 1, maximum: 4 }),
            like: t.Integer({ minimum: 0, maximum: 1, default: 0 })
        })
    })