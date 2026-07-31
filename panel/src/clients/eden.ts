import { treaty } from "@elysia/eden";
import type { Panel } from "@/server/index";

export const client = treaty<Panel>("localhost:4501", {
    fetch: {
        credentials: "include"
    }
});