import { type FC } from "react"

import { SingleDatepicker } from "chakra-dayzed-datepicker"

import { Checkbox, Input, Textarea } from "@chakra-ui/react"

import type { IInput } from "../../input"
import type { JsonFormControls } from "../../types"

import { isArray } from "underscore"

import _Select from "react-select"
const Select = ((_Select as any).default ?? _Select) as typeof _Select

interface TypeSelectValue {
    label: string
    value: number
}

const ControlSelect: FC<IInput> = (props) => {
    const { name, value, settings = {} } = props

    const { onChange, onBlur } = props

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
            onBlur={() => onBlur}
            onChange={(_value: any) => {
                if (settings.multiple) {
                    const _list: TypeSelectValue[] = isArray(_value)
                        ? (_value as TypeSelectValue[])
                        : []

                    onChange?.(_list.map((_val) => _val.value))
                } else {
                    onChange?.(_value)
                }
            }}
        />
    )
}

const ControlDate: FC<IInput> = (props) => {
    const { value } = props

    // const defValue = useMemo(() => {
    //     return new Date()
    // }, [])

    const { onChange } = props

    return (
        <SingleDatepicker
            date={value ? value : undefined}
            onDateChange={(value) => onChange?.(value)}
        />
    )
}

const ControlCheckBox: FC<IInput> = (props) => {
    const { name, value, title } = props

    const { onChange, onBlur } = props

    return (
        <Checkbox
            checked={Boolean(value)}
            name={name}
            onChange={(event) => onChange?.(event.target.checked)}
            onMouseLeave={(e) =>
                onBlur?.((e.currentTarget as HTMLInputElement).checked)
            }
        >
            {title}
        </Checkbox>
    )
}

const ControlTextBlock: FC<IInput> = (props) => {
    const { name, value, settings = {} } = props

    const { onChange, onBlur } = props

    return (
        <Textarea
            value={value}
            name={name}
            {...settings}
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
            onChange={(event) => onChange?.(event.currentTarget.value)}
        />
    )
}

const ControlInput: FC<IInput> = (props) => {
    const { name, value, type } = props

    const { onChange, onBlur } = props

    return (
        <Input
            placeholder={name}
            name={name}
            type={type || "text"}
            value={value}
            onChange={(e) => onChange?.(e.currentTarget.value)}
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
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
