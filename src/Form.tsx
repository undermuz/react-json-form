/*SYSTEM IMPORTS*/
import { forwardRef, useCallback } from "react"

/* TYPES */
import type {
    IJsonFormProps,
    IJsonFormRefObject,
    TypeErrorItem,
    TypeValue,
    TypeValueItem,
} from "./types"

/* COMPONENTS */

import FlatForm from "./FlatForm"
import ArrayForm from "./ArrayForm"

/* HELPERS */
import type { IErrors } from "@undermuz/use-form"

type FormProps = IJsonFormProps & {
    def: TypeValueItem
    value: TypeValue
    level: number
    errors: IErrors | TypeErrorItem[]
    onError: (e: IErrors | TypeErrorItem[]) => void
}

const Form = forwardRef<IJsonFormRefObject, FormProps>((props, ref) => {
    const {
        viewType,
        level = 1,
        multiple = false,
        primary = true,
        scheme = [],
        children,
        errors,
        def,
        value,
        onChange,
        onError,
    } = props

    const changeFlat = useCallback(
        (newValue: TypeValueItem) => {
            onChange({ ...value, ...newValue })
        },
        [value, onChange]
    )

    const setErrorsFlat = useCallback(
        (newErrors: IErrors) => {
            onError(newErrors)
        },
        [errors, onError]
    )

    const rest = {
        level,
        primary,
        scheme,
        children,
    }

    if (!multiple)
        return (
            <FlatForm
                {...rest}
                ref={ref}
                value={value as TypeValueItem}
                onChange={changeFlat}
                onError={setErrorsFlat}
            />
        )

    return (
        <ArrayForm
            {...rest}
            viewType={viewType}
            errors={errors as TypeErrorItem[]}
            defValue={def}
            value={value as TypeValueItem[]}
            onChange={onChange}
            onError={onError}
        />
    )
})

Form.displayName = "Form"

export default Form
