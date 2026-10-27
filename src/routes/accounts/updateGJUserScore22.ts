import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { gd } from "@server/lib/middleware";

import { db } from "@server/db/client";
import { accounts } from "@server/db/schema";

export const updateGJUserScore22 = new Elysia()
    .use(gd)
    .post("/updateGJUserScore22.php", async ({ body, account }) => {
        try {
            await db
                .update(accounts)
                .set({
                    stars: body.stars,
                    moons: body.moons,
                    // on hold until i add level schema
                })
                .where(eq(accounts.id, account.id));
            
            return account.id;
        } catch(error) {
            return -1;
        }
    }, {
        secret: "Common",
        requiresAccount: true,
        body: t.Object({
            stars: t.Numeric(),
            moons: t.Numeric(),
            demons: t.Numeric(),
            diamonds: t.Numeric(),
            icon: t.Numeric(),
            iconType: t.Numeric(),
            coins: t.Numeric(),
            userCoins: t.Numeric(),
            accIcon: t.Numeric(),
            accShip: t.Numeric(),
            accBall: t.Numeric(),
            accBird: t.Numeric(),
            accDart: t.Numeric(),
            accRobot: t.Numeric(),
            accGlow: t.Numeric(),
            accSpider: t.Numeric(),
            accExplosion: t.Numeric(),
            accSwing: t.Numeric(),
            accJetpack: t.Numeric(),
            seed2: t.String(),
            sinfo: t.String(),
            sinfod: t.String(),
            sinfog: t.String(),
            sinfoe: t.String(),
            color1: t.Optional(t.Numeric()),
            color2: t.Optional(t.Numeric()),
            color3: t.Optional(t.Numeric()),
            special: t.Optional(t.Numeric()),
            dinfo: t.Optional(t.String()),
            dinfow: t.Optional(t.String()),
            dinfog: t.Optional(t.String()),
            dinfoe: t.Optional(t.String())
        })
    });