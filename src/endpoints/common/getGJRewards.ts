import { Elysia, t } from "elysia";
import { randomInt } from "mathjs";

import { Key } from "@/utils/keys";
import { auth } from "@/utils/macros";
import { Salt } from "@/utils/salts";
import { charSeparated, decodeChk, encodeRewardsData } from "@/utils/text";

const items = [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14]; // 6 is key

const smallChestValues: ChestValues = {
    minOrbs: 20,
    maxOrbs: 50,
    minDiamonds: 1,
    maxDiamonds: 4,
    minShards: 0,
    maxShards: 1,
    minKeys: 0,
    maxKeys: 0,
    delay: 3600
}

const largeChestValues: ChestValues = {
    minOrbs: 100,
    maxOrbs: 300,
    minDiamonds: 4,
    maxDiamonds: 15,
    minShards: 1,
    maxShards: 2,
    minKeys: 0,
    maxKeys: 0,
    delay: 14400
}

function getRandomItem() {
    return items[randomInt(0, items.length)];
}

export const getGJRewards = new Elysia()
    .use(auth)
    .post("/getGJRewards.php", ({ body, account }) => {
        let { chk, udid, rewardType } = body;

        chk = decodeChk(chk, Key.ChestReward);

        const smallChestRewards: ChestRewards = {
            orbs: randomInt(smallChestValues.minOrbs, smallChestValues.maxOrbs),
            diamonds: randomInt(smallChestValues.minDiamonds, smallChestValues.maxDiamonds),
            item1: getRandomItem(),
            item2: getRandomItem()
        };

        const largeChestRewards: ChestRewards = {
            orbs: randomInt(largeChestValues.minOrbs, largeChestValues.maxOrbs),
            diamonds: randomInt(largeChestValues.minDiamonds, largeChestValues.maxDiamonds),
            item1: getRandomItem(),
            item2: getRandomItem()
        };

        const rewardsData = charSeparated(
            ":",
            account.user_id,
            chk,
            udid,
            account.account_id,
            0,
            charSeparated(",", smallChestRewards),
            670,
            0,
            charSeparated(",", largeChestRewards),
            671,
            rewardType
        );

        return encodeRewardsData(rewardsData, Key.ChestReward, Salt.Reward);
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            chk: t.String(),
            udid: t.String(),
            rewardType: t.String()
        })
    });