import type { FC, PropsWithChildren } from "react"

import { useMemo } from "react"

import type { IField } from "@undermuz/react-json-form"
import { EnumSchemeItemType } from "@undermuz/react-json-form"

import { ConnectToForm } from "@undermuz/use-form"
import { UiFieldSwitch } from "./field-switch"

const enumValues = Object.values(EnumSchemeItemType)

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
        showLabel: _showLabel,
    } = props

    const showLabel = useMemo(() => {
        if (typeof _showLabel === "boolean") {
            return _showLabel
        }

        if (
            // type !== EnumSchemeItemType.Input &&
            enumValues.includes(type as EnumSchemeItemType)
        ) {
            return false
        }

        return true
    }, [type, _showLabel])

    if (!showLabel) {
        return children
    }

    const isError = errors?.length > 0

    /*@ts-ignore*/
    const label = <label htmlFor={id}>{title}</label>

    const toggle = (
        <ConnectToForm name={`${name}__isDisabled`}>
            <UiFieldSwitch />
        </ConnectToForm>
    )

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
                    /*@ts-ignore*/
                    <span key={index} className="text-tiny text-danger">
                        {errorText}
                    </span>
                )
            })}
        </div>
    )
}
