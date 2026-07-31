import argon2 from "argon2";
import { Elysia, t } from "elysia";

import { db } from "@/server/db/client";
import { panelUser } from "@/server/db/schema";
import { TypeError } from "@/server/utils/errors";

const passwordType = t.String({
    minLength: 8,
    maxLength: 256,
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_-]).+$"
});

async function register(username: string, password: string) {
    password = await argon2.hash(password);
    await db.insert(panelUser).values({ username, password });
}

export const auth = new Elysia({ prefix: "/auth" })
    .post("/registerAdmin", async ({ body, status }) => {
        try {
            await register("admin", body.password);
            return status(201);
        } catch(error) {
            console.error("Failed to create admin account:", error);
            return status(500);
        }
    }, {
        body: t.Object({
            password: passwordType
        })
    })

    .post("/register", async ({ body }) => {

    }, {
        body: t.Object({
            username: t.String(),
            password: passwordType
        })
    });