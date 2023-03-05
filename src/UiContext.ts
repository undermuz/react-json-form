import { createContext, useContext } from "react"
import { JsonFormComponent } from "./components/JsonFormComponents"
import type { JsonFormComponents, JsonFormUi } from "./types"

const UiContext = createContext<JsonFormUi | null>(null)

export const useJsonFormUi = (): JsonFormUi => {
    const Ui = useContext(UiContext)

    if (!Ui) {
        throw new Error(
            "JsonForm must be wrapped by UiContext.Provider with selected UI"
        )
    }

    return Ui
}

export const useJsonFormComponents = (): JsonFormComponents => {
    const Ui = useContext(UiContext)

    let rawComponents: Partial<JsonFormComponents> = {}

    if (Ui?.Components) {
        rawComponents = Ui.Components
    }

    return {
        JsonForm: JsonFormComponent,
        ...rawComponents,
    }
}

export default UiContext
