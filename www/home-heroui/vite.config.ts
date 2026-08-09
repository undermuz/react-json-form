import path from "node:path"
import { fileURLToPath } from "node:url"
import { createHomeViteConfig } from "../home-lib/src/vite/createHomeViteConfig.ts"

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, "../..")

export default createHomeViteConfig({
    root,
    themes: [
        {
            name: "@undermuz/react-json-form-theme-heroui",
            entry: path.resolve(
                repoRoot,
                "packages/themes/heroui/src/index.tsx"
            ),
        },
    ],
    extend: {
        server: { port: 5178 },
        resolve: {
            alias: {
                // Root hoists framer-motion@6 (chakra); HeroUI needs v12.
                "framer-motion": path.resolve(
                    root,
                    "node_modules/framer-motion"
                ),
            },
        },
    },
})
