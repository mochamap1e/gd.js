import { pgTable, serial, integer } from "drizzle-orm/pg-core";

import { level } from "@server/db/schema/level";

// need to add weekly and event levels, might merge this with level.ts

export const daily = pgTable("daily", {
    index: serial().notNull().primaryKey(),
    level_id: integer().references(() => level.level_id),
    next_level_id: integer().references(() => level.level_id)
});

export const dailyHistory = pgTable("daily_history", {
    index: serial().notNull().primaryKey(),
    level_id: integer().notNull().references(() => level.level_id)
});