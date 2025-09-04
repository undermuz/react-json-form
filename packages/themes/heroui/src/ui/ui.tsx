import type { FC, PropsWithChildren } from "react"

import { useMemo } from "react"

import type {
    IItem,
    IUiBodyProps,
    IUiFlatFormProps,
    IUiHeaderProps,
    JsonFormUi,
} from "@undermuz/react-json-form"
import { EnumSchemeItemType } from "@undermuz/react-json-form"

import { Button } from "@heroui/react"
import { UIArrayForm, UiTab } from "./array-forms"
import { UiField } from "./field"

const UiContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
    return <div className="flex flex-col">{children}</div>
}

const UiPrimaryBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return <div className="flex flex-col p-4">{children}</div>
}

const UiDeepBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children } = props

    return <div className="flex flex-col p-3">{children}</div>
}

const UiSecondaryBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { children, level } = props

    if (level > 2) {
        return <UiDeepBody {...props} />
    }

    return <div className="flex flex-col p-0">{children}</div>
}

const UiBody: FC<PropsWithChildren<IUiBodyProps>> = (props) => {
    const { primary } = props

    if (primary) return <UiPrimaryBody {...props} />

    return <UiSecondaryBody {...props} />
}

const UiHeader: FC<PropsWithChildren<IUiHeaderProps>> = (props) => {
    const { title, primary, children } = props

    if (!title && !children) {
        return null
    }

    const Heading = primary ? `h3` : `h4`

    return (
        <div className="flex flex-col p-4 w-full pb-2 justify-between">
            {Boolean(title) && (
                <div className="flex flex-row justify-between gap-2">
                    <Heading className={primary ? "text-large" : "text-md"}>
                        {title}
                    </Heading>
                </div>
            )}

            {children}
        </div>
    )
}

const UiFlatFormContainer: FC<PropsWithChildren<IUiFlatFormProps>> = ({
    children,
    isShow,
}) => {
    return (
        <div
            className={
                "flex flex-col items-stretch gap-3" + (isShow ? "" : " hidden")
            }
        >
            {children}
        </div>
    )
}

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
        <div className="flex flex-row">
            <div
                className={
                    "flex flex-col w-full justify-center" +
                    (showLabel ? "" : " py-2")
                }
            >
                {children}
            </div>
        </div>
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

const HeroUi: Omit<JsonFormUi, "Controls" | "Icons"> = {
    Container: UiContainer,
    Header: UiHeader,
    Body: UiBody,
    FlatForm: UiFlatFormContainer,
    Field: UiField,
    Item: UiItem,
    ItemWrapper: UiItemWrapper,
    ArrayForm: UIArrayForm,
    Tab: UiTab,
}

export default HeroUi
