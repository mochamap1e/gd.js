import { pgTable, serial, integer, bigint, varchar, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    // ids
    account_id: serial().notNull().primaryKey(),
    user_id: serial().notNull(),

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
});

export const level = pgTable("level", {
    level_id: integer().notNull().primaryKey(),
    level_name: varchar({ length: 20 }).notNull(),
    description: varchar().notNull().default(""),
    level_string: varchar().notNull(),
    version: integer().notNull(),
    player_id: integer().notNull(),
    difficulty_denominator: integer().notNull().default(0),
    difficulty_numerator: integer().notNull().default(0),
    downloads: integer().notNull().default(0),
    official_song: integer(),
    game_version: integer().notNull(),
    likes: integer().notNull().default(0),
    length: integer().notNull(),
    dislikes: integer().notNull().default(0),
    demon: boolean().notNull().default(false),
    stars: integer().notNull().default(0),
    feature_score: integer().notNull().default(0),
    auto: boolean().notNull(),
    password: varchar().notNull(),
    upload_date: varchar().notNull().default("upload_date"),
    update_date: varchar().notNull().default("update_date"),
    copied_id: integer().notNull().default(0),
    two_player: boolean().notNull(),
    custom_song_id: integer().notNull().default(0),
    coins: integer().notNull(),
    verified_coins: boolean().notNull().default(false),
    stars_requested: integer().notNull(),
    unlisted: integer().notNull(),
    low_detail_mode: boolean().notNull(),
    daily_number: integer(),
    epic: integer().notNull().default(0),
    demon_difficulty: integer(),
    is_gauntlet: boolean().notNull().default(false),
    objects: integer().notNull(),
    editor_time: integer().notNull().default(0),
    editor_time_copies: integer().notNull().default(0),
    song_ids: integer().array().default([0]),
    sfx_ids: integer().array().default([0]),
    song_size: integer().notNull().default(0),
    verification_time: integer().notNull(),
    exact_upload_time: bigint({ mode: "number" }).notNull(),
    exact_update_time: bigint({ mode: "number" }).notNull().default(0)
});

export const list = pgTable("list", {
    list_id: integer().notNull().primaryKey(),
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
    level_ids: integer().notNull().references(() => level.level_id).array(),
    list_reward: integer().notNull(),
    list_reward_requirement: integer().notNull()
});

export const daily = pgTable("daily", {
    index: integer().notNull().generatedAlwaysAsIdentity(),
    level_id: integer().references(() => level.level_id),
    next_level_id: integer().references(() => level.level_id)
});

export const dailyHistory = pgTable("daily_history", {
    index: integer().notNull(),
    level_id: integer().notNull().references(() => level.level_id)
});