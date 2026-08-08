import { defineConfig } from "vitest/config"

export default defineConfig({
    esbuild: {
        jsx: "automatic",
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/tests/setup.ts"],
        include: ["src/**/*.{spec,test}.{ts,tsx}"],
    },
})
