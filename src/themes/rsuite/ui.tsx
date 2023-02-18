import type { FC, ForwardedRef, PropsWithChildren } from "react"
import { forwardRef, useMemo } from "react"
import styled from "styled-components"

import type {
    IField,
    IUiArrayFormProps,
    IUiArrayFormTabsProps,
    IUiArrayFormTrashContainerProps,
    IUiBodyProps,
    IUiFlatFormProps,
    IUiHeaderProps,
    IUiTabProps,
    JsonFormUi,
} from "../../types"
import { EnumSchemeItemType } from "../../types"

import { Form, Nav } from "rsuite"
import { Box, Heading, Tag, Text } from "grommet"

const UiContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Box direction={"column"}>{children}</Box>
}

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { primary, children } = props

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
    primary = false,
    children,
}) => {
    if (primary) {
        return <Form>{children}</Form>
    }

    return (
        <div className="rs-form rs-form-vertical rs-form-fixed-width">
            {children}
        </div>
    )
}

const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const { title, name, type, errors, children } = props

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
        <Form.Group controlId={name}>
            {showLabel && <Form.ControlLabel>{title}</Form.ControlLabel>}
            {children}
            {errors &&
                errors.length > 0 &&
                errors.map((error: string, index: number) => {
                    return (
                        <div key={index} style={{ color: "red" }}>
                            {error}
                        </div>
                    )
                })}
        </Form.Group>
    )
}

const UiTab = forwardRef<HTMLElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        return (
            <Nav.Item {...props} ref={ref as ForwardedRef<HTMLAnchorElement>}>
                {Boolean(props.label) && props.label}
                {props.children}
            </Nav.Item>
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
        <Box direction="row" justify="between">
            {props.children}
        </Box>
    )
}

const TrashContainer = styled(Box)`
    position: absolute;
    z-index: 2;
    top: -30px;
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
    return (
        <Nav appearance={!props.actions ? "tabs" : undefined}>
            {props.children}
        </Nav>
    )
}

const UiArrayFormBody: FC<PropsWithChildren<{}>> = (props) => {
    return <Box>{props.children}</Box>
}

const RsuiteUi: Omit<JsonFormUi, "Controls" | "Icons"> = {
    Container: UiContainer,
    Header: UiHeader,
    Body: UiBody,
    FlatForm: UiFlatFormContainer,
    Field: UiField,
    ArrayForm: Object.assign(UiArrayFormContainer, {
        Header: UiArrayFormHeader,
        Tabs: UiArrayFormTabs,
        Body: UiArrayFormBody,
        TrashContainer: UiArrayFormTrashContainer,
    }),
    Tab: UiTab,
}

export default RsuiteUi
