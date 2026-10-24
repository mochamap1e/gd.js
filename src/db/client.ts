import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

import { config } from "@server/config";

const sqlite = new Database(config.get("db_name"));

export const db = drizzle({ client: sqlite });