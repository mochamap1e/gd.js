import { pgTable, customType, integer, text, boolean, timestamp, foreignKey } from "drizzle-orm/pg-core";

const citext = customType<{ data: string }>({
    dataType() {
        return "citext";
    }
});

export const accounts = pgTable("accounts", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    username: citext().notNull().unique(),
    password: text().notNull(),
    email: citext().notNull().unique(),
    activated: boolean().notNull(),
    activation_token: text().notNull().unique(),
    mod: integer().notNull().default(0),
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

    // metadata
    created_at: timestamp().notNull().defaultNow()
});

export const levels = pgTable("levels", { // INCOMPLETE
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    author: integer().references(() => accounts.id).notNull(),

    // info
    name: text().notNull(),
    description: text(),
    version: integer().notNull().default(1),
    length: integer().notNull(),
    original: integer().notNull(),
    coins: integer().notNull(),
    requested_stars: integer().notNull(),
    
    // editor info
    level_string: text().notNull(),
    objects: integer().notNull(),
    steps: integer(),
    editor_time: integer(),
    editor_time_prev: integer(),
    replay_string: text(),
    build_stats: text(),
    capacity_string: text(),
    
    // sound data
    audio_track: integer().notNull(),
    song_id: integer().notNull(),
    song_ids: integer().array(),
    sfx_ids: integer().array(),

    // gameplay / config
    auto: boolean().notNull(),
    two_player: boolean().notNull(),
    ldm: boolean().notNull(),
    unlisted: integer().notNull(),
    
    // metadata
    timestamp: integer(),
    created_at: timestamp().notNull().defaultNow()
}, (table) => [
    foreignKey({
        columns: [table.original],
        foreignColumns: [table.id]
    })
]);