import type {
    FC,
    ForwardRefExoticComponent,
    LegacyRef,
    PropsWithChildren,
    RefAttributes,
} from "react"
import { forwardRef, useMemo } from "react"

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
} from "../../../src/types"
import { EnumSchemeItemType } from "../../../src/types"

import { ConnectToForm } from "@undermuz/use-form"
import type { IInput } from "../../../src/flat-form/form-input/input"

const UiContainer: FC<PropsWithChildren> = ({ children }) => {
    return <>{children}</>
}

const UiPrimaryBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return <>{children}</>
}

const UiDeepBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return <>{children}</>
}

const UiSecondaryBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children, level } = props

    if (level > 2) {
        return <UiDeepBody {...props} />
    }

    return <>{children}</>
}

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { primary } = props

    if (primary) return <UiPrimaryBody {...props} />

    return <UiSecondaryBody {...props} />
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { title, children } = props

    if (!title && !children) {
        return null
    }

    return (
        <div className="ui-header">
            {Boolean(title) && <h3>{title}</h3>}

            {children}
        </div>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    children,
}) => {
    return <>{children}</>
}

const UiItemWrapper: FC<PropsWithChildren<IItem>> = (props) => {
    const { children } = props

    return <>{children}</>
}

const UiItem: FC<PropsWithChildren<IItem>> = (props) => {
    const { title, type, ...other } = props

    return (
        <>
            {type === EnumSchemeItemType.Submit && (
                <button {...other} type="submit">
                    {title}
                </button>
            )}
        </>
    )
}

const UiFieldSwitch: FC<Omit<IInput, "type" | "title" | "settings">> = () => {
    return null
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
        <div className="ui-field">
            {showLabel && <label htmlFor={id}>{title}</label>}

            {children}

            {showToggle && (
                <ConnectToForm name={`${name}__isDisabled`}>
                    <UiFieldSwitch />
                </ConnectToForm>
            )}

            {description !== null && !isError && <p>{description}</p>}

            {errors?.map((errorText, index) => {
                if (typeof errorText !== "string") {
                    return null
                }

                return <p key={index}>{errorText}</p>
            })}
        </div>
    )
}

const UiTab: ForwardRefExoticComponent<
    Omit<PropsWithChildren<IUiTabProps>, "ref"> &
        RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        return (
            <button
                ref={ref as LegacyRef<HTMLButtonElement> | undefined}
                onClick={props.onSelect}
            >
                {Boolean(props.label) && <>{props.label}</>}
                {props.children}
            </button>
        )
    }
)

UiTab.displayName = "UiTab"

const UiArrayFormContainer: FC<PropsWithChildren<IUiArrayFormProps>> = (
    props
) => {
    return <>{props.children}</>
}

const UiArrayFormHeader: FC<PropsWithChildren> = (props) => {
    return <>{props.children}</>
}

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => {
    return (
        <div ref={ref as LegacyRef<HTMLDivElement> | undefined}>
            {Boolean(props?.label) && <span>{props?.label}</span>}
            {props.children}
        </div>
    )
})

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props
) => {
    return <>{props.children}</>
}

const UiArrayFormBody: FC<PropsWithChildren> = (props) => {
    return <>{props.children}</>
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
