import type {
    ChangeEvent,
    CSSProperties,
    FC,
    ForwardRefExoticComponent,
    LegacyRef,
    PropsWithChildren,
    RefAttributes,
} from "react";
import { forwardRef, useCallback, useMemo } from "react";

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
    return <div className="rjf rjf-root">{children}</div>;
};

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children, primary, level } = props;

    const bodyClass = useMemo(() => {
        if (primary) {
            return "rjf-body rjf-body--primary";
        }

        if (level > 2) {
            return "rjf-body rjf-body--nested";
        }

        return "rjf-body";
    }, [primary, level]);

    return <div className={bodyClass}>{children}</div>;
};

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { title, level, primary, children } = props;

    const headerClass = useMemo(() => {
        if (primary) {
            return "rjf-header rjf-header--primary";
        }

        if (level <= 2) {
            return "rjf-header rjf-header--section";
        }

        return "rjf-header rjf-header--nested";
    }, [primary, level]);

    if (!title && !children) {
        return null;
    }

    return (
        <div className={headerClass}>
            {Boolean(title) && <h3 className="rjf-header__title">{title}</h3>}
            {children}
        </div>
    );
};

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    children,
    isShow,
}) => {
    return (
        <div
            className="rjf-flat-form"
            style={{ display: isShow ? undefined : "none" }}
        >
            {children}
        </div>
    );
};

const UiItemWrapper: FC<PropsWithChildren<IItem>> = (props) => {
    const { children, type } = props;

    const compact = useMemo(() => {
        return (
            type === EnumSchemeItemType.Checkbox ||
            type === EnumSchemeItemType.Widget
        );
    }, [type]);

    if (type === EnumSchemeItemType.Widget) {
        return <div className="rjf-section">{children}</div>;
    }

    return (
        <div className={`rjf-item${compact ? " rjf-item--compact" : ""}`}>
            {children}
        </div>
    );
};

const UiItem: FC<PropsWithChildren<IItem>> = (props) => {
    const { title, type, ...other } = props;

    return (
        <>
            {type === EnumSchemeItemType.Submit && (
                <button
                    {...other}
                    type="submit"
                    className="rjf-button rjf-button--submit"
                >
                    {title}
                </button>
            )}
        </>
    );
};

const UiFieldSwitch: FC<Omit<IInput, "type" | "title" | "settings">> = ({
    value = false,
    onChange,
}) => {
    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange?.(!event.target.checked);
        },
        [onChange],
    );

    return (
        <label className="rjf-field-switch">
            <input
                type="checkbox"
                checked={!value}
                onChange={onChangeHandler}
            />
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

    const label = showLabel ? (
        <label className="rjf-field__label" htmlFor={id}>
            {title}
        </label>
    ) : null;

    const toggle = showToggle ? (
        <ConnectToForm name={`${name}__isDisabled`}>
            <UiFieldSwitch />
        </ConnectToForm>
    ) : null;

    const fieldClass = [
        "rjf-field",
        isError ? "rjf-field--error" : "",
        isLast ? "rjf-field--last" : "",
        showToggle ? "rjf-field--toggle" : "",
        type === EnumSchemeItemType.Widget ? "rjf-field--widget" : "",
    ]
        .filter(Boolean)
        .join(" ");

    if (type === EnumSchemeItemType.Widget) {
        return (
            <div className={fieldClass}>
                {(showLabel || showToggle) && (
                    <div className="rjf-panel__header">
                        {!showToggle && showLabel && label}
                        {showToggle && !showLabel && toggle}
                        {showToggle && showLabel && (
                            <div className="rjf-field__head">
                                {label}
                                {toggle}
                            </div>
                        )}
                    </div>
                )}

                {/* <div className="rjf-panel rjf-panel--widget"> */}
                {/* <div className="rjf-panel__body"> */}
                {children}
                {/* </div> */}
                {/* </div> */}

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
    }

    return (
        <div className={fieldClass}>
            {!showToggle && showLabel && label}
            {showToggle && !showLabel && toggle}

            {showToggle && showLabel && (
                <div className="rjf-field__head">
                    {label}
                    {toggle}
                </div>
            )}

            <div className="rjf-field__control">{children}</div>

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
            className="rjf-panel rjf-panel--array"
            style={props.style as CSSProperties | undefined}
        >
            {props.children}
        </div>
    );
};

const UiArrayFormHeader: FC<PropsWithChildren> = (props) => {
    return (
        <div className="rjf-panel__header rjf-panel__header--array">
            {props.children}
        </div>
    );
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
    return <div className="rjf-panel__body">{props.children}</div>;
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
