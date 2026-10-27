import { pgTable, customType, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

const citext = customType<{ data: string }>({
    dataType() {
        return "citext";
    }
});

export const accounts = pgTable("accounts", {
    // main stuff
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    activated: boolean().notNull(),
    activation_token: text().notNull().unique(),
    username: citext().notNull().unique(),
    password: text().notNull(),
    email: citext().notNull().unique(),
    custom: text(),

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
    glow: boolean().notNull().default(false),

    // social
    message_state: integer().notNull().default(1),
    friends_state: integer().notNull().default(0),
    comment_history_state: integer().notNull().default(0),
    group_state: integer().notNull().default(1),

    // social media
    youtube: text(),
    twitter: text(),
    twitch: text(),
    discord: text(),
    instagram: text(),
    tiktok: text(),

    // misc
    mod: integer().notNull().default(0),
    created_at: timestamp().notNull().defaultNow()
});

export const levels = pgTable("levels", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    author: integer().notNull().references(() => accounts.id),
    version: integer().notNull().default(1),

    name: text().notNull(),
    description: text(),
    levelString: text().notNull(),

    difficulty_denominator: integer().notNull().default(0),
    difficulty_numerator: integer().notNull().default(0),
    demon: boolean().notNull().default(false),
    length: integer().notNull(),

    downloads: integer().notNull().default(0),
    likes: integer().notNull().default(0),
    dislikes: integer().notNull().default(0),
    stars: integer().notNull().default(0),

    // finish later
});