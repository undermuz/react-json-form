import type { CSSProperties, FC, PropsWithChildren } from "react"
import { forwardRef, useCallback, useMemo } from "react"

import {
    Box,
    Button,
    Group,
    Stack,
    Switch,
    Text,
    Title,
} from "@mantine/core"

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

const UiContainer: FC<PropsWithChildren<object>> = ({ children }) => (
    <Stack gap="sm" w="100%">
        {children}
    </Stack>
)

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children, primary, level } = props

    if (primary) {
        return (
            <Stack gap="md" p="md" w="100%">
                {children}
            </Stack>
        )
    }

    if (level > 2) {
        return (
            <Stack
                gap="sm"
                p="sm"
                w="100%"
                style={{
                    border: "1px solid var(--mantine-color-default-border)",
                    borderRadius: "var(--mantine-radius-md)",
                }}
            >
                {children}
            </Stack>
        )
    }

    return (
        <Stack gap="sm" w="100%">
            {children}
        </Stack>
    )
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { title, level, primary, children } = props

    const pads = useMemo(() => {
        if (primary) return "sm"
        if (level <= 2) return 0
        return "xs"
    }, [primary, level])

    if (!title && !children) {
        return null
    }

    return (
        <Stack gap="xs" w="100%" p={pads} pb="xs">
            {Boolean(title) && (
                <Title order={primary ? 3 : 4}>{title}</Title>
            )}
            {children}
        </Stack>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    children,
    isShow,
}) => (
    <Stack
        gap="md"
        w="100%"
        style={{ display: isShow ? undefined : "none" }}
    >
        {children}
    </Stack>
)

const UiItemWrapper: FC<PropsWithChildren<IItem>> = (props) => {
    const { type, children } = props

    const showLabel = useMemo(() => {
        if (type === EnumSchemeItemType.Checkbox) return false
        if (type === EnumSchemeItemType.Widget) return false
        return true
    }, [type])

    return (
        <Box w="100%" miw={0} py={showLabel ? 0 : "xs"}>
            {children}
        </Box>
    )
}

const UiItem: FC<PropsWithChildren<IItem>> = (props) => {
    const { title, type, ...other } = props

    return (
        <>
            {type === EnumSchemeItemType.Submit && (
                <Button {...other} type="submit">
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

    return (
        <Switch
            checked={!value}
            onChange={(event) => onChangeHandler(event.currentTarget.checked)}
        />
    )
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

        if (
            type === EnumSchemeItemType.Checkbox ||
            type === EnumSchemeItemType.Widget
        ) {
            return false
        }

        return true
    }, [type, rawShowLabel])

    const isError = Boolean(errors?.length)
    const errorText = isError
        ? errors
              ?.filter((errorText) => typeof errorText === "string")
              .join(", ")
        : undefined

    const toggle = showToggle ? (
        <ConnectToForm name={`${name}__isDisabled`}>
            <UiFieldSwitch />
        </ConnectToForm>
    ) : null

    return (
        <Stack gap={4} w="100%">
            {(showLabel || showToggle) && (
                <Group justify="space-between" align="center" wrap="nowrap">
                    {showLabel ? (
                        <Text component="label" htmlFor={id} size="sm" fw={500}>
                            {title}
                        </Text>
                    ) : (
                        <span />
                    )}
                    {toggle}
                </Group>
            )}

            {children}

            {!isError && description != null && (
                <Text size="xs" c="dimmed">
                    {description}
                </Text>
            )}

            {errorText && (
                <Text size="xs" c="red">
                    {errorText}
                </Text>
            )}
        </Stack>
    )
}

const UiTab = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        const { label, active, onSelect, children, style } = props

        return (
            <Button
                ref={ref}
                variant={active ? "filled" : "default"}
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
) => (
    <Stack gap="sm" p="sm" w="100%" style={props.style}>
        {props.children}
    </Stack>
)

const UiArrayFormHeader: FC<PropsWithChildren<object>> = (props) => (
    <Group justify="space-between" align="center" mb="sm">
        {props.children}
    </Group>
)

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => (
    <Box
        ref={ref}
        p={4}
        style={{
            position: "absolute",
            zIndex: 2,
            top: -30,
            left: 0,
            width: "100%",
            border: `2px dashed ${props.isOver ? "var(--mantine-color-red-6)" : "var(--mantine-color-default-border)"}`,
            background: props.isOver
                ? "var(--mantine-color-red-light)"
                : "var(--mantine-color-body)",
            borderRadius: "var(--mantine-radius-sm)",
        }}
    >
        {Boolean(props?.label) && <Text size="sm">{props?.label}</Text>}
        {props.children}
    </Box>
))

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props
) => (
    <Group gap="xs" align="center" wrap="wrap">
        {props.children}
    </Group>
)

const UiArrayFormBody: FC<PropsWithChildren<object>> = (props) => (
    <Stack gap="sm" w="100%">
        {props.children}
    </Stack>
)

// Core ships @types/react 18; this theme peers React 19 — bridge FC/ReactNode mismatch.
const MantineUi = {
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
} as unknown as Omit<JsonFormUi, "Controls" | "Icons">

export default MantineUi

