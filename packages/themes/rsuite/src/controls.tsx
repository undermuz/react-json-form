import { type FC, type SyntheticEvent, useRef } from "react"

import Select from "react-select"

import { Checkbox, Input } from "rsuite"

import type { IInput } from "@undermuz/react-json-form"
import type { JsonFormControls } from "@undermuz/react-json-form"

import { isArray } from "underscore"

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
            onBlur={() => onBlur?.()}
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
    const { name, value, settings } = props

    const { onChange, onBlur } = props

    return (
        <Input
            type="date"
            value={value}
            name={name}
            {...settings}
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
            onChange={(value) => onChange?.(value)}
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
            onChange={(v, checked) => onChange?.(checked)}
            onMouseLeave={(e: SyntheticEvent) =>
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
        <Input
            as={"textarea"}
            value={value}
            name={name}
            {...settings}
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
            onChange={(value) => onChange?.(value)}
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
            onChange={(value) => onChange?.(value)}
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
        />
    )
}

const ControlFileInput: FC<IInput> = (props) => {
    const {
        id,
        name,
        placeholder = "",
        value,
        settings: _rawSettings = {},
    } = props

    const { onChange, onBlur } = props

    /* @ts-ignore */
    const { showLabel, showToggle, icon, ...settings } = _rawSettings

    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <>
            <input
                {...settings}
                id={id}
                type="file"
                onChange={(e) =>
                    onChange?.(
                        settings?.multiple
                            ? e.target.files
                            : e.target.files?.[0]
                    )
                }
                name={name}
                ref={inputRef}
                style={{ display: "none" }}
            />
            <Input
                placeholder={placeholder || "Your file ..."}
                onClick={() => inputRef.current?.click()}
                onBlur={(e) => onBlur?.(e.currentTarget.value)}
                readOnly={true}
                value={(value && value.name) || ""}
            />
        </>
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
