import { Elysia, t } from "elysia";

import { createHash } from "../../utils/hash";
import { auth } from "../../utils/macros";

function xor(data: string, key: string) {
    let out = "";

    for (let i = 0; i < data.length; i++) {
        out += String.fromCharCode(
            data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }

    return out;
}

function randomString() {
    const chars = "1234567890qwertyuiopaqsdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let string = "";

    for (let i = 0; i < 5; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }

    return string;
}

function createChestRewards(
    userId: number,
    chk: string,
    udid: string,
    accountId: number,
    smallTimeRemaining: number,
    smallChestRewards: string,
    smallChestId: number,
    largeTimeRemaining: number,
    largeChestRewards: string,
    largeChestId: number,
    rewardType: string
) {
    return `${userId}:${chk}:${udid}:${accountId}:${smallTimeRemaining}:${smallChestRewards}:` +
        `${smallChestId}:${largeTimeRemaining}:${largeChestRewards}:${largeChestId}:${rewardType}`;
}

function chestRewardsToString(rewards: ChestRewards) {
    return Object.values(rewards).join(",");
}

export const getGJRewards = new Elysia()
    .use(auth)
    .post("/getGJRewards.php", ({ body, account }) => {
        let { chk, udid, rewardType } = body;

        const xorKey = "59182";

        chk = chk.slice(5); // remove random 5 chars
        chk = atob(chk); // decode base64
        chk = xor(chk, xorKey); // remove xor

        const smallChestRewards: ChestRewards = { orbs: 5000, diamonds: 25, item1: 2, item2: 6 };
        const largeChestRewards: ChestRewards = { orbs: 67, diamonds: 67, item1: 3, item2: 4 };

        const rewardsData = createChestRewards(
            account.user_id,
            chk,
            udid,
            account.account_id,
            0,
            chestRewardsToString(smallChestRewards),
            670,
            0,
            chestRewardsToString(largeChestRewards),
            671,
            rewardType
        );

        const plaintext = `${randomString()}:${rewardsData}`; // append random string
        const xored = xor(plaintext, xorKey); // XOR
        const encoded = Buffer.from(xored, "latin1").toString("base64url"); // to url safe base64
        
        const response = randomString() + encoded; // append random string again
        const hash = createHash(encoded, "pC26fpYaQCtg"); // hash

        return `${response}|${hash}`;
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            chk: t.String(),
            udid: t.String(),
            rewardType: t.String()
        })
    });