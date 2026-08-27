import { pgTable, serial, integer } from "drizzle-orm/pg-core";

import { level } from "@/server/db/schema/level";

export const daily = pgTable("daily", {
    index: serial().notNull().primaryKey(),
    level_id: integer().references(() => level.level_id),
    next_level_id: integer().references(() => level.level_id)
});

export const dailyHistory = pgTable("daily_history", {
    index: serial().notNull().primaryKey(),
    level_id: integer().notNull().references(() => level.level_id)
});