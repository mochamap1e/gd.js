import { Elysia, t } from "elysia";

import { auth } from "@/utils/macros";

export const getAccountURL = new Elysia()
    .use(auth)
    .post("/getAccountURL.php", () => {
        return "https://localhost:4500";
    }, {
        commonSecret: true
    });