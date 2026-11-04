import Elysia from "elysia";

import { uploadGJLevel21 } from "@server/routes/levels/uploadGJLevel21";

export const levels = new Elysia()
    .use(uploadGJLevel21);