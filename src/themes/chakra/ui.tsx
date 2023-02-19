import type { FC, ForwardedRef, PropsWithChildren } from "react"
import { forwardRef, useMemo } from "react"

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Stack,
    Tag,
    Text,
} from "@chakra-ui/react"

import type {
    IField,
    IUiArrayFormProps,
    IUiArrayFormTabsProps,
    IUiArrayFormTrashContainerProps,
    IUiBodyProps,
    IUiHeaderProps,
    IUiTabProps,
    JsonFormUi,
} from "../../types"
import { EnumSchemeItemType } from "../../types"

import _styled from "@emotion/styled"

const styled = ((_styled as any).default ?? _styled) as typeof _styled

const UiContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <Flex direction={"column"}>{children}</Flex>
}

const UiPrimaryBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return (
        <Flex direction={"column"} p={4}>
            {children}
        </Flex>
    )
}

const UiSecondaryBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return (
        <Flex direction={"column"} borderWidth="1px" shadow="md" p={3}>
            {children}
        </Flex>
    )
}

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { primary } = props

    if (primary) return <UiPrimaryBody {...props} />

    return <UiSecondaryBody {...props} />
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { id, title, primary, children } = props

    return (
        <Flex
            width={"100%"}
            direction="column"
            p={primary ? 3 : 2}
            justify="between"
            // background={primary ? "teal.300" : "gray.100"}
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
    return <Flex direction={"column"}>{children}</Flex>
}

// const Branch = styled(Flex)`
//     width: var(--chakra-space-3);
//     ::before {
//         content: "";
//         box-sizing: content-box;
//         display: block;
//         width: 12px;
//         height: var(--branch-height, 18px);
//         padding-bottom: 18px;
//         border: solid var(--chakra-colors-gray-300);
//         border-width: 0 0 1px 1px;
//         border-bottom-left-radius: 8px;
//         margin-left: -1px;
//     }
// `

const UiField: FC<PropsWithChildren<IField>> = (props) => {
    const { title, isLast, type, errors, children } = props

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
        <Flex direction={"row"} pb={!isLast ? 3 : undefined}>
            {/* {!primary && (
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
            )} */}

            <Flex
                width={"100%"}
                pt={showLabel ? 0 : 2}
                pb={showLabel ? 0 : 2}
                direction={"column"}
                justify="center"
            >
                <FormControl isInvalid={errors?.length > 0}>
                    {showLabel && (
                        <FormLabel htmlFor="email">{title}</FormLabel>
                    )}

                    {children}
                </FormControl>
            </Flex>
        </Flex>
    )
}

const Tab = styled(Button)<IUiTabProps>`
    user-select: none;
`

const UiTab = forwardRef<HTMLElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        return (
            <Tab
                {...props}
                variant={props.active ? "solid" : "ghost"}
                onClick={props.onSelect}
                ref={ref as ForwardedRef<HTMLButtonElement>}
            >
                <Box p={1}>
                    {Boolean(props.label) && <Text>{props.label}</Text>}
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
        <Flex direction="column" style={props.style} p={3}>
            {props.children}
        </Flex>
    )
}

const UiArrayFormHeader: FC<PropsWithChildren<{}>> = (props) => {
    return (
        <Stack direction="row" spacing={4} align="center">
            {props.children}
        </Stack>
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

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props
) => {
    return <Flex direction="row">{props.children}</Flex>
}

const UiArrayFormBody: FC<PropsWithChildren<{}>> = (props) => {
    return <Flex direction="column">{props.children}</Flex>
}

const ChakraUi: Omit<JsonFormUi, "Controls" | "Icons"> = {
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

export default ChakraUi
