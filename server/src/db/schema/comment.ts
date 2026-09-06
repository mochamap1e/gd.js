import { pgTable, serial, integer, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

import { level } from "@server/db/schema/level";
import { user } from "@server/db/schema/user";

export const accountComment = pgTable("account_comment", {
    comment_id: serial().notNull().primaryKey(),
    account_id: integer().notNull().references(() => user.account_id),
    
    comment: varchar().notNull(),

    likes: integer().notNull().default(0),
    dislikes: integer().notNull().default(0),

    posted_at: timestamp().notNull().defaultNow()
});

/*
export const levelComment = pgTable("level_comment", {
    comment_id: serial().notNull().primaryKey(),
    level_id: integer().references(() => level.level_id),
    user_id: integer().notNull().references(() => user.user_id),

    comment: varchar().notNull(),

    likes: integer().notNull().default(0),
    dislikes: integer().notNull().default(0),

    spam: boolean().notNull().default(false)
});
*/