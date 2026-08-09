import path from "node:path"
import { fileURLToPath } from "node:url"
import { createHomeViteConfig } from "../home-lib/src/vite/createHomeViteConfig.ts"

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, "../..")

/**
 * Mantine v9 peers React 19.2+. `createHomeViteConfig` pins `react` /
 * `react-dom` to this app's `node_modules` (19) so the monorepo React 18
 * hoist does not leak into the demo bundle.
 */
export default createHomeViteConfig({
    root,
    themes: [
        {
            name: "@undermuz/react-json-form-theme-mantine",
            entry: path.resolve(
                repoRoot,
                "packages/themes/mantine/src/index.tsx"
            ),
        },
    ],
    extend: {
        server: { port: 5183 },
    },
})
