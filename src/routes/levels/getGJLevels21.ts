import { Elysia, t } from "elysia";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { levels } from "@server/db/schema";

enum Type {
    Search = 0,
    MostDownloaded = 1,
    MostLiked = 2,
    Trending = 3,
    Recent = 4,
    User = 5,
    Featured = 6,
    Magic = 7,
    ModeratorSent = 8,
    LevelArray = 10, // uses str to specify multiple levels
    Awarded = 11,
    Followed = 12,
    Friends = 13,
    HallOfFame = 16,
    DailyHistory = 21,
    WeeklyHistory = 22,
    EventHistory = 23,
    LevelList = 25,
    Sent = 27,
    Hyped = 31,
    DailyHistoryExcluding = 32,
    WeeklyHistoryExcluding = 33,
    EventHistoryExcluding = 34
}

enum Length {
    Tiny = 0,
    Short = 1,
    Medium = 2,
    Long = 3,
    XL = 4,
    Platformer = 5
}

export const getGJLevels21 = new Elysia()
    .use(gd)
    .post("/getGJLevels21.php", async ({ body, account }) => {
        try {
            const type = body.type || Type.MostLiked;
            const query = body.str;

            // query required on 5 and 10
            if ((type === Type.User || type === Type.LevelArray) && (!query))
                return -1;

            switch(type) {
                case Type.Search:
                    break;
                default:
                    return -1;
            }
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        optionalAccount: true,
        body: t.Object({
            type: t.Optional(t.Numeric()),
            str: t.Optional(t.String())
        })
    });
