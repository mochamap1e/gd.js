import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";
import { GDError } from "@server/utils/errors";

export const backupGJAccountNew = new Elysia()
    .use(auth)
    .post("/backupGJAccountNew.php", async ({ body, account }) => {
        try {
            await db
                .update(users)
                .set({
                    save_data: body.saveData,
                    save_data_game_version: parseInt(body.gameVersion),
                    save_data_binary_version: parseInt(body.binaryVersion)
                })
                .where(eq(users.account_id, account.account_id));

            return 1;
        } catch(error) {
            console.error("Failed to save data:", error);
            return GDError.Generic;
        }
    }, {
        accountSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            gameVersion: t.String(),
            binaryVersion: t.String(),
            saveData: t.String()
        })
    });