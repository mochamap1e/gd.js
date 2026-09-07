import { Elysia } from "elysia";

import { deleteGJAccComment20 } from "@server/endpoints/common/deleteGJAccComment20";
import { deleteGJLevelUser20 } from "@server/endpoints/common/deleteGJLevelUser20";
import { getAccountURL } from "@server/endpoints/common/getAccountURL";
import { getCustomContentURL } from "@server/endpoints/common/getCustomContentURL";
import { getGJAccountComments20 } from "@server/endpoints/common/getGJAccountComments20";
import { getGJChallenges } from "@server/endpoints/common/getGJChallenges";
import { getGJDailyLevel } from "@server/endpoints/common/getGJDailyLevel";
import { getGJLevels21 } from "@server/endpoints/common/getGJLevels21";
import { getGJMapPacks21 } from "@server/endpoints/common/getGJMapPacks21";
import { getGJRewards } from "@server/endpoints/common/getGJRewards";
import { getGJSecretReward } from "@server/endpoints/common/getGJSecretReward";
import { getGJUserInfo20 } from "@server/endpoints/common/getGJUserInfo20";
import { getGJUsers20 } from "@server/endpoints/common/getGJUsers20";
import { updateGJAccSettings20 } from "@server/endpoints/common/updateGJAccSettings20";
import { updateGJDesc20 } from "@server/endpoints/common/updateGJDesc20";
import { updateGJUserScore22 } from "@server/endpoints/common/updateGJUserScore22";
import { uploadFriendRequest20 } from "@server/endpoints/common/uploadFriendRequest20";
import { uploadGJAccComment20 } from "@server/endpoints/common/uploadGJAccComment20";
import { uploadGJLevel21 } from "@server/endpoints/common/uploadGJLevel21";

export const common = new Elysia()
    .use(deleteGJAccComment20)
    .use(deleteGJLevelUser20)
    .use(getAccountURL)
    .use(getCustomContentURL)
    .use(getGJAccountComments20)
    .use(getGJChallenges)
    .use(getGJDailyLevel)
    .use(getGJLevels21)
    .use(getGJMapPacks21)
    .use(getGJRewards)
    .use(getGJSecretReward)
    .use(getGJUserInfo20)
    .use(getGJUsers20)
    .use(updateGJAccSettings20)
    .use(updateGJDesc20)
    .use(updateGJUserScore22)
    .use(uploadFriendRequest20)
    .use(uploadGJAccComment20)
    .use(uploadGJLevel21);