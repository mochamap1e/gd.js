import crypto from "crypto";

export function createHash(data: string, salt: string) {
    return crypto
        .createHash("sha1")
        .update(data + salt)
        .digest("hex");
}