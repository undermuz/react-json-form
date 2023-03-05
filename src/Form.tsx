/*SYSTEM IMPORTS*/
import type { FC } from "react"
import { useCallback } from "react"

/* TYPES */
import type {
    IJsonFormProps,
    TypeErrorItem,
    TypeValue,
    TypeValueItem,
} from "./types"

/* COMPONENTS */

import FlatForm from "./FlatForm"
import ArrayForm from "./ArrayForm"

/* HELPERS */
import type { IErrors } from "@undermuz/use-form"

const Form: FC<
    IJsonFormProps & {
        def: TypeValueItem
        value: TypeValue
        level: number
        errors: IErrors | TypeErrorItem[]
        onError: (e: IErrors | TypeErrorItem[]) => void
    }
> = (props) => {
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
}

export default Form
