import MuiTheme from "@undermuz/react-json-form-theme-mui"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-mui",
    themeImportName: "MuiTheme",
})

function App() {
    return (
        <ExamplesApp
            ui={MuiTheme}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="mui"
            themeLabel="mui"
        />
    )
}

export default App
