import { defineConfig } from "tsup"
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions"

const env = process.env.NODE_ENV

export default defineConfig({
    entry: [
        "./src/index.tsx",
        "./src/controls.tsx",
        "./src/icons.tsx",
        "./src/ui.tsx",
    ],
    sourcemap: false,
    clean: true,
    target: "es2020",
    dts: true,
    skipNodeModulesBundle: true,
    format: ["cjs", "esm"],
    minify: env === "production",
    bundle: true,
    external: ["react", "react-dom", "@undermuz/react-json-form", "@undermuz/use-form"],
    esbuildPlugins: [
        esbuildPluginFilePathExtensions({
            esmExtension: "mjs",
            cjsExtension: "js",
        }),
    ],
})
