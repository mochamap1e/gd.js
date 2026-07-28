import { Elysia } from "elysia";

import { getGJRewards } from "./common/getGJRewards";
import { getGJUserInfo20 } from "./common/getGJUserInfo20";
import { uploadGJLevel21 } from "./common/uploadGJLevel21";

export const common = new Elysia()
    .use(getGJRewards)
    .use(getGJUserInfo20)
    .use(uploadGJLevel21);