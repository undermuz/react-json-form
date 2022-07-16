import { createContext, useContext } from "react"
import { JsonFormUi } from "./types"

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

export default UiContext
