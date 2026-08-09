/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOME_URL?: string
    readonly VITE_EXAMPLES_BASE_URL?: string
    readonly DEV: boolean
    readonly PROD: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
