import { Elysia, t } from "elysia";

export const getGJDailyLevel = new Elysia()
    .post("/getGJDailyLevel.php", ({ body }) => {
        // todo - add the chk shit
        
        let { type, chk } = body;

        switch(type) {
            case 0:
                return "0|0";
            case 1:
                return "0|0";
            case 2:
                return "0|0";
            default:
                return "-1";
        }
    }, {
        body: t.Object({
            type: t.Optional(t.Literal(0 | 1 | 2, { default: 0 })), // 0: daily, 1: weekly, 2: event
            chk: t.Optional(t.String())
        })
    });