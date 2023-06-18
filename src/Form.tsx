/*SYSTEM IMPORTS*/
import { forwardRef, useCallback } from "react"

/* TYPES */
import type {
    IJsonFormProps,
    IJsonFormRef,
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
    fillArrayDefault?: boolean
    errors: IErrors | TypeErrorItem[]
    onError: (e: IErrors | TypeErrorItem[]) => void
}

const Form = forwardRef<IJsonFormRef, FormProps>((props, ref) => {
    const {
        id,
        viewType,
        level = 1,
        multiple = false,
        isLoading = false,
        primary = true,
        fillArrayDefault = true,
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
        id,
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
                isLoading={isLoading}
                onChange={changeFlat}
                onError={setErrorsFlat}
            />
        )

    return (
        <ArrayForm
            {...rest}
            ref={ref}
            fillArrayDefault={fillArrayDefault}
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
