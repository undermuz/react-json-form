import { type FC, useRef } from "react"

import { CheckBox, DateInput, TextArea, TextInput } from "grommet"

import _Select from "react-select"
const Select = ((_Select as any).default ?? _Select) as typeof _Select

import _AsyncSelect from "react-select/async"
const AsyncSelect = ((_AsyncSelect as any).default ??
    _AsyncSelect) as typeof _AsyncSelect

import type { IInput } from "@undermuz/react-json-form"

import { isArray } from "underscore"
import type { JsonFormControls } from "@undermuz/react-json-form"

interface TypeSelectValue {
    label: string
    value: number
}

const ControlSelect: FC<IInput> = (props) => {
    const { name, value, settings = {} } = props

    const { options, multiple, ...otherSettings } = settings

    const { onChange, onBlur } = props

    const list: number[] = isArray(value) ? (value as number[]) : []

    const isSync = Array.isArray(options)

    const SelectCmp = isSync ? Select : AsyncSelect

    const rest = {
        isClearable: true,
        ...otherSettings,
        ...(!isSync
            ? {
                  loadOptions: options,
                  cacheOptions: true,
                  defaultOptions: true,
              }
            : { options: options }),
    }

    return (
        <SelectCmp
            {...rest}
            isMulti={multiple ? true : false}
            name={name}
            value={
                multiple
                    ? list.map((_val) => ({
                          label:
                              options.find(
                                  (_i: TypeSelectValue) => _i.value == _val
                              )?.label || "(Not found)",
                          value: _val,
                      }))
                    : value
            }
            onBlur={() => onBlur?.()}
            onChange={(_value: any) => {
                if (multiple) {
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

    const { onChange } = props

    return (
        <DateInput
            format="dd.mm.yyyy"
            value={value ? value : undefined}
            onChange={({ value }) => onChange?.(value)}
        />
    )
}

const ControlCheckBox: FC<IInput> = (props) => {
    const { name, value, title } = props

    const { onChange, onBlur } = props

    return (
        <CheckBox
            checked={Boolean(value)}
            name={name}
            label={title}
            onChange={(event) => onChange?.(event.target.checked)}
            onMouseLeave={(e) => onBlur?.(e.currentTarget.checked)}
        />
    )
}

const ControlTextBlock: FC<IInput> = (props) => {
    const { name, value, settings = {} } = props

    const { onChange, onBlur } = props

    return (
        <TextArea
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
        <TextInput
            placeholder={name}
            name={name}
            type={type || "text"}
            value={value}
            onChange={(e) => onChange?.(e.currentTarget.value)}
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
            <TextInput
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
