import {
    CSSProperties,
    FC,
    ForwardedRef,
    forwardRef,
    PropsWithChildren,
    useMemo,
} from "react"

import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Tag,
    Text,
} from "@chakra-ui/react"

import {
    EnumSchemeItemType,
    IField,
    IUiArrayFormProps,
    IUiArrayFormTrashContainerProps,
    IUiBodyProps,
    IUiHeaderProps,
    IUiTabProps,
    JsonFormUi,
} from "../../types"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Form, Nav } from "rsuite"

const UiContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Flex direction={"column"}>{children}</Flex>
}

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { primary, children } = props

    return (
        <Flex direction={"column"} p={primary ? 4 : 0} pl={0}>
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
            p={primary ? 3 : 1}
            justify="between"
            background={primary ? "teal.300" : "gray.100"}
        >
            <Flex direction="row" justify="space-between" gap="small">
                {Boolean(title) && (
                    <Heading
                        as={primary ? `h3` : `h4`}
                        size={primary ? `lg` : `md`}
                        margin="none"
                    >
                        {title}
                    </Heading>
                )}

                {Boolean(id) && <Tag>#{id}</Tag>}
            </Flex>

            {children}
        </Flex>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Form>{children}</Form>
}

const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const {
        title,
        isLast,
        primary = false,
        name,
        type,
        hasError,
        children,
    } = props

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
        </Form.Group>
    )
}

const Tab = styled(Box)<IUiTabProps>`
    ${({ active }) => css`
        background-color: var(--chakra-colors-gray-50);

        ${active && `background-color: var(--chakra-colors-teal-50);`}

        user-select: none;

        cursor: pointer;
    `}
`

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

const UiArrayFormContainer: FC<PropsWithChildren<IUiArrayFormProps>> = (
    props
) => {
    return (
        <Flex direction="column" style={props.style}>
            {props.children}
        </Flex>
    )
}

const UiArrayFormHeader: FC<PropsWithChildren<{}>> = (props) => {
    return (
        <Flex
            direction="row"
            backgroundColor="gray.100"
            justify={"space-between"}
            mb={3}
        >
            {props.children}
        </Flex>
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
            border="2px"
            borderColor="red.200"
            borderStyle="dashed"
            backgroundColor={props.isOver ? "red.200" : "gray.100"}
            p={1}
        >
            {Boolean(props?.label) && <Text>{props?.label}</Text>}
            {props.children}
        </TrashContainer>
    )
})

const UiArrayFormTabs: FC<PropsWithChildren<{}>> = (props) => {
    return <Nav appearance="tabs">{props.children}</Nav>
}

const UiArrayFormBody: FC<PropsWithChildren<{}>> = (props) => {
    return <Flex direction="column">{props.children}</Flex>
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
