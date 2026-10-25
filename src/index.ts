import Elysia from "elysia";

import { config } from "@server/config";
import { runMigration } from "@server/db/migrate";

import { accounts } from "@server/routes/accounts";
import { users } from "@server/routes/users";

if (Bun.isStandaloneExecutable) { await runMigration(); }

const GDPS = new Elysia({
    serve: {
        hostname: config.get("host")
    }
})
    // block requests with a user agent
    .resolve(({ request, status }) => {
        const url = new URL(request.url);
        const hasUserAgent = ![null, ""].includes(request.headers.get("User-Agent"));

        const excludedRoutes = ["/accounts/activate"];

        if (hasUserAgent && !excludedRoutes.includes(url.pathname)) {
            return status(403);
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

    // routes
    .use(accounts)
    .use(users)

    // run
    .listen(
        config.get("port"),
        ({ hostname, port }) => console.log(`\u{2713} Server running at ${hostname}:${port}`)
    );