import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    // GitHub Pages project site: https://undermuz.github.io/react-json-form/
    base: process.env.BASE_PATH || "/",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@undermuz/react-json-form": path.resolve(
                root,
                "../../packages/react-json-form/src/index.tsx"
            ),
            "@undermuz/react-json-form-theme-base/styles.css": path.resolve(
                root,
                "../../packages/themes/base/src/styles.css"
            ),
            "@undermuz/react-json-form-theme-base": path.resolve(
                root,
                "../../packages/themes/base/src/index.tsx"
            ),
        },
    },
    server: {
        host: true,
    },
    preview: {
        host: true,
    },
})
