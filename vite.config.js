import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js/admin/src"),
            "@portfolio": path.resolve(__dirname, "resources/js/portfolio/src"),
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/js/admin/src/main.jsx",
                "resources/js/portfolio/src/main.tsx",
            ],
            refresh: true,
        }),
        react(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ["node_modules"],
            },
        },
    },
    server: {
        host: "127.0.0.1",
        port: 5173,
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
});
