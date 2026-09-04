import { Elysia, t } from "elysia";
import { randomInt } from "mathjs";

import { GDError } from "@server/utils/errors";
import { Key } from "@server/utils/keys";
import { auth } from "@server/utils/plugins";
import { Salt } from "@server/utils/salts";
import { join, decodeChk, encodeRewardsData } from "@server/utils/text";

function k(x: number) { return x + 1000; }

const Item = {
    FireShard: 1,
    IceShard: 2,
    PoisonShard: 3,
    ShadowShard: 4,
    LavaShard: 5,
    DemonKey: 6,
    Orbs: 7,
    Diamonds: 8,
    EarthShard: 10,
    BloodShard: 11,
    MetalShard: 12,
    LightShard: 13,
    SoulShard: 14,
    GoldKey: 15,
    Cube: k(1),
    Col1: k(2),
    Col2: k(3),
    Ship: k(4),
    Ball: k(5),
    Bird: k(6),
    Dart: k(7),
    Robot: k(8),
    Spider: k(9),
    Streak: k(10),
    Death: k(11),
    GJItem: k(12),
    Swing: k(13),
    Jetpack: k(14),
    ShipFire: k(15)
}

const rewards: WraithReward[] = [
    {
        key: "meow",
        reward: join(",",
            Item.GoldKey, 1
        ),
        rewardId: 1,
        chestType: 2
    }
]

export const getGJSecretReward = new Elysia()
    .use(auth)
    .post("/getGJSecretReward.php", ({ body, account }) => {
        let { chk } = body;
        let rewardsData;
            
        chk = decodeChk(chk, Key.ChestReward);
        
        rewards.forEach(reward => {
            if (reward.key === body.rewardKey.toLowerCase().replaceAll(" ", "")) {
                rewardsData = join(
                    ":",
                    chk,
                    randomInt(1000, 9999), // the reward id is used to see which codes you've already claimed, for dev purposes this is randomized
                    reward.chestType,
                    reward.reward
                );
            }
        });

        if (rewardsData) {
            return encodeRewardsData(rewardsData, Key.ChestReward, Salt.Reward);
        } else {
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            chk: t.String(),
            rewardKey: t.String({ minLength: 1, maxLength: 100, error() { return GDError.Generic; } })
        })
    });