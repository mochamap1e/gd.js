import Elysia from "elysia";

import { getCustomContentURL } from "@server/routes/misc/getCustomContentURL";

export const misc = new Elysia()
    .use(getCustomContentURL);