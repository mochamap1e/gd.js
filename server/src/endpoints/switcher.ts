import { Elysia } from "elysia";

import { getInfo } from "@server/endpoints/switcher/getInfo";

export const switcher = new Elysia({ prefix: "/switcher" })
    .use(getInfo);