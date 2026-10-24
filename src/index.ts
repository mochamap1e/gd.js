import Elysia from "elysia";

import { config } from "@server/config";
import { runMigration } from "@server/db/migrate";

await runMigration();

new Elysia({
    serve: {
        hostname: config.get("host")
    }
})
    // routes
    .get("/", () => "hi")

    // run
    .listen(
        config.get("port"),
        ({ hostname, port }) => console.log(`\u{2713} Server running at ${hostname}:${port}`)
    );