import { Elysia, t } from "elysia";

import { auth } from "../../utils/macros";

function encodeXor(data: string, key: string) {
    let out = "";

    for (let i = 0; i < data.length; i++) {
        out += String.fromCharCode(
            data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }

    return out;
}

function randomString() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let string = "";

    for (let i = 0; i < 5; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }

    return string;
}

export const getGJRewards = new Elysia()
    .use(auth)
    .post("/getGJRewards.php", ({ body }) => {
        const data = randomString() + ;






        const xor = encodeXor(data, "59182");

        return randomString() + Buffer.from(xor, "binary").toString("base64url");
    }, {
        commonSecret: true,
        accountId: true,
        gjp2: true,
        body: t.Object({
            chk: t.String()
        })
    });