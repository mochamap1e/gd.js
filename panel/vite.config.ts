import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@/panel": fileURLToPath(new URL("./src", import.meta.url)),
            "@/server": fileURLToPath(new URL("../server/src", import.meta.url))
        }
    }
});