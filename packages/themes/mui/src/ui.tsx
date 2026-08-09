import type { CSSProperties, FC, PropsWithChildren } from "react"
import { forwardRef, useCallback, useMemo } from "react"

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    Switch,
    Typography,
} from "@mui/material"

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
    <Stack spacing={1} sx={{ width: "100%" }}>
        {children}
    </Stack>
)

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children, primary, level } = props

    if (primary) {
        return (
            <Stack spacing={2} sx={{ p: 2, width: "100%" }}>
                {children}
            </Stack>
        )
    }

    if (level > 2) {
        return (
            <Stack
                spacing={1.5}
                sx={{
                    p: 1.5,
                    width: "100%",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                }}
            >
                {children}
            </Stack>
        )
    }

    return (
        <Stack spacing={1.5} sx={{ width: "100%" }}>
            {children}
        </Stack>
    )
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { title, level, primary, children } = props

    const pads = useMemo(() => {
        if (primary) return 1.5
        if (level <= 2) return 0
        return 1
    }, [primary, level])

    if (!title && !children) {
        return null
    }

    return (
        <Stack spacing={1} sx={{ width: "100%", p: pads, pb: 1 }}>
            {Boolean(title) && (
                <Typography variant={primary ? "h6" : "subtitle1"}>
                    {title}
                </Typography>
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
        spacing={2}
        sx={{ width: "100%", display: isShow ? undefined : "none" }}
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
        <Box sx={{ width: "100%", minWidth: 0, py: showLabel ? 0 : 1 }}>
            {children}
        </Box>
    )
}

const UiItem: FC<PropsWithChildren<IItem>> = (props) => {
    const { title, type, ...other } = props

    return (
        <>
            {type === EnumSchemeItemType.Submit && (
                <Button {...other} type="submit" variant="contained">
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
            onChange={(event) => onChangeHandler(event.target.checked)}
            size="small"
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
        <FormControl
            fullWidth
            error={isError}
            sx={{ width: "100%", minWidth: 0 }}
        >
            {(showLabel || showToggle) && (
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                        width: "100%",
                    }}
                >
                    {showLabel ? (
                        <FormLabel htmlFor={id} sx={{ m: 0 }}>
                            {title}
                        </FormLabel>
                    ) : (
                        <span />
                    )}
                    {toggle}
                </Stack>
            )}

            {children}

            {!isError && description != null && (
                <FormHelperText>{description}</FormHelperText>
            )}

            {errorText && <FormHelperText error>{errorText}</FormHelperText>}
        </FormControl>
    )
}

const UiTab = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        const { label, active, onSelect, children, style } = props

        return (
            <Button
                ref={ref}
                variant={active ? "contained" : "outlined"}
                size="small"
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
    <Stack spacing={1.5} sx={{ p: 1.5, width: "100%", ...props.style }}>
        {props.children}
    </Stack>
)

const UiArrayFormHeader: FC<PropsWithChildren<object>> = (props) => (
    <Stack
        direction="row"
        sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
        }}
    >
        {props.children}
    </Stack>
)

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => (
    <Box
        ref={ref}
        sx={{
            p: 0.5,
            position: "absolute",
            zIndex: 2,
            top: -30,
            left: 0,
            width: "100%",
            border: "2px dashed",
            borderColor: props.isOver ? "error.main" : "divider",
            bgcolor: props.isOver ? "error.light" : "action.hover",
            borderRadius: 1,
        }}
    >
        {Boolean(props?.label) && (
            <Typography variant="body2">{props?.label}</Typography>
        )}
        {props.children}
    </Box>
))

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props
) => (
    <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", flexWrap: "wrap" }}
    >
        {props.children}
    </Stack>
)

const UiArrayFormBody: FC<PropsWithChildren<object>> = (props) => (
    <Stack spacing={1.5} sx={{ width: "100%" }}>
        {props.children}
    </Stack>
)

const MuiUi: Omit<JsonFormUi, "Controls" | "Icons"> = {
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

export default MuiUi
