import HeroUiTheme from "@undermuz/react-json-form-theme-heroui"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-heroui",
    themeImportName: "HeroUiTheme",
})

function App() {
    return (
        <ExamplesApp
            ui={HeroUiTheme}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="heroui"
            themeLabel="heroui"
        />
    )
}

export default App
