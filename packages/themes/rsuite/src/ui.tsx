import type { FC, ForwardedRef, PropsWithChildren } from "react"
import { forwardRef, useCallback, useMemo } from "react"
import styled from "styled-components"

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

import { Button, Form, Nav, Toggle } from "rsuite"

const UiContainer: FC<PropsWithChildren<object>> = ({ children }) => {
    return <div>{children}</div>
}

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return <div>{children}</div>
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { id, title, children } = props

    return (
        <div>
            <div>
                {Boolean(title) && <h2>{title}</h2>}

                {Boolean(id) && <span>{`#${id}`}</span>}
            </div>

            {children}
        </div>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    primary = false,
    isShow,
    children,
}) => {
    const style = { display: isShow ? undefined : "none" }

    if (primary) {
        return <Form style={style}>{children}</Form>
    }

    return (
        <div
            className="rs-form rs-form-vertical rs-form-fixed-width"
            style={style}
        >
            {children}
        </div>
    )
}

const UiItemWrapper: FC<PropsWithChildren<IItem>> = ({ children }) => {
    return <>{children}</>
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

    return <Toggle checked={!value} onChange={onChangeHandler} />
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

        if (type === EnumSchemeItemType.Checkbox) {
            return false
        }

        return true
    }, [type, rawShowLabel])

    const isError = Boolean(errors?.length)

    const label = showLabel ? (
        <Form.ControlLabel htmlFor={id}>{title}</Form.ControlLabel>
    ) : null

    const toggle = showToggle ? (
        <ConnectToForm name={`${name}__isDisabled`}>
            <UiFieldSwitch />
        </ConnectToForm>
    ) : null

    return (
        <Form.Group controlId={name}>
            {!showToggle && showLabel && label}
            {showToggle && !showLabel && toggle}
            {showToggle && showLabel && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {label}
                    {toggle}
                </div>
            )}

            {children}

            {description !== null && !isError && (
                <Form.HelpText>{description}</Form.HelpText>
            )}

            {errors?.map((errorText, index) => {
                if (typeof errorText !== "string") {
                    return null
                }

                return (
                    <div key={index} style={{ color: "red" }}>
                        {errorText}
                    </div>
                )
            })}
        </Form.Group>
    )
}

const UiTab = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        const { label, active, onSelect, children, style } = props

        return (
            <Nav.Item
                active={active}
                onSelect={onSelect}
                style={style}
                ref={ref as ForwardedRef<HTMLAnchorElement>}
            >
                {Boolean(label) && label}
                {children}
            </Nav.Item>
        )
    }
)

UiTab.displayName = "UiTab"

const UiArrayFormContainer: FC<PropsWithChildren<IUiArrayFormProps>> = (
    props
) => {
    return <div style={props.style}>{props.children}</div>
}

const UiArrayFormHeader: FC<PropsWithChildren<object>> = (props) => {
    return <div>{props.children}</div>
}

const TrashContainer = styled.div<{ $isOver?: boolean }>`
    position: absolute;
    z-index: 2;
    top: -30px;
    left: 0px;
    width: 100%;
    border: 2px dashed ${(props) => (props.$isOver ? "#f44336" : "#ccc")};
    background: ${(props) => (props.$isOver ? "#ffcdd2" : "#f5f5f5")};
    padding: 4px;
`

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => {
    return (
        <TrashContainer ref={ref} $isOver={props.isOver}>
            {Boolean(props?.label) && <span>{props?.label}</span>}
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

const UiArrayFormBody: FC<PropsWithChildren<object>> = (props) => {
    return <div>{props.children}</div>
}

const RsuiteUi: Omit<JsonFormUi, "Controls" | "Icons"> = {
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

export default RsuiteUi
