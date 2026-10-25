import Elysia from "elysia";

import { getGJSongInfo } from "@server/routes/songs/getGJSongInfo";

export const songs = new Elysia()
    .use(getGJSongInfo);