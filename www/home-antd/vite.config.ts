import path from "node:path"
import { fileURLToPath } from "node:url"
import { createHomeViteConfig } from "../home-lib/src/vite/createHomeViteConfig.ts"

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, "../..")

export default createHomeViteConfig({
    root,
    themes: [
        {
            name: "@undermuz/react-json-form-theme-antd",
            entry: path.resolve(repoRoot, "packages/themes/antd/src/index.tsx"),
        },
    ],
    extend: {
        server: { port: 5182 },
    },
})
