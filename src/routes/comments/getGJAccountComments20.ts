import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accountComments } from "@server/db/schema";

export const getGJAccountComments20 = new Elysia()
    .use(gd)
    .post("/getGJAccountComments20.php", async ({ body }) => {
        try {
            const comments = await db
                .select()
                .from(accountComments)
                .where(eq(accountComments.author, body.accountID));

            // not working

            console.log(comments);
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        body: t.Object({
            accountID: t.Numeric(),
            page: t.Numeric()
        })
    });