import Elysia from "elysia";

import { config } from "@server/lib/config";
import { runMigration } from "@server/db/migrate";

import { accounts } from "@server/routes/accounts";
import { comments } from "@server/routes/comments";
import { levels } from "@server/routes/levels";
import { misc } from "@server/routes/misc";
import { songs } from "@server/routes/songs";
import { users } from "@server/routes/users";

if (Bun.isStandaloneExecutable) { await runMigration(); }

new Elysia({
    serve: {
        hostname: config.get("host")
    }
})
    // lifecycle
    .onRequest(async ({ request }) => {
        const url = new URL(request.url);
        console.log("Requested:", request.method, url.pathname + url.search);
        try {
            //console.log("Body:", await request.clone().text());
        } catch {
            console.log("Body: <unreadable>");
        }
    })
    .onError({ as: "global" }, ({ code, error }) => {
        return -1;
    })

    // routes
    .use(accounts)
    .use(comments)
    .use(levels)
    .use(misc)
    .use(songs)
    .use(users)

    // run
    .listen(
        config.get("port"),
        ({ hostname, port }) => console.log(`\u{2713} Server running at ${hostname}:${port}`)
    );