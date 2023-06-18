import type { FC, PropsWithChildren } from "react"
import { EnumSchemeItemType, type ISchemeItem } from "./types"

import { useJsonFormUi } from "./UiContext"
import type { IChildFormsSetRef } from "./FlatForm"

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

    const { as: Cmp = Ui.Item, isFormPrimary, isLast, type, title } = props

    return (
        <Ui.ItemWrapper
            isLast={isLast || false}
            type={type || EnumSchemeItemType.Submit}
            primary={isFormPrimary}
            title={title}
        >
            <Cmp {...props} primary={isFormPrimary}>
                {children}
            </Cmp>
        </Ui.ItemWrapper>
    )
}

export default FormItem
