import Elysia from "elysia";

import { config } from "@server/config";
import { runMigration } from "@server/db/migrate";

import { accounts } from "@server/routes/accounts";

await runMigration();

new Elysia({
    serve: {
        hostname: config.get("host")
    }
})

    // lifecycle

    .guard({
        beforeHandle({ request, body, redirect }) {
            console.log("Requested:", request.url);
            console.log("Body:", body);
        },
        afterHandle({ responseValue }) {
            console.log("Response:", responseValue);
        }
    })

    .onError(({ set }) => {
        set.status = 200;
        return -1;
    })

    // routes
    .use(accounts)

    // run
    .listen(
        config.get("port"),
        ({ hostname, port }) => console.log(`\u{2713} Server running at ${hostname}:${port}`)
    );