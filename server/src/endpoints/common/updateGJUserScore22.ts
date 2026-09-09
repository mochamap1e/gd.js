import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { db } from "@server/db/client";
import { users } from "@server/db/schema";
import { auth } from "@server/utils/plugins";

// todo: make this actually do something

export const updateGJUserScore22 = new Elysia()
    .use(auth)
    .post("/updateGJUserScore22.php", async ({ body, account }) => {
        try {
            const query = await db
                .select()
                .from(users)
                .where(eq(users.account_id, account.account_id));

            const userData = query[0]; if (!userData) return -1;

            return userData.user_id;
        } catch(error) {
            console.error("Failed fetch user:", error);
            return -1;
        }
    }, {
        commonSecret: true,
        requiresAuthentication: true,
        body: t.Object({
            stars: t.Integer(),
            moons: t.Integer(),
            demons: t.Integer(),
            diamonds: t.Integer(),
            icon: t.Integer(),
            iconType: t.Integer(),
            coins: t.Integer(),
            userCoins: t.Integer(),
            accIcon: t.Integer(),
            accShip: t.Integer(),
            accBall: t.Integer(),
            accBird: t.Integer(),
            accDart: t.Integer(),
            accRobot: t.Integer(),
            accGlow: t.Integer(),
            accSpider: t.Integer(),
            accExplosion: t.Integer(),
            accSwing: t.Integer(),
            accJetpack: t.Integer(),
            seed2: t.String(), // i believe this is a form of a chk, read docs later
            sinfo: t.String(),
            sinfod: t.Integer(),
            sinfog: t.Integer(),
            sinfoe: t.Integer()
        })
    });