import { pgTable, serial, integer, varchar, boolean } from "drizzle-orm/pg-core";

import { user } from "@server/db/schema/user";
import { level } from "@server/db/schema/level";

export const list = pgTable("list", {
    list_id: serial().notNull().primaryKey(),
    list_name: varchar({ length: 25 }).notNull(),
    description: varchar(),
    version: integer().notNull(),
    difficulty: integer().notNull(),
    downloads: integer().notNull(),
    likes: integer().notNull(),
    rated: boolean().notNull(),
    upload_date: varchar().notNull(),
    update_date: varchar().notNull(),
    account_id: integer().notNull().references(() => user.account_id),
    // level_ids: ADD JUNCTION TABLE THING HERE
    list_reward: integer().notNull(),
    list_reward_requirement: integer().notNull()
});