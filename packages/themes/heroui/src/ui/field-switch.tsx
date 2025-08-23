import type { FC } from "react"

import { useCallback } from "react"

import type { IInput } from "@undermuz/react-json-form"

export const UiFieldSwitch: FC<Omit<IInput, "type" | "title" | "settings">> = ({
    value = false,
    onChange,
}) => {
    const onChangeHandler = useCallback(
        (e) => {
            onChange?.(!e.target.checked)
        },
        [onChange],
    )

    return (
        <Switch.Root
            pos={"absolute"}
            right={0}
            top={0}
            checked={!value}
            onChange={onChangeHandler}
        >
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label />
        </Switch.Root>
    )
}
