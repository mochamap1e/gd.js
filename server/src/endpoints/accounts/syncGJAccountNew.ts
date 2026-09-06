import { Elysia } from "elysia";

import { GDError } from "@server/utils/errors";
import { auth } from "@server/utils/plugins";
import { join, encodeAccountLevelsData } from "@server/utils/text";

export const syncGJAccountNew = new Elysia()
    .use(auth)
    .post("/syncGJAccountNew.php", async ({ account }) => {
        try {
            if (account.save_data) {
                return join(
                    ";",
                    account.save_data,
                    account.save_data_game_version,
                    account.save_data_binary_version
                ) + ";;;"; // skip the levels and map packs thing for now cuz the docs confuse me
            } else {
                return GDError.Generic;
            }
        } catch(error) {
            console.error("Failed to sync data:", error);
            return GDError.Generic;
        }
    }, {
        accountSecret: true,
        requiresAuthentication: true
    });