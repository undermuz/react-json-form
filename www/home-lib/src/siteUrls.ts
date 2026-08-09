/** Theme folder names under www/home-<name> and GH Pages subpaths. */
export const THEME_APP_IDS = [
    "base",
    "chakra",
    "chakra3",
    "grommet",
    "heroui",
    "rsuite",
] as const

export type ThemeAppId = (typeof THEME_APP_IDS)[number]

export const THEME_APP_LABELS: Record<ThemeAppId, string> = {
    base: "base",
    chakra: "chakra",
    chakra3: "chakra3",
    grommet: "grommet",
    heroui: "heroui",
    rsuite: "rsuite",
}

/**
 * Site root for the landing app.
 * Prod (GH Pages): `/react-json-form/`
 * Local: prefer `VITE_HOME_URL`, else `/`
 */
export function getHomeHref(): string {
    if (import.meta.env.VITE_HOME_URL) {
        return import.meta.env.VITE_HOME_URL as string
    }
    if (import.meta.env.PROD) {
        return "/react-json-form/"
    }
    return "http://localhost:5173/"
}

/**
 * Examples app URL for a theme.
 * Prod: `/react-json-form/<theme>/`
 * Local: `VITE_EXAMPLES_<THEME>_URL` or default ports 5174+
 */
const DEV_PORTS: Record<ThemeAppId, number> = {
    base: 5174,
    chakra: 5175,
    chakra3: 5176,
    grommet: 5177,
    heroui: 5178,
    rsuite: 5179,
}

function withTrailingSlash(url: string): string {
    return url.endsWith("/") ? url : `${url}/`
}

export function getExamplesHref(
    theme: ThemeAppId = "base",
    exampleId?: string
): string {
    const envKey = `VITE_EXAMPLES_${theme.toUpperCase()}_URL`
    const fromEnv = (import.meta.env as Record<string, string | undefined>)[
        envKey
    ]

    let root: string
    if (fromEnv) {
        root = withTrailingSlash(fromEnv)
    } else if (import.meta.env.PROD) {
        root = `/react-json-form/${theme}/`
    } else {
        root = `http://localhost:${DEV_PORTS[theme]}/`
    }

    if (!exampleId) return root
    return `${root}#/${exampleId}`
}

export function getExamplesBaseHref(): string {
    if (import.meta.env.VITE_EXAMPLES_BASE_URL) {
        return import.meta.env.VITE_EXAMPLES_BASE_URL as string
    }
    return getExamplesHref("base")
}

function getCrossProjectHref(
    envKey: string,
    prodPath: string,
    devDefault: string
): string {
    const fromEnv = (import.meta.env as Record<string, string | undefined>)[
        envKey
    ]
    if (fromEnv) return withTrailingSlash(fromEnv)
    if (import.meta.env.PROD) return prodPath
    return withTrailingSlash(devDefault)
}

/** GH Pages: `/react-json-form/` · local: port 5173 */
export function getJsonFormHref(): string {
    return getCrossProjectHref(
        "VITE_JSON_FORM_URL",
        "/react-json-form/",
        "http://localhost:5173"
    )
}

/** GH Pages: `/use-form/` · local: port 5180 */
export function getUseFormHref(): string {
    return getCrossProjectHref(
        "VITE_USE_FORM_URL",
        "/use-form/",
        "http://localhost:5180"
    )
}

/** GH Pages: `/react-page-builder/` · local: port 5181 */
export function getPageBuilderHref(): string {
    return getCrossProjectHref(
        "VITE_PAGE_BUILDER_URL",
        "/react-page-builder/",
        "http://localhost:5181"
    )
}
