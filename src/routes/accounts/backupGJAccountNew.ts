import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const backupGJAccountNew = new Elysia()
    .use(gd)
    .post("/database/accounts/backupGJAccountNew.php", async ({ body, account }) => {
        try {
            await db
                .update(accounts)
                .set({
                    save_data: body.saveData,
                    save_data_game_version: body.gameVersion,
                    save_data_binary_version: body.binaryVersion
                })
                .where(eq(accounts.account_id, account.account_id));

            return 1;
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Account",
        requiresAccount: true,
        body: t.Object({
            gameVersion: t.Numeric(),
            binaryVersion: t.Numeric(),
            saveData: t.String()
        })
    });