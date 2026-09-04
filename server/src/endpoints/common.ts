import { Elysia } from "elysia";

import { deleteGJLevelUser20 } from "@server/endpoints/common/deleteGJLevelUser20";
import { getAccountURL } from "@server/endpoints/common/getAccountURL";
import { getCustomContentURL } from "@server/endpoints/common/getCustomContentURL";
import { getGJChallenges } from "@server/endpoints/common/getGJChallenges";
import { getGJDailyLevel } from "@server/endpoints/common/getGJDailyLevel";
import { getGJLevels21 } from "@server/endpoints/common/getGJLevels21";
import { getGJRewards } from "@server/endpoints/common/getGJRewards";
import { getGJSecretReward } from "@server/endpoints/common/getGJSecretReward";
import { getGJUserInfo20 } from "@server/endpoints/common/getGJUserInfo20";
import { updateGJAccSettings20 } from "@server/endpoints/common/updateGJAccSettings20";
import { updateGJDesc20 } from "@server/endpoints/common/updateGJDesc20";
import { updateGJUserScore22 } from "@server/endpoints/common/updateGJUserScore22";
import { uploadGJLevel21 } from "@server/endpoints/common/uploadGJLevel21";

export const common = new Elysia()
    .use(deleteGJLevelUser20)
    .use(getAccountURL)
    .use(getCustomContentURL)
    .use(getGJChallenges)
    .use(getGJDailyLevel)
    .use(getGJLevels21)
    .use(getGJRewards)
    .use(getGJSecretReward)
    .use(getGJUserInfo20)
    .use(updateGJAccSettings20)
    .use(updateGJDesc20)
    .use(updateGJUserScore22)
    .use(uploadGJLevel21);