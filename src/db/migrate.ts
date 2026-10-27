import path from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "@server/db/client";

export async function runMigration() {
    console.log("Applying database migrations...");

    await migrate(db, {
        migrationsFolder: Bun.isStandaloneExecutable ?
            path.join(import.meta.dir, "drizzle") :
            "./drizzle"
    });

    console.log("Done migrating.");
}