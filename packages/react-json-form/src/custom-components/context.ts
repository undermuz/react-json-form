import {
    createContext,
    type PropsWithChildren,
    type FC,
    type Context,
    useContext,
} from "react"

import { type IFormFieldCustomProps } from "../flat-form/FormField"
import { type IInput } from "../flat-form/form-input/input"
import { type IConnectedProps } from "@undermuz/use-form"

export type TypeCustomComponentProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = PropsWithChildren & IInput & IConnectedProps & IFormFieldCustomProps<T>

export type TypeCustomComponent<
    T extends Record<string, unknown> = Record<string, unknown>
> = FC<TypeCustomComponentProps<T>>

const CustomComponentsContext = createContext<Record<
    string,
    TypeCustomComponent
> | null>(null)

export const useJsonFormCustomComponents = <
    T extends Record<string, unknown> = Record<string, unknown>
>(): Record<string, TypeCustomComponent<T>> | null => {
    return useContext<Record<string, TypeCustomComponent<T>> | null>(
        CustomComponentsContext as Context<Record<
            string,
            TypeCustomComponent<T>
        > | null>
    )
}

export const useJsonFormCustomComponent = (
    name: string
): TypeCustomComponent | null => {
    const CustomComponents = useContext(CustomComponentsContext)

    if (!CustomComponents) {
        return null
    }

    return CustomComponents[name] || null
}

export default CustomComponentsContext
