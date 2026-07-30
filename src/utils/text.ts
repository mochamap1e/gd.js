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

export function randomString(chars: number) {
    const alphabet = "1234567890qwertyuiopaqsdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let string = "";

    for (let i = 0; i < chars; i++) {
        string += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return string;
}

export function colonSeparated(...args: any) {
    return args.join(":");
}

export function charSeparated(char: string, ...args: any) {
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