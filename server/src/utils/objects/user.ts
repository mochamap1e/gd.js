import { user } from "@server/db/schema/user";

export function createUserObject(userData: typeof user.$inferInsert) {
    const map: ObjectMap[]  = [
        { key: 1, value: userData.username },
        { key: 2, value: userData.user_id },
        { key: 3, value: userData.stars },
        { key: 4, value: userData.demon_count },
        { key: 6, value: 999999 },
        { key: 8, value: userData.creator_points },
        { key: 9, value: userData.icon_id },
        { key: 10, value: userData.color },
        { key: 11, value: userData.color2 },
        { key: 13, value: userData.secret_coins },
        { key: 14, value: userData.icon_type },
        { key: 16, value: userData.account_id },
        { key: 17, value: userData.user_coins },
        { key: 18, value: userData.message_state },
        { key: 19, value: userData.friends_state },
        { key: 20, value: userData.youtube },
        { key: 21, value: userData.acc_icon },
        { key: 22, value: userData.acc_ship },
        { key: 23, value: userData.acc_ball },
        { key: 24, value: userData.acc_bird },
        { key: 25, value: userData.acc_dart },
        { key: 26, value: userData.acc_robot },
        { key: 28, value: userData.acc_glow },
        { key: 29, value: userData.is_registered },
        { key: 30, value: 999999 },
        /*
        { key: 31, value: 0 },
        { key: 38, value: 0 },
        { key: 39, value: 0 },
        */
       { key: 43, value: userData.acc_spider },
       { key: 44, value: userData.twitter },
       { key: 45, value: userData.twitch },
       { key: 46, value: userData.diamonds },
       { key: 48, value: userData.acc_explosion },
       { key: 49, value: userData.mod },
       { key: 50, value: userData.comment_history_state },
       { key: 51, value: userData.color3 },
       { key: 52, value: userData.moons },
       { key: 53, value: userData.acc_swing },
       { key: 54, value: userData.acc_jetpack },
       { key: 55, value: userData.demons },
       { key: 56, value: userData.classic_levels },
       { key: 57, value: userData.platformer_levels },
       { key: 58, value: userData.discord },
       { key: 59, value: userData.instagram },
       { key: 60, value: userData.tiktok },
    ];

    let response = "";

    map.forEach(data => response += `${data.key}:${data.value}:`);

    return response;
}