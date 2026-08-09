import type { JsonFormUi } from "@undermuz/react-json-form"
import MantineUi from "@undermuz/react-json-form-theme-mantine"
import {
    ExamplesApp,
    createSnippets,
    getHomeHref,
} from "@undermuz/react-json-form-home-lib"

const snippets = createSnippets({
    themePackage: "@undermuz/react-json-form-theme-mantine",
    themeImportName: "MantineUi",
})

// Theme peers React 19; home-lib/core types still resolve via React 18 @types.
const ui = MantineUi as unknown as JsonFormUi

function App() {
    return (
        <ExamplesApp
            ui={ui}
            snippets={snippets}
            homeHref={getHomeHref()}
            themeId="mantine"
            themeLabel="mantine"
        />
    )
}

export default App
