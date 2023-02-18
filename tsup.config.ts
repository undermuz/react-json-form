import { defineConfig } from "tsup"

const env = process.env.NODE_ENV

export default defineConfig({
    entry: ["./src"],
    sourcemap: false,
    clean: true,
    target: "es2019",
    dts: true,
    skipNodeModulesBundle: true,
    format: ["cjs", "esm"],
    minify: env === "production",
    bundle: env === "production",
    external: [
        "rsuite",
        "grommet",
        "chakra-ui",
        "stories",
        "react",
        "react-dom",
        "node_modules",
    ],
})
