import { type FC } from "react"

import type { IInput } from "../../../src/flat-form/form-input/input"
import type { JsonFormControls } from "../../../src/types"

// import _ from "underscore"
import { type IConnectedProps } from "@undermuz/use-form"

const ControlSelect: FC<IInput & IConnectedProps> = () => {
    return null
}

const ControlDate: FC<IInput & IConnectedProps> = () => {
    return null
}

const ControlCheckBox: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, title, isDisabled = false } = props

    const { onChange, onBlur } = props

    return (
        <label>
            <input
                id={id}
                type="checkbox"
                disabled={isDisabled}
                checked={Boolean(value)}
                name={name}
                onChange={(event) => onChange?.(event.target.checked)}
                onMouseLeave={(e) =>
                    //@ts-ignore
                    onBlur?.((e.currentTarget as HTMLInputElement).checked)
                }
            />
            {title}
        </label>
    )
}

const ControlTextBlock: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props

    const { onChange, onBlur } = props

    return (
        <textarea
            id={id}
            value={value}
            name={name}
            disabled={isDisabled}
            {...settings}
            onBlur={(e) =>
                //@ts-ignore
                onBlur?.(e.currentTarget.value)
            }
            onChange={(event) => onChange?.(event.currentTarget.value)}
        />
    )
}

const ControlFileInput: FC<IInput & IConnectedProps> = () => {
    return null
}

const ControlInput: FC<IInput & IConnectedProps> = (props) => {
    const {
        id,
        name,
        placeholder = "",
        isDisabled = false,
        value,
        type,
        settings: _rawSettings = {},
    } = props

    const { onChange, onBlur } = props

    //eslint-disable-next-line
    const { inputType, showLabel, showToggle, ...settings } = _rawSettings

    return (
        <input
            id={id}
            {...settings}
            disabled={isDisabled}
            placeholder={placeholder}
            name={name}
            type={inputType || type || "text"}
            value={value}
            onChange={(e) => onChange?.(e.currentTarget.value)}
            onBlur={(e) =>
                //@ts-ignore
                onBlur?.(e.currentTarget.value)
            }
        />
    )
}

const Controls: JsonFormControls = {
    FileInput: ControlFileInput,
    Input: ControlInput,
    TextBlock: ControlTextBlock,
    CheckBox: ControlCheckBox,
    Date: ControlDate,
    Select: ControlSelect,
}

export default Controls
