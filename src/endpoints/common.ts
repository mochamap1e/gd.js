import { Elysia } from "elysia";

import { getAccountURL } from "./common/getAccountURL";
import { getCustomContentURL } from "./common/getCustomContentURL";
import { getGJChallenges } from "./common/getGJChallenges";
import { getGJDailyLevel } from "./common/getGJDailyLevel";
import { getGJRewards } from "./common/getGJRewards";
import { getGJSecretReward } from "./common/getGJSecretReward";
import { getGJUserInfo20 } from "./common/getGJUserInfo20";
import { updateGJAccSettings20 } from "./common/updateGJAccSettings20";
import { updateGJDesc20 } from "./common/updateGJDesc20";
import { uploadGJLevel21 } from "./common/uploadGJLevel21";

export const common = new Elysia()
    .use(getAccountURL)
    .use(getCustomContentURL)
    .use(getGJChallenges)
    .use(getGJDailyLevel)
    .use(getGJRewards)
    .use(getGJSecretReward)
    .use(getGJUserInfo20)
    .use(updateGJAccSettings20)
    .use(updateGJDesc20)
    .use(uploadGJLevel21);