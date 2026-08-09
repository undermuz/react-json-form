import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const www = path.resolve(__dirname, "..")

const themes = [
    {
        id: "base",
        port: 5174,
        pkg: "@undermuz/react-json-form-theme-base",
        importName: "BaseTheme",
        folder: "base",
        title: "base",
        deps: {},
        stylesImport: "@undermuz/react-json-form-theme-base/styles.css",
    },
    {
        id: "chakra",
        port: 5175,
        pkg: "@undermuz/react-json-form-theme-chakra",
        importName: "ChakraUi",
        folder: "chakra",
        title: "chakra",
        deps: {},
        stylesImport: undefined,
    },
    {
        id: "chakra3",
        port: 5176,
        pkg: "@undermuz/react-json-form-theme-chakra-v3",
        importName: "ChakraUi",
        folder: "chakra3",
        title: "chakra3",
        deps: {},
        stylesImport: undefined,
    },
    {
        id: "grommet",
        port: 5177,
        pkg: "@undermuz/react-json-form-theme-grommet",
        importName: "GrommetUi",
        folder: "grommet",
        title: "grommet",
        deps: { grommet: "^2.45.1", "styled-components": "^5.3.11" },
        stylesImport: undefined,
    },
    {
        id: "heroui",
        port: 5178,
        pkg: "@undermuz/react-json-form-theme-heroui",
        importName: "HeroUiTheme",
        folder: "heroui",
        title: "heroui",
        deps: {
            "@heroui/react": "^2.8.2",
            "framer-motion": "^12.23.12",
        },
        stylesImport: undefined,
    },
    {
        id: "rsuite",
        port: 5179,
        pkg: "@undermuz/react-json-form-theme-rsuite",
        importName: "RsuiteUi",
        folder: "rsuite",
        title: "rsuite",
        deps: {},
        stylesImport: undefined,
    },
    {
        id: "antd",
        port: 5182,
        pkg: "@undermuz/react-json-form-theme-antd",
        importName: "AntdUi",
        folder: "antd",
        title: "antd",
        deps: {},
        stylesImport: undefined,
    },
    {
        id: "mantine",
        port: 5183,
        pkg: "@undermuz/react-json-form-theme-mantine",
        importName: "MantineUi",
        folder: "mantine",
        title: "mantine",
        deps: {},
        stylesImport: undefined,
    },
    {
        id: "mui",
        port: 5184,
        pkg: "@undermuz/react-json-form-theme-mui",
        importName: "MuiTheme",
        folder: "mui",
        title: "mui",
        deps: {},
        stylesImport: undefined,
    },
]

const eslint = `import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
`

function viteThemesBlock(t) {
    const lines = [
        `        {`,
        `            name: "${t.pkg}",`,
        `            entry: path.resolve(repoRoot, "packages/themes/${t.folder}/src/index.tsx"),`,
    ]
    if (t.id === "base") {
        lines.push(
            `            styles: {`,
            `                name: "@undermuz/react-json-form-theme-base/styles.css",`,
            `                file: path.resolve(repoRoot, "packages/themes/base/src/styles.css"),`,
            `            },`
        )
    }
    lines.push(`        },`)
    if (t.id === "chakra3") {
        lines.push(
            `        {`,
            `            name: "@undermuz/react-json-form-theme-chakra-v3/provider",`,
            `            entry: path.resolve(`,
            `                repoRoot,`,
            `                "packages/themes/chakra3/src/components/ui/provider.tsx"`,
            `            ),`,
            `        },`
        )
    }
    return lines.join("\n")
}

