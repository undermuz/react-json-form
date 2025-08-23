import {
    forwardRef,
    type ForwardedRef,
    type ComponentProps,
    type FC,
    type ForwardRefExoticComponent,
    type PropsWithChildren,
    type RefAttributes,
} from "react"

import { Button } from "@heroui/react"

import type {
    IUiArrayFormProps,
    IUiArrayFormTabsProps,
    IUiArrayFormTrashContainerProps,
    IUiTabProps,
    JsonFormUi,
} from "@undermuz/react-json-form"

const Tab: FC<ComponentProps<typeof Button>> = (props) => {
    return (
        <Button {...props} className={(props.className || "") + " select-none"}>
            {props.children}
        </Button>
    )
}

export const UiTab: ForwardRefExoticComponent<
    Omit<PropsWithChildren<IUiTabProps>, "ref"> &
        RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, PropsWithChildren<IUiTabProps>>(
    ({ active, ...props }, ref) => {
        return (
            <Tab
                {...props}
                variant={active ? undefined : "ghost"}
                colorScheme="gray"
                onPress={props.onSelect}
                ref={ref as ForwardedRef<HTMLButtonElement>}
            >
                {Boolean(props.label) && <>{props.label}</>}
                {props.children}
            </Tab>
        )
    },
)

UiTab.displayName = "UiTab"

const UiArrayFormContainer: FC<PropsWithChildren<IUiArrayFormProps>> = (
    props,
) => {
    return (
        <div className="flex flex-col p-3" style={props.style}>
            {props.children}
        </div>
    )
}

const UiArrayFormHeader: FC<PropsWithChildren<{}>> = (props) => {
    return (
        <div className="flex flex-row justify-between mb-3">
            {props.children}
        </div>
    )
}

const TrashContainer: FC<ComponentProps<"div">> = (props) => {
    return (
        <div
            {...props}
            className={
                (props.className || "") + " absolute z-2 -top-30 left-0 w-full"
            }
        >
            {props.children}
        </div>
    )
}

const UiArrayFormTrashContainer = forwardRef<
    HTMLDivElement,
    PropsWithChildren<IUiArrayFormTrashContainerProps>
>((props, ref) => {
    return (
        <TrashContainer
            ref={ref}
            className={
                "p-1 border-2 border-red-200 border-dashed" +
                (props.isOver ? " bg-red-200" : " bg-gray-100")
            }
        >
            {Boolean(props?.label) && <span>{props?.label}</span>}

            {props.children}
        </TrashContainer>
    )
})

UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer"

const UiArrayFormTabs: FC<PropsWithChildren<IUiArrayFormTabsProps>> = (
    props,
) => {
    return (
        <div className="flex flex-row gap-2 items-center">{props.children}</div>
    )
}

const UiArrayFormBody: FC<PropsWithChildren<{}>> = (props) => {
    return <div className="flex flex-col">{props.children}</div>
}

export const UIArrayForm: JsonFormUi["ArrayForm"] = Object.assign(
    UiArrayFormContainer,
    {
        Header: UiArrayFormHeader,
        Tabs: UiArrayFormTabs,
        Body: UiArrayFormBody,
        TrashContainer: UiArrayFormTrashContainer,
    },
)
