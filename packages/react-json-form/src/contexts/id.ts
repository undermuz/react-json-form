import { createContext, useContext, useRef } from "react"

export type ContextIdValue = {
    lastId: number
}

const ContextId = createContext<ContextIdValue>({ lastId: 0 })

export const useJsonFormIdValue = (): ContextIdValue => {
    const value = useContext(ContextId)

    if (!value) {
        throw new Error("JsonForm must be wrapped by ContextIdValue.Provider")
    }

    return value
}

export const useJsonFormUniqId = (): number => {
    const ref = useRef<number | null>(null)
    const value = useJsonFormIdValue()

    if (ref.current == null) {
        ref.current = ++value.lastId
    }

    return ref.current
}

export default ContextId
