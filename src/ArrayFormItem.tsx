import type { IErrors } from "@undermuz/use-form"
import { type FC, useCallback, useEffect, type PropsWithChildren } from "react"
import FlatForm from "./FlatForm"
import type { IJsonFormRef, ISchemeItem, TypeValueItem } from "./types"

interface IArrayFormItemProps {
    id: number
    isShow?: boolean
    primary?: boolean
    level: number
    value: TypeValueItem
    scheme: ISchemeItem[]
    onRef?: ({ id, ref }: { id: number; ref: IJsonFormRef | null }) => void
    onChange: (v: TypeValueItem, id: number | null) => void
    onError: (v: IErrors, id: number) => void
}

const ArrayFormItem: FC<PropsWithChildren & IArrayFormItemProps> = (props) => {
    const {
        id,
        value,
        scheme,
        level,
        isShow = true,
        primary = false,
        onRef,
        children,
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

    const ref = useCallback(
        (ref: IJsonFormRef | null) => {
            // console.log(`[ArrayFormItem: #${id}][ref]`, ref, onRef)

            onRef?.({ id, ref })
        },
        [onRef]
    )

    useEffect(() => {
        if (!id) {
            console.error("ArrayFormItem: props id is required")
        }
    }, [])

    return (
        <FlatForm
            ref={ref}
            level={level}
            isShow={isShow}
            primary={primary}
            scheme={scheme}
            value={value}
            onChange={change}
            onError={setErrors}
        >
            {children}
        </FlatForm>
    )
}

export default ArrayFormItem
