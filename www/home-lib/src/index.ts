export { default as AppChrome } from "./components/AppChrome"
export type { AppChromeProps } from "./components/AppChrome"

export { default as ThemeSwitcher } from "./components/ThemeSwitcher"
export type { ThemeSwitcherProps } from "./components/ThemeSwitcher"

export { default as CodePanel } from "./components/CodePanel"

export { default as ExamplesApp } from "./examples/ExamplesApp"
export type { ExamplesAppProps } from "./examples/ExamplesApp"

export { default as ExamplesPage } from "./examples/ExamplesPage"
export type { ExamplesPageProps } from "./examples/ExamplesPage"

export {
    EXAMPLES,
    createExampleCatalog,
    type ExampleId,
    type ExampleMeta,
} from "./examples/catalog"

export {
    createSnippets,
    type CreateSnippetsOptions,
    type Snippet,
    type Snippets,
} from "./examples/snippets"

export { demoApi } from "./examples/api"

export {
    THEME_APP_IDS,
    THEME_APP_LABELS,
    getHomeHref,
    getExamplesHref,
    getExamplesBaseHref,
    getJsonFormHref,
    getUseFormHref,
    getPageBuilderHref,
    type ThemeAppId,
} from "./siteUrls"
