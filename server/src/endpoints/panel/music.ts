import path from "path";
import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@/server/db/client";
import { panelUser } from "@/server/db/schema";
import { panelAuth } from "@/server/utils/plugins";
import { join } from "@/server/utils/text";

const dataFile = "cdn/music/musiclibrary_02.dat";

function artist(
    id: number,
    name: string,
    website: string,
    youtube: string
) {
    return join(",", id, name, encodeURIComponent(website), youtube);
}

function song(
    id: number,
    name: string,
    artistId: number,
    fileSize: number,
    duration: number,
    tags: string[],
    platform: string,
    extraArtists: number[],
    link: string,
    isNew: boolean,
    priority: number,
    number: number
) {
    return join(",",
        id,
        name,
        artistId,
        fileSize,
        duration,
        join(".", tags),
        platform,
        join(".", extraArtists),
        encodeURIComponent(link)
    );
}

export const music = new Elysia({ prefix: "/music" })
    .use(panelAuth)
    .post("/create", async ({ status }) => {
        const data = Bun.file(dataFile);

        console.log(join("|",
            1,
            join(";",
                artist( 
                    1,
                    "ExampleArtist",
                    "https://example.com",
                    "UCwc-21f1s3WSVYEOdAEf1uQ"
                ),
                artist(
                    2,
                    "ExampleArtist2",
                    "https://example.com",
                    "UCwc-21f1s3WSVYEOdAEf1uQ"
                )
            )
        ));
    }, { requiresAuthentication: true });