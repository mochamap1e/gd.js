import { pgTable, serial, integer, varchar, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    // ids
    account_id: serial().notNull().primaryKey(),
    user_id: serial().notNull().unique(),

    // creds
    username: varchar({ length: 15 }).unique().notNull(),
    email: varchar().unique().notNull(),
    password: varchar().notNull(),
    custom: varchar(),
    is_registered: boolean().notNull().default(true),

    // stats
    stars: integer().notNull().default(0),
    moons: integer().notNull().default(0),
    diamonds: integer().notNull().default(0),
    demon_count: integer().notNull().default(0),
    creator_points: integer().notNull().default(0),
    secret_coins: integer().notNull().default(0),
    user_coins: integer().notNull().default(0),
    ranking: integer().notNull().default(999999),
    global_rank: integer().notNull().default(999999),

    // levels
    demons: varchar().notNull().default("0,0,0,0,0,0,0,0,0,0,0,0"),
    classic_levels: varchar().notNull().default("0,0,0,0,0,0,0,0"),
    platformer_levels: varchar().notNull().default("0,0,0,0,0,0"),

    // icons
    icon_id: integer().notNull().default(1),
    icon_type: integer().notNull().default(0),
    color: integer().notNull().default(0),
    color2: integer().notNull().default(3),
    color3: integer().notNull().default(0),
    acc_icon: integer().notNull().default(1),
    acc_ship: integer().notNull().default(1),
    acc_ball: integer().notNull().default(1),
    acc_bird: integer().notNull().default(1),
    acc_dart: integer().notNull().default(1),
    acc_robot: integer().notNull().default(1),
    acc_spider: integer().notNull().default(1),
    acc_swing: integer().notNull().default(1),
    acc_jetpack: integer().notNull().default(1),
    acc_streak: integer().notNull().default(1),
    acc_glow: boolean().notNull().default(false),
    acc_explosion: integer().notNull().default(1),
    special: integer().notNull().default(0),

    // social
    message_state: integer().notNull().default(0),
    friends_state: integer().notNull().default(0),
    comment_history_state: integer().notNull().default(0),
    youtube: varchar().notNull().default(""),
    twitter: varchar().notNull().default(""),
    twitch: varchar().notNull().default(""),
    discord: varchar().notNull().default(""),
    instagram: varchar().notNull().default(""),
    tiktok: varchar().notNull().default(""),

    // other
    mod: integer().notNull().default(0),
    account_highlight: varchar().notNull().default(""),

    // save file
    save_data: varchar().notNull().default(""),
    save_data_game_version: integer(),
    save_data_binary_version: integer()
});