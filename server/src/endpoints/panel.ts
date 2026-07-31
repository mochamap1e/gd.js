import { Elysia } from "elysia";

import { auth } from "./panel/auth";

export const panel = new Elysia({ prefix: "/api" })
    .use(auth);