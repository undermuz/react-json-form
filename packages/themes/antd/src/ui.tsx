import type { CSSProperties, FC, PropsWithChildren } from "react"
import { forwardRef, useCallback, useMemo } from "react"

import {
    Button,
    Flex,
    Form,
    Space,
    Switch,
    Typography,
} from "antd"

import type {
    IField,
    IInput,
    IItem,
    IUiArrayFormProps,
    IUiArrayFormTabsProps,
    IUiArrayFormTrashContainerProps,
    IUiBodyProps,
    IUiFlatFormProps,
    IUiHeaderProps,
    IUiTabProps,
    JsonFormUi,
} from "@undermuz/react-json-form"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import { ConnectToForm } from "@undermuz/use-form"

const { Title, Text } = Typography

const UiContainer: FC<PropsWithChildren<object>> = ({ children }) => {
    return <Flex vertical>{children}</Flex>
}

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children, primary, level } = props

    if (primary) {
        return (
            <Flex vertical style={{ padding: 16, width: "100%" }}>
                {children}
            </Flex>
        )
    }

    if (level > 2) {
        return (
            <Flex
                vertical
                style={{
                    padding: 12,
                    width: "100%",
                    border: "1px solid var(--ant-color-border)",
                    borderRadius: 8,
                }}
            >
                {children}
            </Flex>
        )
    }

    return <Flex vertical style={{ width: "100%" }}>{children}</Flex>
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { title, level, primary, children } = props

    const pads = useMemo(() => {
        if (primary) return 12
        if (level <= 2) return 0
        return 8
    }, [primary, level])

    if (!title && !children) {
        return null
    }

    return (
        <Flex vertical style={{ width: "100%", padding: pads, paddingBottom: 8 }}>
            {Boolean(title) && (
                <Title level={primary ? 3 : 4} style={{ margin: 0 }}>
                    {title}
                </Title>
            )}
            {children}
        </Flex>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    children,
    isShow,
}) => {
    return (
        <Form
            layout="vertical"
            component="div"
            style={{
                display: isShow ? undefined : "none",
                width: "100%",
            }}
        >
            <Flex vertical gap={16} style={{ width: "100%" }}>
                {children}
            </Flex>
        </Form>
    )
}

const UiItemWrapper: FC<PropsWithChildren<IItem>> = (props) => {
    const { type, children } = props

    const showLabel = useMemo(() => {
        if (type === EnumSchemeItemType.Checkbox) return false
        if (type === EnumSchemeItemType.Widget) return false
        return true
    }, [type])

    return (
        <Flex
            vertical
            style={{ width: "100%", minWidth: 0, padding: showLabel ? 0 : "8px 0" }}
        >
            {children}
        </Flex>
    )
}

const UiItem: FC<PropsWithChildren<IItem>> = (props) => {
    const { title, type, ...other } = props

    return (
        <>
            {type === EnumSchemeItemType.Submit && (
                <Button {...other} type="primary" htmlType="submit">
                    {title}
                </Button>
            )}
        </>
    )
}

const UiFieldSwitch: FC<Omit<IInput, "type" | "title" | "settings">> = ({
    value = false,
    onChange,
}) => {
    const onChangeHandler = useCallback(
        (checked: boolean) => {
            onChange?.(!checked)
        },
        [onChange]
    )

    return <Switch checked={!value} onChange={onChangeHandler} />
}

const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const {
        id,
        title,
        name,
        description = null,
        type,
        errors,
        children,
        showToggle = false,
        showLabel: rawShowLabel,
    } = props

    const showLabel = useMemo(() => {
        if (typeof rawShowLabel === "boolean") {
            return rawShowLabel
        }

        // Nested widget/array chrome already has Header title — avoid a second
        // horizontal label column that squeezes every deeper level.
        if (
            type === EnumSchemeItemType.Checkbox ||
            type === EnumSchemeItemType.Widget
        ) {
            return false
        }

        return true
    }, [type, rawShowLabel])

    const isError = Boolean(errors?.length)

    const toggle = showToggle ? (
        <ConnectToForm name={`${name}__isDisabled`}>
            <UiFieldSwitch />
        </ConnectToForm>
    ) : null

    // Toggle must sit outside Form.Item `label` — antd label shrinks to content,
    // so space-between never pushes the switch to the field edge.
    const labelRow =
        showToggle && (showLabel || toggle) ? (
            <Flex
                justify="space-between"
                align="center"
                gap={8}
                style={{ width: "100%", marginBottom: 8 }}
            >
                {showLabel ? (
                    <label htmlFor={id} style={{ margin: 0 }}>
                        {title}
                    </label>
                ) : (
                    <span />
                )}
                {toggle}
            </Flex>
        ) : null

    return (
        <Flex vertical style={{ width: "100%" }}>
            {labelRow}
            <Form.Item
                layout="vertical"
                htmlFor={id}
                validateStatus={isError ? "error" : undefined}
                help={
                    isError
                        ? errors
                              ?.filter(
                                  (errorText) => typeof errorText === "string"
                              )
                              .join(", ")
                        : description || undefined
                }
                label={showLabel && !showToggle ? title : undefined}
                style={{ marginBottom: 0, width: "100%" }}
            >
                {children}
            </Form.Item>
        </Flex>
    )
}

const UiTab = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        const { label, active, onSelect, children, style } = props

        return (
            <Button
                ref={ref}
                type={active ? "primary" : "default"}
                onClick={onSelect}
                style={style as CSSProperties}
            >
                {Boolean(label) && label}
                {children}
            </Button>
        )
    }
)

UiTab.displayName = "UiTab"

const UiArrayFormContainer: FC<PropsWithChildren<IUiArrayFormProps>> = (
    props
) => {
    return (
        <Flex
            vertical
            style={{ ...props.style, padding: 12, width: "100%" }}
        >
            {props.children}
        </Flex>
    )
}

const UiArrayFormHeader: FC<PropsWithChildren<object>> = (props) => {
    return (
        <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
            {props.children}
        </Flex>
    )
}

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: "absolute",
                zIndex: 2,
                top: -30,
                left: 0,
                width: "100%",
                border: `2px dashed ${props.isOver ? "#ff4d4f" : "#d9d9d9"}`,
                background: props.isOver ? "#fff1f0" : "#fafafa",
                padding: 4,
                borderRadius: 6,
            }}
        >
            {Boolean(props?.label) && <Text>{props?.label}</Text>}
            {props.children}
        </div>
    )
})

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props
) => {
    return (
        <Space wrap size={8} align="center">
            {props.children}
        </Space>
    )
}

const UiArrayFormBody: FC<PropsWithChildren<object>> = (props) => {
    return <Flex vertical>{props.children}</Flex>
}

const AntdUi: Omit<JsonFormUi, "Controls" | "Icons"> = {
    Container: UiContainer,
    Header: UiHeader,
    Body: UiBody,
    FlatForm: UiFlatFormContainer,
    Field: UiField,
    Item: UiItem,
    ItemWrapper: UiItemWrapper,
    ArrayForm: Object.assign(UiArrayFormContainer, {
        Header: UiArrayFormHeader,
        Tabs: UiArrayFormTabs,
        Body: UiArrayFormBody,
        TrashContainer: UiArrayFormTrashContainer,
    }),
    Tab: UiTab,
}

export default AntdUi
