import { Elysia, t } from "elysia";

import { Key } from "@/utils/keys";
import { auth } from "@/utils/macros";
import { Salt } from "@/utils/salts";
import { colonSeparated, commaSeparated, decodeChk, encodeRewardsData } from "@/utils/text";

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

        const challengesData = colonSeparated(
            account.user_id,
            chk,
            udid,
            account.account_id,
            0,
            commaSeparated(attributes),
            commaSeparated(attributes),
            commaSeparated(attributes)
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