import { FC } from "react"

import Select from "react-select"
import { DateInput } from "grommet"

import { Checkbox, Input, Textarea } from "@chakra-ui/react"

import type { IInput } from "../../input"
import type { JsonFormControls } from "../../types"

import { isArray } from "underscore"

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
        <Checkbox
            checked={Boolean(value)}
            name={name}
            onChange={(event) => onChange(event.target.checked)}
            onMouseLeave={(e) =>
                onTest((e.currentTarget as HTMLInputElement).checked)
            }
        >
            {title}
        </Checkbox>
    )
}

const ControlTextBlock: FC<IInput> = (props) => {
    const { name, value, settings = {} } = props

    const { onChange, onTest } = props

    return (
        <Textarea
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
        <Input
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
