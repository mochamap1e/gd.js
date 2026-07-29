import { Elysia } from "elysia";

import { getGJChallenges } from "./common/getGJChallenges";
import { getGJRewards } from "./common/getGJRewards";
import { getGJSecretReward } from "./common/getGJSecretReward";
import { getGJUserInfo20 } from "./common/getGJUserInfo20";
import { updateGJDesc20 } from "./common/updateGJDesc20";
import { uploadGJLevel21 } from "./common/uploadGJLevel21";

export const common = new Elysia()
    .use(getGJChallenges)
    .use(getGJRewards)
    .use(getGJSecretReward)
    .use(getGJUserInfo20)
    .use(updateGJDesc20)
    .use(uploadGJLevel21);