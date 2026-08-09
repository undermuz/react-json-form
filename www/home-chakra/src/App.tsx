import ChakraUi from "@undermuz/react-json-form-theme-chakra"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-chakra",
    themeImportName: "ChakraUi",
})

function App() {
    return (
        <ExamplesApp
            ui={ChakraUi}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="chakra"
            themeLabel="chakra"
        />
    )
}

export default App
