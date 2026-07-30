import { Elysia, t } from "elysia";

import { Key } from "@/utils/keys";
import { auth } from "@/utils/macros";
import { Salt } from "@/utils/salts";
import { charSeparated, decodeChk, encodeRewardsData } from "@/utils/text";

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

        const challengesData = charSeparated(
            ":",
            account.user_id,
            chk,
            udid,
            account.account_id,
            0,
            charSeparated(",", attributes),
            charSeparated(",", attributes),
            charSeparated(",", attributes)
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