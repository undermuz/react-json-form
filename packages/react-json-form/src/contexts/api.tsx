import { createContext, useContext } from "react"

export type ApiCallback<T = unknown> = (ctx: any, ...args: any[]) => Promise<T>

export type ApiValue<T = unknown> = Record<string, ApiCallback<T>>

const ApiContext = createContext<ApiValue>({} as ApiValue)

export const useJsonFormApi = <T,>(name: string): ApiCallback<T> => {
    const value = useContext(ApiContext)

    if (!value) {
        throw new Error("JsonForm must be wrapped by ApiContext.Provider")
    }

    return value[name] as ApiCallback<T>
}

export default ApiContext
