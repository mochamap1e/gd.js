import { Elysia } from "elysia";

import { getGJUserInfo20 } from "./users/getGJUserInfo20";

export const users = new Elysia()
    .use(getGJUserInfo20);