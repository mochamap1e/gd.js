import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { config } from "@server/lib/config";

const url = config.get("db_url");
export const db = drizzle(url);

// make sure db works
try {
    await db.execute("select 1");
} catch(error) {
    console.log(`Failed to connect to PostgreSQL! Are you sure it is running at '${url}'?`);
    process.exit(1);
}

// enable citext
await db.execute(sql`CREATE EXTENSION IF NOT EXISTS citext;`);