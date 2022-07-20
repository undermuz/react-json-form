/* eslint-disable */
import { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync } from "fs"
import { join } from "path"
/* eslint-enable */

import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const deleteFolderRecursive = (path) => {
    if (existsSync(path)) {
        readdirSync(path).forEach((file) => {
            const curPath = join(path, file)
            if (lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath)
            } else {
                unlinkSync(curPath)
            }
        })
        rmdirSync(path)
    }
}

const folder = process.argv.slice(2)[0]

if (folder) {
    deleteFolderRecursive(join(__dirname, "../build", folder))
} else {
    deleteFolderRecursive(join(__dirname, "../build/cjs"))
    deleteFolderRecursive(join(__dirname, "../build/esm"))
    deleteFolderRecursive(join(__dirname, "../build/umd"))
    deleteFolderRecursive(join(__dirname, "../build/types"))
}
