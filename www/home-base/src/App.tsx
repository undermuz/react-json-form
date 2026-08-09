import BaseTheme from "@undermuz/react-json-form-theme-base"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-base",
    themeImportName: "BaseTheme",
    stylesImport: "@undermuz/react-json-form-theme-base/styles.css",
})

function App() {
    return (
        <ExamplesApp
            ui={BaseTheme}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="base"
            themeLabel="base"
        />
    )
}

export default App
