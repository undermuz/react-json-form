import type { FC, ForwardedRef, PropsWithChildren } from "react"
import { forwardRef, useMemo } from "react"
import styled from "styled-components"

import type {
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

import { Button, Form, Nav } from "rsuite"

const UiContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
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
                errors.map((errorText, index) => {
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
    return <div style={props.style}>{props.children}</div>
}

const UiArrayFormHeader: FC<PropsWithChildren<{}>> = (props) => {
    return <div>{props.children}</div>
}

const TrashContainer = styled.div`
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
        <TrashContainer ref={ref}>
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

const UiArrayFormBody: FC<PropsWithChildren<{}>> = (props) => {
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
