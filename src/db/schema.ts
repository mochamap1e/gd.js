import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable("accounts", {
    // main stuff
    account_id: integer().primaryKey({ autoIncrement: true }),
    activated: integer({ mode: "boolean" }).notNull(),
    activation_token: text().notNull().unique(),
    username: text().notNull().unique(),
    password: text().notNull(),
    email: text().notNull().unique(),

    // save data
    save_data: text(),
    save_data_game_version: integer(),
    save_data_binary_version: integer(),

    // stats
});