import { defineConfig } from "drizzle-kit";

import { config } from "@server/config";

export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: config.get("db_name")
    }
});