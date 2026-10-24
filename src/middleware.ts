import { Elysia, t } from "elysia";

import { Secrets } from "@server/constants";

export const gd = new Elysia()
    .macro({
        secret: (expected: (typeof Secrets)[keyof typeof Secrets]) => ({
            body: t.Object({
                secret: t.Literal(expected)
            })
        })
    });