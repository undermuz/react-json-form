import type { IErrors } from "@undermuz/use-form"
import { type FC, useCallback, useEffect } from "react"
import FlatForm from "./FlatForm"
import type { ISchemeItem, TypeValueItem } from "./types"

interface IArrayFormItemProps {
    id: number
    isShow?: boolean
    primary?: boolean
    level: number
    value: TypeValueItem
    scheme: ISchemeItem[]
    onChange: (v: TypeValueItem, id: number | null) => void
    onError: (v: IErrors, id: number) => void
}

const ArrayFormItem: FC<IArrayFormItemProps> = (props) => {
    const {
        id,
        value,
        scheme,
        level,
        isShow = true,
        primary = false,
        onChange,
        onError,
    } = props

    const change = useCallback(
        (newValue: TypeValueItem) => {
            onChange(newValue, id)
        },
        [id, onChange]
    )

    const setErrors = useCallback(
        (newErrors: IErrors) => {
            onError(newErrors, id)
        },
        [id, onError]
    )

    useEffect(() => {
        if (!id) {
            console.error("ArrayFormItem: props id is required")
        }
    }, [])

    return (
        <FlatForm
            level={level}
            isShow={isShow}
            primary={primary}
            scheme={scheme}
            value={value}
            onChange={change}
            onError={setErrors}
        />
    )
}

export default ArrayFormItem
