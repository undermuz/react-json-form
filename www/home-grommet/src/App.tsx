import GrommetUi from "@undermuz/react-json-form-theme-grommet"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-grommet",
    themeImportName: "GrommetUi",
})

function App() {
    return (
        <ExamplesApp
            ui={GrommetUi}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="grommet"
            themeLabel="grommet"
        />
    )
}

export default App
