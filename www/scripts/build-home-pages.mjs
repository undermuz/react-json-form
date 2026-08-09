import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "../..")
const staging = path.join(repoRoot, "www/dist-pages")

const THEMES = [
    "base",
    "chakra",
    "chakra3",
    "grommet",
    "heroui",
    "rsuite",
    "antd",
    "mantine",
    "mui",
]

function run(cmd, env = {}) {
    console.log(`\n> ${cmd}`)
    execSync(cmd, {
        cwd: repoRoot,
        stdio: "inherit",
        env: { ...process.env, ...env },
        shell: true,
    })
}

function rimraf(dir) {
    fs.rmSync(dir, { recursive: true, force: true })
}

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true })
    fs.cpSync(src, dest, { recursive: true })
}

rimraf(staging)
fs.mkdirSync(staging, { recursive: true })

// Shared lib must not keep a nested @types/react (React 19 from home-mantine
// can land here via workspaces and break tsc for every other home app).
rimraf(path.join(repoRoot, "www/home-lib/node_modules"))

run("npm run build:pages --workspace=@undermuz/react-json-form-home", {
    BASE_PATH: "/react-json-form/",
})
copyDir(path.join(repoRoot, "www/home/dist"), staging)

for (const theme of THEMES) {
    const workspace = `@undermuz/react-json-form-home-${theme}`
    const base = `/react-json-form/${theme}/`
    run(`npm run build:pages --workspace=${workspace}`, {
        BASE_PATH: base,
    })
    copyDir(
        path.join(repoRoot, `www/home-${theme}/dist`),
        path.join(staging, theme)
    )
}

// Ensure GH Pages treats the tree as a static site
fs.writeFileSync(path.join(staging, ".nojekyll"), "")

console.log(`\nStaged pages at ${staging}`)
