import { copyFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

copyFileSync(join(root, "src", "styles.css"), join(root, "dist", "styles.css"))
