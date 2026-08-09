import ChakraUi from "@undermuz/react-json-form-theme-chakra-v3"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-chakra-v3",
    themeImportName: "ChakraUi",
})

function App() {
    return (
        <ExamplesApp
            ui={ChakraUi}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="chakra3"
            themeLabel="chakra3"
        />
    )
}

export default App
