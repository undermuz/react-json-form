import type { CSSProperties, FC, ForwardedRef, PropsWithChildren } from "react"
import { forwardRef, useCallback, useMemo } from "react"

import styled, { css } from "styled-components"

import { Box, Button, CheckBox, Heading, Tag, Text } from "grommet"

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

const UiContainer = styled(Box)`
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

    * {
        font-family: "Roboto", sans-serif;
    }
`

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = ({ primary, children }) => {
    return (
        <Box
            pad={
                primary
                    ? {
                          top: "small",
                          right: "small",
                          bottom: "small",
                      }
                    : undefined
            }
        >
            {children}
        </Box>
    )
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { id, title, primary, children } = props

    return (
        <Box
            width={"100%"}
            direction="row"
            pad={primary ? "small" : "xxsmall"}
            justify="between"
            background={primary ? "brand" : "light-2"}
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

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    children,
    isShow,
}) => {
    return (
        <Box style={{ display: isShow ? undefined : "none" }}>{children}</Box>
    )
}

const Branch = styled(Box)`
    ${({ theme }) => css`
        width: 10px;
        ::before {
            content: "";
            box-sizing: content-box;
            display: block;
            width: 12px;
            height: var(--branch-height, 18px);
            padding-bottom: 18px;
            border: solid ${theme.global.colors["dark-3"]};
            border-width: 0 0 1px 1px;
            border-bottom-left-radius: 8px;
            margin-left: -1px;
        }
    `}
`
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
const UiItemWrapper: FC<PropsWithChildren<IItem>> = (props) => {
    const { isLast = false, primary = false, children } = props

    return (
        <Box
            direction={"row"}
            border={[
                {
                    side: "left",
                    size: !primary && !isLast ? "xsmall" : "none",
                    color: "dark-3",
                },
            ]}
            pad={{
                bottom: !isLast ? "small" : undefined,
            }}
        >
            {children}
        </Box>
    )
}

const UiFieldSwitch: FC<Omit<IInput, "type" | "title" | "settings">> = ({
    value = false,
    onChange,
}) => {
    const onChangeHandler = useCallback(
        (event: { target: { checked: boolean } }) => {
            onChange?.(!event.target.checked)
        },
        [onChange]
    )

    return (
        <CheckBox
            toggle
            checked={!value}
            onChange={onChangeHandler}
            label=""
        />
    )
}

const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const {
        id,
        title,
        name,
        description = null,
        isLast = false,
        primary = false,
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

        if (type === EnumSchemeItemType.Checkbox) {
            return false
        }

        return true
    }, [type, rawShowLabel])

    const isError = Boolean(errors?.length)

    const label = showLabel ? (
        <Text as="label" {...({ htmlFor: id } as object)}>
            {title}
        </Text>
    ) : null

    const toggle = showToggle ? (
        <ConnectToForm name={`${name}__isDisabled`}>
            <UiFieldSwitch />
        </ConnectToForm>
    ) : null

    return (
        <Box
            direction={"row"}
            border={[
                {
                    side: "left",
                    size: !primary && !isLast ? "xsmall" : "none",
                    color: "dark-3",
                },
            ]}
            pad={{
                bottom: !isLast ? "small" : undefined,
            }}
        >
            {!primary && (
                <Branch
                    style={
                        {
                            "--branch-height":
                                type === EnumSchemeItemType.Checkbox
                                    ? "1px"
                                    : "34px",
                        } as CSSProperties
                    }
                    direction={"column"}
                ></Branch>
            )}

            <Box
                width={"100%"}
                pad={{
                    top: !showLabel && !showToggle ? "small" : undefined,
                    bottom: !showLabel && !showToggle ? "small" : undefined,
                }}
                direction={"column"}
                justify="center"
                gap="xsmall"
            >
                {!showToggle && showLabel && label}
                {showToggle && !showLabel && toggle}
                {showToggle && showLabel && (
                    <Box direction="row" justify="between" align="center">
                        {label}
                        {toggle}
                    </Box>
                )}

                {children}

                {description !== null && !isError && (
                    <Text size="small" color="dark-4">
                        {description}
                    </Text>
                )}

                {errors?.map((errorText, index) => {
                    if (typeof errorText !== "string") {
                        return null
                    }

                    return (
                        <Text key={index} size="small" color="status-critical">
                            {errorText}
                        </Text>
                    )
                })}
            </Box>
        </Box>
    )
}

const Tab = styled(Box)<IUiTabProps>`
    user-select: none;
`

const UiTab = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        const { label, active, onSelect, children, style } = props

        return (
            <Tab
                onClick={onSelect}
                background={{
                    color: active ? "brand" : "light-3",
                    opacity: active ? "medium" : undefined,
                }}
                ref={ref as ForwardedRef<HTMLDivElement>}
                hoverIndicator
                style={style}
            >
                <Box pad={"xsmall"}>
                    {Boolean(label) && <Text>{label}</Text>}
                    {children}
                </Box>
            </Tab>
        )
    }
)

UiTab.displayName = "UiTab"

const UiArrayFormContainer: FC<PropsWithChildren<IUiArrayFormProps>> = (
    props
) => {
    return (
        <Box direction="column" style={props.style}>
            {props.children}
        </Box>
    )
}

const UiArrayFormHeader: FC<PropsWithChildren<{}>> = (props) => {
    return (
        <Box
            direction="row"
            justify="between"
            background={{ color: "light-2" }}
        >
            {props.children}
        </Box>
    )
}

const TrashContainer = styled(Box)`
    position: absolute;
    z-index: 2;
    top: -56px;
    left: 0px;
    width: 100%;
`

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => {
    return (
        <TrashContainer
            ref={ref}
            animation={{ type: "fadeIn", duration: 300 }}
            border={{
                color: "status-critical",
                size: "small",
                style: "dashed",
            }}
            background={{
                color: props.isOver ? "status-critical" : "light-2",
            }}
            pad="xsmall"
        >
            {Boolean(props?.label) && <Text>{props?.label}</Text>}
            {props.children}
        </TrashContainer>
    )
})

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props
) => {
    return <Box direction="row">{props.children}</Box>
}

const UiArrayFormBody: FC<PropsWithChildren<{}>> = (props) => {
    return <Box>{props.children}</Box>
}

const GrommetUi: Omit<JsonFormUi, "Controls" | "Icons"> = {
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

export default GrommetUi
