import path from "node:path"
import { fileURLToPath } from "node:url"
import { createHomeViteConfig } from "../home-lib/src/vite/createHomeViteConfig.ts"

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, "../..")

export default createHomeViteConfig({
    root,
    themes: [
        {
            name: "@undermuz/react-json-form-theme-chakra-v3",
            entry: path.resolve(
                repoRoot,
                "packages/themes/chakra3/src/index.tsx"
            ),
        },
    ],
    extend: {
        server: { port: 5176 },
        resolve: {
            alias: {
                // Prefer Chakra v3 nested under the theme package (root hoists v2).
                "@chakra-ui/react": path.resolve(
                    repoRoot,
                    "packages/themes/chakra3/node_modules/@chakra-ui/react"
                ),
            },
        },
    },
})
