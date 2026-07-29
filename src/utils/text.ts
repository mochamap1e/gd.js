import crypto from "crypto";

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

export function randomString() {
    const chars = "1234567890qwertyuiopaqsdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let string = "";

    for (let i = 0; i < 5; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }

    return string;
}

export function colonSeparated(...args: any) {
    return args.join(":");
}

export function commaSeparated(...args: any) {
    const dictionary = args[0];
    if ((dictionary !== null) && (typeof dictionary === "object")) {
        return Object.values(dictionary).join(",");
    } else {
        return args.join(",");
    }
}

export function decodeChk(chk: string, xorKey: string) {
    return xor(atob(chk.slice(5)), xorKey); // remove random 5 chars, decode base64, decode xor
}

export function encodeRewardsData(data: string, key: string, salt: string) {
    data = `${randomString()}:${data}`;
    const xored = xor(data, key); // xor
    const base64 = Buffer.from(xored, "latin1").toString("base64url"); // base64
    const hash = createHash(base64, salt); // hash

    return `${randomString()}${base64}|${hash}`;
}