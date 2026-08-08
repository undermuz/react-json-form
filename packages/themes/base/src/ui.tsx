import type {
    CSSProperties,
    FC,
    ForwardRefExoticComponent,
    LegacyRef,
    PropsWithChildren,
    RefAttributes,
} from "react";
import { forwardRef, useMemo } from "react";

import { ConnectToForm } from "@undermuz/use-form";
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
} from "@undermuz/react-json-form";
import { EnumSchemeItemType } from "@undermuz/react-json-form";

const UiContainer: FC<PropsWithChildren> = ({ children }) => {
    return <div className="rjf">{children}</div>;
};

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = ({ children, primary }) => {
    return (
        <div className={`rjf-body${primary ? " rjf-body--primary" : ""}`}>
            {children}
        </div>
    );
};

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { id, title, primary, children } = props;

    if (!title && !children && !id) {
        return null;
    }

    return (
        <div className={`rjf-header${primary ? " rjf-header--primary" : ""}`}>
            <div className="rjf-header__main">
                {Boolean(title) && (
                    <h3 className="rjf-header__title">{title}</h3>
                )}
                {Boolean(id) && <span className="rjf-header__id">#{id}</span>}
            </div>
            {children}
        </div>
    );
};

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    children,
}) => {
    return <div className="rjf-flat-form">{children}</div>;
};

const UiItemWrapper: FC<PropsWithChildren<IItem>> = ({ children, isLast }) => {
    return (
        <div
            className={`rjf-item-wrapper${isLast ? " rjf-item-wrapper--last" : ""}`}
        >
            {children}
        </div>
    );
};

const UiItem: FC<PropsWithChildren<IItem>> = (props) => {
    const { title, type, ...other } = props;

    if (type !== EnumSchemeItemType.Submit) {
        return null;
    }

    return (
        <button
            {...other}
            type="submit"
            className="rjf-button rjf-button--submit"
        >
            {title}
        </button>
    );
};

const UiFieldSwitch: FC<Omit<IInput, "type" | "title" | "settings">> = ({
    value,
    onChange,
}) => {
    return (
        <label className="rjf-field-switch">
            <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(event) => onChange?.(event.target.checked)}
            />
            <span>Disabled</span>
        </label>
    );
};

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
        isLast,
    } = props;

    const showLabel = useMemo(() => {
        if (typeof rawShowLabel === "boolean") {
            return rawShowLabel;
        }

        if (type === EnumSchemeItemType.Checkbox) {
            return false;
        }

        return true;
    }, [type, rawShowLabel]);

    const isError = Boolean(errors?.length);

    return (
        <div
            className={`rjf-field${isError ? " rjf-field--error" : ""}${isLast ? " rjf-field--last" : ""}`}
        >
            {showLabel && (
                <label className="rjf-field__label" htmlFor={id}>
                    {title}
                </label>
            )}

            <div className="rjf-field__control">{children}</div>

            {showToggle && (
                <ConnectToForm name={`${name}__isDisabled`}>
                    <UiFieldSwitch />
                </ConnectToForm>
            )}

            {description !== null && !isError && (
                <p className="rjf-field__description">{description}</p>
            )}

            {errors?.map((errorText, index) => {
                if (typeof errorText !== "string") {
                    return null;
                }

                return (
                    <p key={index} className="rjf-field__error">
                        {errorText}
                    </p>
                );
            })}
        </div>
    );
};

const UiTab: ForwardRefExoticComponent<
    Omit<PropsWithChildren<IUiTabProps>, "ref"> &
        RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    (props, ref) => {
        const { label, active, onSelect, children, style } = props;

        return (
            <button
                ref={ref as LegacyRef<HTMLButtonElement> | undefined}
                type="button"
                className={`rjf-tab${active ? " rjf-tab--active" : ""}`}
                style={style as CSSProperties | undefined}
                onClick={onSelect}
            >
                {Boolean(label) && <span>{label}</span>}
                {children}
            </button>
        );
    },
);

UiTab.displayName = "UiTab";

const UiArrayFormContainer: FC<PropsWithChildren<IUiArrayFormProps>> = (
    props,
) => {
    return (
        <div
            className="rjf-array-form"
            style={props.style as CSSProperties | undefined}
        >
            {props.children}
        </div>
    );
};

const UiArrayFormHeader: FC<PropsWithChildren> = (props) => {
    return <div className="rjf-array-form__header">{props.children}</div>;
};

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => {
    return (
        <div
            ref={ref as LegacyRef<HTMLDivElement> | undefined}
            className={`rjf-trash${props.isOver ? " rjf-trash--over" : ""}`}
        >
            {Boolean(props?.label) && (
                <span className="rjf-trash__label">{props.label}</span>
            )}
            {props.children}
        </div>
    );
});

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer";

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props,
) => {
    return (
        <div className={`rjf-tabs${props.actions ? " rjf-tabs--actions" : ""}`}>
            {props.children}
        </div>
    );
};

const UiArrayFormBody: FC<PropsWithChildren> = (props) => {
    return <div className="rjf-array-form__body">{props.children}</div>;
};

const BaseUi = {
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
};

export default BaseUi;
