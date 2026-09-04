import { pgTable, serial, integer, varchar, boolean } from "drizzle-orm/pg-core";

import { level } from "@server/db/schema/level";
import { user } from "@server/db/schema/user";

export const comment = pgTable("comment", {
    comment_id: serial().notNull().primaryKey(),
    level_id: integer().references(() => level.level_id),
    user_id: integer().notNull().references(() => user.user_id),

    comment: varchar().notNull(),

    likes: integer().notNull().default(0),
    dislikes: integer().notNull().default(0),

    spam: boolean().notNull().default(false)
});