import { Elysia, t } from "elysia";

import { Key } from "@server/utils/keys";
import { auth } from "@server/utils/plugins";
import { Salt } from "@server/utils/salts";
import { join, decodeChk, encodeRewardsData } from "@server/utils/text";

export const getGJChallenges = new Elysia()
    .use(auth)
    .post("/getGJChallenges.php", ({ body, account }) => {
        let { chk, udid } = body;

        chk = decodeChk(chk, Key.DailyChallenge);

        const attributes: QuestAttributes = {
            questsCompleted: 0,
            itemNeeded: 2,
            itemNeededAmount: 67,
            diamonds: 67,
            name: "meow"
        }

        const challengesData = join(
            ":",
            account.user_id,
            chk,
            udid,
            account.account_id,
            0,
            join(",", attributes),
            join(",", attributes),
            join(",", attributes)
        );

        return encodeRewardsData(challengesData, Key.DailyChallenge, Salt.Challenge);
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            chk: t.String(),
            udid: t.String()
        })
    });