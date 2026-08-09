import AntdUi from "@undermuz/react-json-form-theme-antd"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-antd",
    themeImportName: "AntdUi",
})

function App() {
    return (
        <ExamplesApp
            ui={AntdUi}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="antd"
            themeLabel="antd"
        />
    )
}

export default App
