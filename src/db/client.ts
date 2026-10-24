import { mkdir } from "node:fs/promises";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

await mkdir("./data", { recursive: true });

const sqlite = new Database("data/database.db");

sqlite.run("PRAGMA foreign_keys = ON;");
sqlite.run("PRAGMA journal_mode = WAL;");
sqlite.run("PRAGMA synchronous = NORMAL;");
sqlite.run("PRAGMA busy_timeout = 5000;");

export const db = drizzle({ client: sqlite });