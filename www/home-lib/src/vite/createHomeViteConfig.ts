import path from "node:path"
import { defineConfig, type Alias, type UserConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export type ThemeAlias = {
    /** Package name, e.g. `@undermuz/react-json-form-theme-chakra` */
    name: string
    /** Absolute path to theme entry (usually `.../src/index.tsx`) */
    entry: string
    /** Optional styles.css package subpath → absolute file */
    styles?: { name: string; file: string }
}

export type CreateHomeViteConfigOptions = {
    /** Absolute path to the app root (directory with vite.config.ts) */
    root: string
    /** Extra theme package aliases */
    themes?: ThemeAlias[]
    /** Merge/override Vite config */
    extend?: UserConfig
}

const repoRootFromApp = (appRoot: string) => path.resolve(appRoot, "../..")

export function createHomeViteConfig({
    root,
    themes = [],
    extend = {},
}: CreateHomeViteConfigOptions) {
    const repoRoot = repoRootFromApp(root)

    // Longer / more specific finds first so `/styles.css` is not resolved via the package entry.
    const alias: Alias[] = [
        {
            find: "@undermuz/react-json-form-home-lib/styles.css",
            replacement: path.resolve(
                repoRoot,
                "www/home-lib/src/styles.css"
            ),
        },
        {
            find: "@undermuz/react-json-form-home-lib/shell.css",
            replacement: path.resolve(repoRoot, "www/home-lib/src/shell.css"),
        },
        {
            find: "@undermuz/react-json-form-home-lib",
            replacement: path.resolve(repoRoot, "www/home-lib/src/index.ts"),
        },
        {
            find: "@undermuz/react-json-form",
            replacement: path.resolve(
                repoRoot,
                "packages/react-json-form/src/index.tsx"
            ),
        },
    ]

    for (const theme of themes) {
        if (theme.styles) {
            alias.push({
                find: theme.styles.name,
                replacement: theme.styles.file,
            })
        }
        alias.push({
            find: theme.name,
            replacement: theme.entry,
        })
    }

    const extendAlias = extend.resolve?.alias
    if (Array.isArray(extendAlias)) {
        alias.push(...extendAlias)
    } else if (extendAlias && typeof extendAlias === "object") {
        for (const [find, replacement] of Object.entries(extendAlias)) {
            if (typeof replacement === "string") {
                alias.push({ find, replacement })
            }
        }
    }

    return defineConfig({
        base: process.env.BASE_PATH || "/",
        plugins: [react(), tailwindcss(), ...(extend.plugins ?? [])],
        resolve: {
            alias,
        },
        server: {
            host: true,
            ...extend.server,
        },
        preview: {
            host: true,
            ...extend.preview,
        },
        ...Object.fromEntries(
            Object.entries(extend).filter(
                ([key]) =>
                    ![
                        "plugins",
                        "resolve",
                        "server",
                        "preview",
                        "base",
                    ].includes(key)
            )
        ),
    })
}
