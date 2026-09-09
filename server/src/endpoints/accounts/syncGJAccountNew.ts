import { Elysia } from "elysia";

import { auth } from "@server/utils/plugins";
import { encodeAccountLevelsData } from "@server/utils/text";

// rated levels is a list of every rated id and their star value
// map packs is all of the map packs but just their stats
// thank you zmx for explaining this ...

export const syncGJAccountNew = new Elysia()
    .use(auth)
    .post("/syncGJAccountNew.php", async ({ account }) => {
        try {
            if (account.save_data) {
                return [
                    account.save_data,
                    account.save_data_game_version,
                    account.save_data_binary_version
                ].join(";") + ";;;";
            } else {
                return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        accountSecret: true,
        requiresAuthentication: true
    });