import type { CSSProperties, FC, ForwardedRef, PropsWithChildren } from "react"
import { forwardRef, useMemo } from "react"

import styled, { css } from "styled-components"

import { Box, Button, Heading, Tag, Text } from "grommet"

import type {
    IField,
    IItem,
    IUiArrayFormProps,
    IUiArrayFormTabsProps,
    IUiArrayFormTrashContainerProps,
    IUiBodyProps,
    IUiHeaderProps,
    IUiTabProps,
    JsonFormUi,
} from "../../types"
import { EnumSchemeItemType } from "../../types"

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

const UiFlatFormContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Box>{children}</Box>
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

const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const { title, isLast = false, primary = false, type, children } = props

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
                    top: !showLabel ? "small" : undefined,
                    bottom: !showLabel ? "small" : undefined,
                }}
                direction={"column"}
                justify="center"
            >
                {showLabel && <Text as="label">{title}</Text>}
                {children}
            </Box>
        </Box>
    )
}

const Tab = styled(Box)<IUiTabProps>`
    user-select: none;
`

const UiTab = forwardRef<HTMLElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        return (
            <Tab
                {...props}
                onClick={props.onSelect}
                background={{
                    color: props.active ? "brand" : "light-3",
                    opacity: props.active ? "medium" : undefined,
                }}
                ref={ref as ForwardedRef<HTMLDivElement>}
                hoverIndicator
            >
                <Box pad={"xsmall"}>
                    {Boolean(props?.label) && <Text>{props?.label}</Text>}
                    {props.children}
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
