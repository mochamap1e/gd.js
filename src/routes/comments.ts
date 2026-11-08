import Elysia from "elysia";

import { deleteGJAccComment20 } from "@server/routes/comments/deleteGJAccComment20";
import { getGJAccountComments20 } from "@server/routes/comments/getGJAccountComments20";
import { uploadGJAccComment20 } from "@server/routes/comments/uploadGJAccComment20";

export const comments = new Elysia()
    .use(deleteGJAccComment20)
    .use(getGJAccountComments20)
    .use(uploadGJAccComment20);