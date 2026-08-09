import RsuiteUi from "@undermuz/react-json-form-theme-rsuite"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-rsuite",
    themeImportName: "RsuiteUi",
})

function App() {
    return (
        <ExamplesApp
            ui={RsuiteUi}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="rsuite"
            themeLabel="rsuite"
        />
    )
}

export default App
