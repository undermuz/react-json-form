import type {
    FC,
    ForwardRefExoticComponent,
    ForwardedRef,
    PropsWithChildren,
    RefAttributes,
} from "react"

import { forwardRef, useMemo, useCallback } from "react"

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Stack,
    Switch,
    Text,
    VStack,
} from "@chakra-ui/react"

import type {
    IInput,
    IField,
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

import _styled from "@emotion/styled"
import { ConnectToForm } from "@undermuz/use-form"

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

const UiDeepBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return (
        <Flex direction={"column"} borderWidth={"1px"} shadow="md" p={3}>
            {children}
        </Flex>
    )
}

const UiSecondaryBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children, level } = props

    if (level > 2) {
        return <UiDeepBody {...props} />
    }

    return (
        <Flex direction={"column"} p={0}>
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
    const { title, level, primary, children } = props

    const pads = useMemo(() => {
        if (primary) {
            return 3
        }

        if (level <= 2) {
            return 0
        }

        return 2
    }, [primary, level])

    if (!title && !children) {
        return null
    }

    return (
        <Flex
            width={"100%"}
            direction="column"
            p={pads}
            pb={2}
            justify="between"
            // background={primary ? "teal.300" : "gray.100"}
        >
            {Boolean(title) && (
                <Flex direction="row" justify="space-between" gap="small">
                    <Heading
                        as={primary ? `h3` : `h4`}
                        size={primary ? `lg` : `md`}
                        margin="none"
                    >
                        {title}
                    </Heading>
                </Flex>
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
        <VStack
            align={"stretch"}
            spacing={"15px"}
            style={{ display: isShow ? undefined : "none" }}
        >
            {children}
        </VStack>
    )
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

const UiItemWrapper: FC<PropsWithChildren<IItem>> = (props) => {
    const { type, children } = props

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
        <Flex direction={"row"}>
            <Flex
                width={"100%"}
                py={showLabel ? 0 : 2}
                direction={"column"}
                justify="center"
            >
                {children}
            </Flex>
        </Flex>
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
        (e) => {
            onChange?.(!e.target.checked)
        },
        [onChange]
    )

    return (
        <Switch
            pos={"absolute"}
            right={0}
            top={0}
            onChange={onChangeHandler}
            isChecked={!value}
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
        showLabel: _showLabel,
    } = props

    const showLabel = useMemo(() => {
        if (typeof _showLabel === "boolean") {
            return _showLabel
        }

        if (type === EnumSchemeItemType.Checkbox) {
            return false
        }

        if (type === EnumSchemeItemType.Widget) {
            return false
        }

        return true
    }, [type, _showLabel])

    const isError = errors?.length > 0

    return (
        <FormControl isInvalid={isError} as={Flex} flexDir={"column"}>
            {showLabel && <FormLabel htmlFor={id}>{title}</FormLabel>}

            {children}

            {showToggle && (
                <ConnectToForm name={`${name}__isDisabled`}>
                    <UiFieldSwitch />
                </ConnectToForm>
            )}

            {description !== null && !isError && (
                <FormHelperText>{description}</FormHelperText>
            )}

            {errors?.map((errorText, index) => {
                if (typeof errorText !== "string") {
                    return null
                }

                return (
                    <FormErrorMessage key={index}>{errorText}</FormErrorMessage>
                )
            })}
        </FormControl>
    )
}

const Tab = styled(Button)<IUiTabProps>`
    user-select: none;
`

const UiTab: ForwardRefExoticComponent<
    Omit<PropsWithChildren<IUiTabProps>, "ref"> &
        RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    ({ active, ...props }, ref) => {
        return (
            <Tab
                {...props}
                variant={active ? undefined : "ghost"}
                colorScheme="gray"
                onClick={props.onSelect}
                ref={ref as ForwardedRef<HTMLButtonElement>}
            >
                {Boolean(props.label) && <>{props.label}</>}
                {props.children}
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
        <Flex direction="row" justify={"space-between"} mb={3}>
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

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props
) => {
    return (
        <Stack direction="row" spacing={2} align="center">
            {props.children}
        </Stack>
    )
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

export default ChakraUi
