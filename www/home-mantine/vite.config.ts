import path from "node:path"
import { fileURLToPath } from "node:url"
import { createHomeViteConfig } from "../home-lib/src/vite/createHomeViteConfig.ts"

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, "../..")

/**
 * Mantine v9 peers React 19.2+. Pin resolve to this app's React so the
 * monorepo-wide React 18 hoist does not leak into the demo bundle.
 */
const reactRoot = path.resolve(root, "node_modules/react")
const reactDomRoot = path.resolve(root, "node_modules/react-dom")

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
        resolve: {
            alias: [
                { find: "react", replacement: reactRoot },
                { find: "react-dom", replacement: reactDomRoot },
                {
                    find: "react/jsx-runtime",
                    replacement: path.resolve(reactRoot, "jsx-runtime.js"),
                },
                {
                    find: "react/jsx-dev-runtime",
                    replacement: path.resolve(reactRoot, "jsx-dev-runtime.js"),
                },
            ],
        },
    },
})
