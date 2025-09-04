import type { FC } from "react"

import { useCallback } from "react"

import type { IInput } from "@undermuz/react-json-form"
import { Switch } from "@heroui/react"

export const UiFieldSwitch: FC<Omit<IInput, "type" | "title" | "settings">> = ({
    value = false,
    onChange,
}) => {
    const onChangeHandler = useCallback(
        (isSelected: boolean) => {
            onChange?.(!isSelected)
        },
        [onChange],
    )

    return <Switch isSelected={!value} onValueChange={onChangeHandler}></Switch>
}
