import fs from "node:fs"
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

/** Prefer the app's install, then the monorepo root hoist. */
function resolveInstalledPkg(appRoot: string, repoRoot: string, name: string) {
    const candidates = [
        path.resolve(appRoot, "node_modules", name),
        path.resolve(repoRoot, "node_modules", name),
    ]
    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) return candidate
    }
    return candidates[1]
}

// Pin every react / react-dom import to one copy for this app.
// A nested React under a package node_modules (e.g. React 19 next to
// source-aliased @undermuz/react-json-form) can ship beside the app React 18
// and break Context.Consumer at runtime (x is not a function).
function reactAliases(appRoot: string, repoRoot: string): Alias[] {
    const reactRoot = resolveInstalledPkg(appRoot, repoRoot, "react")
    const reactDomRoot = resolveInstalledPkg(appRoot, repoRoot, "react-dom")
    return [
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
    ]
}

export function createHomeViteConfig({
    root,
    themes = [],
    extend = {},
}: CreateHomeViteConfigOptions) {
    const repoRoot = repoRootFromApp(root)

    // React aliases first — Vite uses first-match-wins for alias arrays.
    const alias: Alias[] = [
        ...reactAliases(root, repoRoot),
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
            dedupe: ["react", "react-dom"],
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
