import crypto from "crypto";
import { deflateSync } from "zlib";

export function createHash(data: string, salt: string) {
    return crypto
        .createHash("sha1")
        .update(data + salt)
        .digest("hex");
}

export function xor(data: string, key: string) {
    let out = "";

    for (let i = 0; i < data.length; i++) {
        out += String.fromCharCode(
            data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }

    return out;
}

export function randomString(chars: number) {
    const alphabet = "1234567890qwertyuiopaqsdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let string = "";

    for (let i = 0; i < chars; i++) {
        string += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return string;
}

export function join(char: string, ...args: any) {
    const dictionary = args[0];
    if ((dictionary !== null) && (typeof dictionary === "object")) {
        return Object.values(dictionary).join(char);
    } else {
        return args.join(char);
    }
}

export function decodeChk(chk: string, xorKey: string) {
    return xor(atob(chk.slice(5)), xorKey); // remove random 5 chars, decode base64, decode xor
}

export function encodeRewardsData(data: string, key: string, salt: string) {
    data = `${randomString(5)}:${data}`;
    const xored = xor(data, key); // xor
    const base64 = Buffer.from(xored, "latin1").toString("base64url"); // base64
    const hash = createHash(base64, salt); // hash

    return `${randomString(5)}${base64}|${hash}`;
}

export function encodeAccountLevelsData(data: string) {
    const chars = 20;
    return randomString(chars) +
        Buffer.from(deflateSync(data)).toString("base64url") +
        randomString(chars);
}

// not proud of this one but whatever, lowkey copied the numbers from cvolton's gdps
export function relativeTimestamp(date: Date) {
    function plural(number: number, unit: string) {
        return `${number} ${unit}${number === 1 ? "" : "s"}`;
    }

    const delta = Math.floor((Date.now() - date.getTime()) / 1000);

    if (delta < 60) {
        return plural(delta, "second");
    }

    if (delta < 3600) {
        return plural(Math.floor(delta / 60), "minute");
    }

    if (delta < 86400) {
        return plural(Math.floor(delta / 3600), "hour");
    }

    if (delta < 604800) {
        return plural(Math.floor(delta / 86400), "day");
    }

    if (delta < 2628000) {
        return plural(Math.floor(delta / 604800), "week");
    }

    if (delta < 31536000) {
        return plural(Math.floor(delta / 2628000), "month");
    }

    return plural(Math.floor(delta / 31536000), "year");
}
