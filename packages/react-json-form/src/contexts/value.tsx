import { createContext, useContext } from "react"
import type { TypeValue } from "../types"

const ValueContext = createContext<TypeValue>({} as TypeValue)

export const useJsonFormValue = (): TypeValue => {
    const value = useContext(ValueContext)

    if (!value) {
        throw new Error("JsonForm must be wrapped by ValueContext.Provider")
    }

    return value
}

export default ValueContext
