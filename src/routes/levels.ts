import Elysia from "elysia";

import { deleteGJLevelUser20 } from "@server/routes/levels/deleteGJLevelUser20";
import { updateGJDesc20 } from "@server/routes/levels/updateGJDesc20";
import { uploadGJLevel21 } from "@server/routes/levels/uploadGJLevel21";

export const levels = new Elysia()
    .use(deleteGJLevelUser20)
    .use(updateGJDesc20)
    .use(uploadGJLevel21);