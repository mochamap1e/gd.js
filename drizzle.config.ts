import { defineConfig } from "drizzle-kit";

import { config } from "@server/lib/config";

export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: config.get("db_url")
    }
});