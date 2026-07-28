import { Elysia } from "elysia";

import { getGJUserInfo20 } from "./common/getGJUserInfo20";

export const common = new Elysia()
    .use(getGJUserInfo20);