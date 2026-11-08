// global

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 70;
export const DESCRIPTION_MAX_LENGTH = 240; // 180 chars = 240 base64 chars
export const COMMENT_MAX_LENGTH = 188; // 140 chars = 188 base64 chars
export const REGISTER_SESSION_CHARS = 32;
export const REGISTER_SESSION_LENGTH = 12 * 60 * 60 * 1000; // 12 hours
export const ACTIVATION_TOKEN_CHARS = 32;

// gd

export const Secrets = {
    Common: "Wmfd2893gb7",
    Account: "Wmfv3899gc9",
    Level: "Wmfv2898gc9"
} as const;

export const Salts = {
    GJP2: "mI29fmAnxgTs"
}