import type { FC, PropsWithChildren } from "react"
import { EnumSchemeItemType, type ISchemeItem } from "../types"

import { useJsonFormUi } from "../contexts/ui"
import type { IChildFormsSetRef } from "./useFlatRef"
import { JFL_Nothing } from "../components/JsonFormLayout"

export type IFormItemProps = ISchemeItem & {
    isLast?: boolean
    isLoading?: boolean
    isFormPrimary: boolean
    level: number
    as?: any
    onFormsRef?: IChildFormsSetRef
}

const FormItem: FC<PropsWithChildren & IFormItemProps> = ({
    children,
    ...props
}) => {
    const Ui = useJsonFormUi()

    const Item = Ui?.Item ? Ui.Item : JFL_Nothing

    const { as: Cmp = Item, isFormPrimary, isLast, type, title } = props

    const body = (
        <Cmp {...props} primary={isFormPrimary}>
            {children}
        </Cmp>
    )

    if (!Ui?.ItemWrapper) {
        return body
    }

    return (
        <Ui.ItemWrapper
            isLast={isLast || false}
            type={type || EnumSchemeItemType.Submit}
            primary={isFormPrimary}
            title={title}
        >
            {body}
        </Ui.ItemWrapper>
    )
}

export default FormItem
