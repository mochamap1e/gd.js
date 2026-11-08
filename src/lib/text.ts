import crypto from "node:crypto";

import { Salts } from "@server/constants";

// hashing

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

// dates

export function unixSeconds(date: Date) {
    return Math.floor(date.getTime() / 1000);
}

export function timestampString(date: Date) {
    function format(number: number, unit: string) {
        return `${number} ${unit}${number === 1 ? "" : "s"}`;
    }

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return format(seconds, "second");

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return format(minutes, "minute");

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return format(hours, "hour");

    const days = Math.floor(hours / 24);
    if (days < 7) return format(days, "day");

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return format(weeks, "week");

    const months = Math.floor(days / 30);
    if (months < 12) return format(months, "month");

    const years = Math.floor(days / 365);
    return format(years, "year");
}