import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// su - postgres -c "psql -d gd -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'"

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema",
    dialect: "postgresql",
    dbCredentials: { url: process.env.DATABASE_URL! }
});