import ApiContext, { type ApiValue } from "./contexts/api"
import JFL from "./components/JsonFormLayout"
import CustomComponentsContext, {
    useJsonFormCustomComponent,
    useJsonFormCustomComponents,
    type TypeCustomComponentProps,
    type TypeCustomComponent,
} from "./custom-components/context"
export type { IInput } from "./flat-form/form-input/input"
import JsonForm from "./JsonForm"
import UiContext, { useJsonFormUi } from "./contexts/ui"
import { useSubmit } from "./useSubmit"

export {
    CustomComponentsContext,
    useJsonFormCustomComponents,
    useJsonFormCustomComponent,
}
export type { TypeCustomComponentProps, TypeCustomComponent, ApiValue }

export { JsonForm, UiContext, JFL, useSubmit, useJsonFormUi, ApiContext }
export * from "./types"

export default JsonForm
