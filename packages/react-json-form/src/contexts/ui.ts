import { createContext, useContext } from "react"
import { JsonFormComponent } from "../components/JsonFormComponents"
import { ArrayFormList } from "../array-form/ArrayFormList"
import type { JsonFormComponents, JsonFormUi } from "../types"

const UiContext = createContext<Partial<JsonFormUi> | null>(null)

export const useJsonFormUi = (): Partial<JsonFormUi> | null => {
    const Ui = useContext(UiContext)

    // if (!Ui) {
    //     throw new Error(
    //         "JsonForm must be wrapped by UiContext.Provider with selected UI"
    //     )
    // }

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
        ArrayFormList,
        ...rawComponents,
    }
}

export default UiContext
