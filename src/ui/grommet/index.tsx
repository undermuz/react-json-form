import { FC, PropsWithChildren, useMemo } from "react"
import styled from "styled-components"

import {
    Box,
    CheckBox,
    DateInput,
    FormField,
    Heading,
    Tag,
    TextArea,
    TextInput,
} from "grommet"

import Select from "react-select"

import {
    EnumSchemeItemType,
    IField,
    IUiHeaderProps,
    JsonFormUi,
} from "../../types"

import { IInput } from "../../input"

import { isArray } from "underscore"

const UiContainer = styled(Box)``

const UiBody: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Box pad={"small"}>{children}</Box>
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { id, title, primary, children } = props

    return (
        <Box
            width={"100%"}
            direction="row"
            pad={"small"}
            justify="between"
            background={primary ? "brand" : "light-6"}
        >
            <Box direction="row" justify="start" gap="small">
                {Boolean(title) && (
                    <Heading level={primary ? 3 : 4} margin="none">
                        {title}
                    </Heading>
                )}

                {Boolean(id) && <Tag value={`#${id}`} />}
            </Box>

            {children}
        </Box>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Box pad={"xxsmall"}>{children}</Box>
}

const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const { title, type, hasError, children } = props

    const showLabel = useMemo(() => {
        if (type === EnumSchemeItemType.Checkbox) {
            return false
        }

        if (type === EnumSchemeItemType.Widget) {
            return false
        }

        return true
    }, [type])

    if (!showLabel) {
        return <Box pad={"xsmall"}>{children}</Box>
    }

    return (
        <FormField error={hasError ? "Error" : undefined} label={title}>
            {children}
        </FormField>
    )
}

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

const Controls = {
    Input: ControlInput,
    TextBlock: ControlTextBlock,
    CheckBox: ControlCheckBox,
    Date: ControlDate,
    Select: ControlSelect,
}

const GrommetUi: JsonFormUi = {
    Container: UiContainer,
    Header: UiHeader,
    Body: UiBody,
    FlatFormContainer: UiFlatFormContainer,
    Field: UiField,
    Controls,
}

export default GrommetUi
