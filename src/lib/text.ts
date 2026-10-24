import crypto from "node:crypto";

import { Salts } from "@server/constants";

export function generateHex(length: number) {
    return crypto.randomBytes(Math.round(length / 2)).toString("hex");
}

export function generateGJP2(password: string) {
    password += Salts.GJP2;
    
    return crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");
}