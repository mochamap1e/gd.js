import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const syncGJAccountNew = new Elysia()
    .use(gd)
    .post("/database/accounts/syncGJAccountNew.php", async ({ body, account }) => {
        try {
            if (account.save_data) {
                return [
                    account.save_data,
                    account.save_data_game_version,
                    account.save_data_binary_version
                ].join(";") + ";;;"; // add the rated lelvels and map pack stuff later
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Account",
        requiresAccount: true
    });