import { FC } from "react"

import { CheckBox, DateInput, TextArea, TextInput } from "grommet"

import Select from "react-select"

import { IInput } from "../../input"

import { isArray } from "underscore"
import { JsonFormControls } from "../../types"

interface TypeSelectValue {
    label: string
    value: number
}

const ControlSelect: FC<IInput> = (props) => {
    const { name, value, settings = {} } = props

    const { onChange, onTest } = props

    const list: number[] = isArray(value) ? (value as number[]) : []

    return (
        <Select
            isMulti={settings.multiple ? true : false}
            name={name}
            value={
                settings.multiple
                    ? list.map((_val) => ({
                          label:
                              settings.options.find(
                                  (_i: TypeSelectValue) => _i.value == _val
                              )?.label || "(Not found)",
                          value: _val,
                      }))
                    : value
            }
            options={settings.options}
            onBlur={() => onTest}
            onChange={(_value: any) => {
                if (settings.multiple) {
                    const _list: TypeSelectValue[] = isArray(_value)
                        ? (_value as TypeSelectValue[])
                        : []

                    onChange(_list.map((_val) => _val.value))
                } else {
                    onChange(_value)
                }
            }}
        />
    )
}

const ControlDate: FC<IInput> = (props) => {
    const { value } = props

    const { onChange } = props

    return (
        <DateInput
            format="dd.mm.yyyy"
            value={value ? value : undefined}
            onChange={({ value }) => onChange(value)}
        />
    )
}

const ControlCheckBox: FC<IInput> = (props) => {
    const { name, value, title } = props

    const { onChange, onTest } = props

    return (
        <CheckBox
            checked={Boolean(value)}
            name={name}
            label={title}
            onChange={(event) => onChange(event.target.checked)}
            onMouseLeave={(e) => onTest(e.currentTarget.checked)}
        />
    )
}

const ControlTextBlock: FC<IInput> = (props) => {
    const { name, value, settings = {} } = props

    const { onChange, onTest } = props

    return (
        <TextArea
            value={value}
            name={name}
            {...settings}
            onBlur={(e) => onTest(e.currentTarget.value)}
            onChange={(event) => onChange(event.currentTarget.value)}
        />
    )
}

const ControlInput: FC<IInput> = (props) => {
    const { name, value, type } = props

    const { onChange, onTest } = props

    return (
        <TextInput
            placeholder={name}
            name={name}
            type={type || "text"}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={(e) => onTest(e.currentTarget.value)}
        />
    )
}

const Controls: JsonFormControls = {
    Input: ControlInput,
    TextBlock: ControlTextBlock,
    CheckBox: ControlCheckBox,
    Date: ControlDate,
    Select: ControlSelect,
}

export default Controls
