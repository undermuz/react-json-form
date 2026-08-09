import type { FC, PropsWithChildren } from "react"

import { useMemo } from "react"

import type { IField } from "@undermuz/react-json-form"
import { EnumSchemeItemType } from "@undermuz/react-json-form"

import { ConnectToForm } from "@undermuz/use-form"
import { UiFieldSwitch } from "./field-switch"

export const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const {
        id,
        title,
        name,
        description = null,
        isDisabled,
        type,
        errors,
        children,
        showToggle = false,
        showLabel: rawShowLabel,
    } = props

    const showLabel = useMemo(() => {
        if (typeof rawShowLabel === "boolean") {
            return rawShowLabel
        }

        if (type === EnumSchemeItemType.Checkbox) {
            return false
        }

        return true
    }, [type, rawShowLabel])

    const isError = Boolean(errors?.length)

    const label = showLabel ? <label htmlFor={id}>{title}</label> : null

    const toggle = showToggle ? (
        <ConnectToForm name={`${name}__isDisabled`}>
            <UiFieldSwitch />
        </ConnectToForm>
    ) : null

    const showChildren = type !== EnumSchemeItemType.Widget || !isDisabled

    return (
        <div className="flex flex-col items-stretch gap-2">
            {!showToggle && showLabel && label}
            {showToggle && !showLabel && toggle}

            {showToggle && showLabel && (
                <div className="flex flex-row justify-between">
                    {label}
                    {toggle}
                </div>
            )}

            {showChildren && children}

            {description !== null && !isError && (
                <span className="text-tiny text-foreground-400">
                    {description}
                </span>
            )}

            {errors?.map((errorText, index) => {
                if (typeof errorText !== "string") {
                    return null
                }

                return (
                    <span key={index} className="text-tiny text-danger">
                        {errorText}
                    </span>
                )
            })}
        </div>
    )
}
