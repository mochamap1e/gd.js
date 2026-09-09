import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

export const backupGJAccountNew = new Elysia()
    .use(auth)
    .post("/backupGJAccountNew.php", async ({ body, account }) => {
        try {
            await db
                .update(users)
                .set({
                    save_data: body.saveData,
                    save_data_game_version: body.gameVersion,
                    save_data_binary_version: body.binaryVersion
                })
                .where(eq(users.account_id, account.account_id));

            return 1;
        } catch(error) {
            return -1;
        }
    }, {
        accountSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            saveData: t.String(),
            gameVersion: t.Integer(),
            binaryVersion: t.Integer()
        })
    });