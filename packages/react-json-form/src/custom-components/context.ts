import {
    createContext,
    type PropsWithChildren,
    type FC,
    useContext,
} from "react"
import { type IFormFieldCustomProps } from "../flat-form/FormField"
import { type IInput } from "../flat-form/form-input/input"

export type TypeCustomComponentProps = PropsWithChildren &
    IInput &
    IFormFieldCustomProps
export type TypeCustomComponent = FC<TypeCustomComponentProps>

const CustomComponentsContext = createContext<Record<
    string,
    TypeCustomComponent
> | null>(null)

export const useJsonFormCustomComponents = (): Record<
    string,
    TypeCustomComponent
> | null => {
    return useContext(CustomComponentsContext)
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
