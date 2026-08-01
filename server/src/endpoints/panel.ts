import { Elysia } from "elysia";

import { auth } from "./panel/auth";
import { music } from "./panel/music";

export const panel = new Elysia({ prefix: "/api" })
    .use(auth)
    .use(music);