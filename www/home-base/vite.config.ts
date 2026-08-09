import path from "node:path"
import { fileURLToPath } from "node:url"
import { createHomeViteConfig } from "../home-lib/src/vite/createHomeViteConfig.ts"

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, "../..")

export default createHomeViteConfig({
    root,
    themes: [
        {
            name: "@undermuz/react-json-form-theme-base",
            entry: path.resolve(repoRoot, "packages/themes/base/src/index.tsx"),
            styles: {
                name: "@undermuz/react-json-form-theme-base/styles.css",
                file: path.resolve(repoRoot, "packages/themes/base/src/styles.css"),
            },
        },
    ],
    extend: {
        server: { port: 5174 },
    },
})
