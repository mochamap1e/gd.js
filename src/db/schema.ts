import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

const created_at = () => integer({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`);

export const accounts = sqliteTable("accounts", {
    // main stuff
    account_id: integer().primaryKey({ autoIncrement: true }),
    activated: integer({ mode: "boolean" }).notNull(),
    activation_token: text().notNull().unique(),
    username: text().notNull().unique(),
    password: text().notNull(),
    email: text().notNull().unique(),
    mod: integer().notNull().default(0),

    // save data
    save_data: text(),
    save_data_game_version: integer(),
    save_data_binary_version: integer(),

    // stats
    stars: integer().notNull().default(0),
    diamonds: integer().notNull().default(0),
    moons: integer().notNull().default(0),
    secret_coins: integer().notNull().default(0),
    user_coins: integer().notNull().default(0),
    creator_points: integer().notNull().default(0),
    
    // icons
    color: integer().notNull().default(0),
    color2: integer().notNull().default(3),
    color3: integer().notNull().default(0),
    icon_id: integer().notNull().default(1),
    icon_type: integer().notNull().default(0),
    icon: integer().notNull().default(1),
    ship: integer().notNull().default(1),
    ball: integer().notNull().default(1),
    bird: integer().notNull().default(1),
    dart: integer().notNull().default(1),
    robot: integer().notNull().default(1),
    spider: integer().notNull().default(1),
    explosion: integer().notNull().default(1),
    swing: integer().notNull().default(1),
    jetpack: integer().notNull().default(1),
    glow: integer({ mode: "boolean" }).notNull().default(false),

    // social
    message_state: integer().notNull().default(0),
    friends_state: integer().notNull().default(0),
    comment_history_state: integer().notNull().default(0),
    group_state: integer().notNull().default(0),
    
    // social media
    youtube: text(),
    twitter: text(),
    twitch: text(),
    discord: text(),
    instagram: text(),
    tiktok: text(),

    // misc
    created_at: created_at()
});