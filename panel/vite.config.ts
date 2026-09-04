import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@panel": path.resolve(import.meta.dirname, "./src"),
            "@server": path.resolve(import.meta.dirname, "../server/src")
        }
    }
});