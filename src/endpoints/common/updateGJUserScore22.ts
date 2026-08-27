import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@/server/db/client";
import { user } from "@/server/db/schema/user";
import { auth } from "@/server/utils/plugins";
import { GDError } from "@/server/utils/errors";

export const updateGJUserScore22 = new Elysia()
    .use(auth)
    .post("/updateGJUserScore22.php", async ({ body }) => {
        const { userName } = body;

        try {
            const query = await db
                .select()
                .from(user)
                .where(eq(user.username, userName));

            const userData = query[0]; if (!userData) return GDError.Generic;

            return userData.user_id;
        } catch(error) {
            console.error("Failed fetch user:", error);
            return GDError.Generic;
        }
    }, {
        commonSecret: true,
        body: t.Object({
            stars: t.String(),
            moons: t.String(),
            demons: t.String(),
            diamonds: t.String(),
            icon: t.String(),
            iconType: t.String(),
            coins: t.String(),
            userCoins: t.String(),
            accIcon: t.String(),
            accShip: t.String(),
            accBall: t.String(),
            accBird: t.String(),
            accDart: t.String(),
            accRobot: t.String(),
            accGlow: t.String(),
            accSpider: t.String(),
            accExplosion: t.String(),
            accSwing: t.String(),
            accJetpack: t.String(),
            seed2: t.String(),
            sinfo: t.String(),
            sinfod: t.String(),
            sinfog: t.String(),
            sinfoe: t.String(),
            userName: t.String()
        })
    });