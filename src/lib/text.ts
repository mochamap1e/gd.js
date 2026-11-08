import crypto from "node:crypto";

import { Salts } from "@server/constants";

export function sha1(string: string) {
    return crypto
        .createHash("sha1")
        .update(string)
        .digest("hex");
}

export function generateHex(length: number) {
    return crypto.randomBytes(Math.round(length / 2)).toString("hex");
}

export function generateGJP2(password: string) {
    password += Salts.GJP2;
    return sha1(password);
}