for (const t of themes) {
    const dir = path.join(www, `home-${t.id}`)
    fs.mkdirSync(path.join(dir, "src"), { recursive: true })
    fs.mkdirSync(path.join(dir, "public"), { recursive: true })

    const packageJson = {
        name: `@undermuz/react-json-form-home-${t.id}`,
        private: true,
        version: "0.0.0",
        type: "module",
        scripts: {
            dev: "vite",
            build: "tsc -b && vite build",
            "build:pages": `tsc -b && vite build --base=/react-json-form/${t.id}/`,
            lint: "eslint .",
            preview: "vite preview",
        },
        dependencies: {
            "@undermuz/react-json-form": "*",
            "@undermuz/react-json-form-home-lib": "*",
            [t.pkg]: "*",
            react: "^18.3.1",
            "react-dom": "^18.3.1",
            "react-router-dom": "^7.18.2",
            "sugar-high": "^1.3.0",
            ...t.deps,
        },
        devDependencies: {
            "@eslint/js": "^10.0.1",
            "@tailwindcss/vite": "^4.3.3",
            "@types/node": "^24.13.3",
            "@types/react": "^18.3.31",
            "@types/react-dom": "^18.3.7",
            "@vitejs/plugin-react": "^6.0.4",
            eslint: "^10.8.0",
            "eslint-plugin-react-hooks": "^7.1.1",
            "eslint-plugin-react-refresh": "^0.5.3",
            globals: "^17.7.0",
            tailwindcss: "^4.3.3",
            typescript: "~5.8.3",
            "typescript-eslint": "^8.66.0",
            vite: "^8.2.1",
        },
    }

    fs.writeFileSync(
        path.join(dir, "package.json"),
        JSON.stringify(packageJson, null, 2) + "\n"
    )

    const themeEntry = path
        .join("../../packages/themes", t.folder, "src/index.tsx")
        .replace(/\\/g, "/")

    fs.writeFileSync(
        path.join(dir, "vite.config.ts"),
        `import path from "node:path"
import { fileURLToPath } from "node:url"
import { createHomeViteConfig } from "../home-lib/src/vite/createHomeViteConfig"

const root = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(root, "../..")

export default createHomeViteConfig({
    root,
    themes: [
${viteThemesBlock(t)}
    ],
    extend: {
        server: { port: ${t.port} },
    },
})
`
    )

    fs.writeFileSync(
        path.join(dir, "tsconfig.json"),
        JSON.stringify(
            {
                files: [],
                references: [
                    { path: "./tsconfig.app.json" },
                    { path: "./tsconfig.node.json" },
                ],
            },
            null,
            2
        ) + "\n"
    )

    fs.writeFileSync(
        path.join(dir, "tsconfig.app.json"),
        JSON.stringify(
            {
                compilerOptions: {
                    tsBuildInfoFile:
                        "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
                    target: "es2023",
                    lib: ["ES2023", "DOM"],
                    module: "esnext",
                    types: ["vite/client"],
                    allowArbitraryExtensions: true,
                    skipLibCheck: true,
                    moduleResolution: "bundler",
                    allowImportingTsExtensions: true,
                    verbatimModuleSyntax: true,
                    moduleDetection: "force",
                    noEmit: true,
                    jsx: "react-jsx",
                    paths: {
                        "@undermuz/react-json-form": [
                            "../../packages/react-json-form/src/index.tsx",
                        ],
                        "@undermuz/react-json-form-home-lib": [
                            "../home-lib/src/index.ts",
                        ],
                        [t.pkg]: [themeEntry],
                    },
                    noUnusedLocals: true,
                    noUnusedParameters: true,
                    noFallthroughCasesInSwitch: true,
                },
                include: ["src"],
            },
            null,
            2
        ) + "\n"
    )

    fs.writeFileSync(
        path.join(dir, "tsconfig.node.json"),
        JSON.stringify(
            {
                compilerOptions: {
                    tsBuildInfoFile:
                        "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
                    target: "es2023",
                    lib: ["ES2023"],
                    types: ["node"],
                    skipLibCheck: true,
                    module: "nodenext",
                    allowImportingTsExtensions: true,
                    verbatimModuleSyntax: true,
                    moduleDetection: "force",
                    noEmit: true,
                    noUnusedLocals: true,
                    noUnusedParameters: true,
                    erasableSyntaxOnly: true,
                    noFallthroughCasesInSwitch: true,
                },
                include: ["vite.config.ts"],
            },
            null,
            2
        ) + "\n"
    )

    fs.writeFileSync(path.join(dir, "eslint.config.js"), eslint)

    fs.writeFileSync(
        path.join(dir, "index.html"),
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-json-form · ${t.title}</title>
    <meta
      name="description"
      content="Examples for @undermuz/react-json-form with the ${t.title} theme."
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
    )

    fs.writeFileSync(
        path.join(dir, "src/vite-env.d.ts"),
        `/// <reference types="vite/client" />
`
    )

    const stylesLine = t.stylesImport
        ? `import "${t.stylesImport}"\n`
        : ""

    const snippetsStyles = t.stylesImport
        ? `    stylesImport: "${t.stylesImport}",\n`
        : ""

    fs.writeFileSync(
        path.join(dir, "src/index.css"),
        `@import "@undermuz/react-json-form-home-lib/styles.css";\n`
    )

    fs.writeFileSync(
        path.join(dir, "src/App.tsx"),
        `import ${t.importName} from "${t.pkg}"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "${t.pkg}",
    themeImportName: "${t.importName}",
${snippetsStyles}})

function App() {
    return (
        <ExamplesApp
            ui={${t.importName}}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeLabel="${t.title}"
        />
    )
}

export default App
`
    )

    fs.writeFileSync(
        path.join(dir, "src/main.tsx"),
        `import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import "./index.css"
${stylesLine}import App from "./App.tsx"
import { ThemeRoot } from "./ThemeRoot.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HashRouter>
            <ThemeRoot>
                <App />
            </ThemeRoot>
        </HashRouter>
    </StrictMode>
)
`
    )

    fs.writeFileSync(
        path.join(dir, "src/ThemeRoot.tsx"),
        `import type { FC, ReactNode } from "react"

export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <>{children}</>
)
`
    )
}

console.log("Scaffolded", themes.map((t) => t.id).join(", "))
