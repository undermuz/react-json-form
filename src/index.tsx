import ApiContext from "./ApiContext"
import JFL from "./components/JsonFormLayout"
import CustomComponentsContext, {
    useJsonFormCustomComponent,
    useJsonFormCustomComponents,
    type TypeCustomComponentProps,
    type TypeCustomComponent,
} from "./CustomComponentsContext"
export type { IInput } from "./input"
import JsonForm from "./JsonForm"
import UiContext from "./UiContext"
import { useSubmit } from "./useSubmit"

export {
    CustomComponentsContext,
    useJsonFormCustomComponents,
    useJsonFormCustomComponent,
}
export type { TypeCustomComponentProps, TypeCustomComponent }

export { JsonForm, UiContext, JFL, useSubmit, ApiContext }
export * from "./types"

export default JsonForm
