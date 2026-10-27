import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

import { config } from "@server/lib/config";

export const db = drizzle(config.get("db_url"));

// enable citext
await db.execute(sql`CREATE EXTENSION IF NOT EXISTS citext;`);