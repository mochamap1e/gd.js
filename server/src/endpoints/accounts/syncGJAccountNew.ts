import { Elysia } from "elysia";

import { GDError } from "@/server/utils/errors";
import { auth } from "@/server/utils/plugins";
import { charSeparated } from "@/server/utils/text";

export const syncGJAccountNew = new Elysia()
    .use(auth)
    .post("/syncGJAccountNew.php", async ({ account }) => {
        try {
            if (account.save_data) {
                return charSeparated(
                    ";",
                    account.save_data,
                    account.save_data_game_version,
                    account.save_data_binary_version
                    // need to add the rest of the data when more of the account stuff is done
                );
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