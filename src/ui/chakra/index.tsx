import { FC, PropsWithChildren, useMemo } from "react"

import {
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react"

import { DateInput, Heading, Tag } from "grommet"

import Select from "react-select"

import {
    EnumSchemeItemType,
    IField,
    IUiHeaderProps,
    JsonFormUi,
} from "../../types"

import { IInput } from "../../input"

import { isArray } from "underscore"

const UiContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Flex direction={"column"}>{children}</Flex>
}

const UiBody: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Flex direction={"column"} p={5}>
            {children}
        </Flex>
    )
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { id, title, primary, children } = props

    return (
        <Flex
            width={"100%"}
            direction="column"
            p={3}
            justify="between"
            background={primary ? "teal.300" : "gray.100"}
        >
            <Flex direction="row" justify="space-between" gap="small">
                {Boolean(title) && (
                    <Heading level={primary ? 3 : 4} margin="none">
                        {title}
                    </Heading>
                )}

                {Boolean(id) && <Tag value={`#${id}`} />}
            </Flex>

            {children}
        </Flex>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Flex direction={"column"} p={"xxsmall"}>
            {children}
        </Flex>
    )
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

    return (
        <FormControl isInvalid={hasError}>
            {showLabel && <FormLabel htmlFor="email">{title}</FormLabel>}

            {children}
        </FormControl>
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
