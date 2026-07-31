import argon2 from "argon2";
import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@/server/db/client";
import { panelUser } from "@/server/db/schema";

const body = t.Object({
    username: t.String(),
    password: t.String({
        minLength: 8,
        maxLength: 256,
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_-]).+$"
    })
});

export const auth = new Elysia({ prefix: "/auth" })
    .post("/doesAdminExist", async ({ status }) => {
        try {
            const query = await db
                .select()
                .from(panelUser)
                .where(eq(panelUser.username, "admin"));

            const admin = query[0];

            return Boolean(admin);
        } catch(error) {
            console.error("Failed to check for admin account:", error);
            return status(500);
        }
    })

    .post("/register", async ({ body, status }) => {
        try {
            const password = await argon2.hash(body.password);

            await db.insert(panelUser).values({ username: body.username, password });

            return status(201);
        } catch(error) {
            console.error("Failed to register:", error);
            return status(500);
        }
    }, { body })
    
    .post("/login", async ({ body, status }) => {
        try {
            const query = await db
                .select()
                .from(panelUser)
                .where(eq(panelUser.username, body.username));

            const user = query[0]; if (!user) return status(404);

            const correctPassword = await argon2.verify(user.password, body.password);

            if (correctPassword) {
                return status(200);
            }

            return status(401);
        } catch(error) {
            console.log("Failed to log in:", error);
            return status(500);
        }
    }, { body });