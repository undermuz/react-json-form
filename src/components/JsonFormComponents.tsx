import { FC, PropsWithChildren } from "react"
import { IJsonFormProps } from "../types"
import { useJsonFormUi } from "../UiContext"

const JsonFormComponent: FC<PropsWithChildren<IJsonFormProps>> = (props) => {
    const {
        id,
        title,
        header = null,
        multiple = false,
        primary = true,
        children,
    } = props

    const Ui = useJsonFormUi()

    return (
        <Ui.Container>
            <Ui.Header id={id} primary={primary} title={title}>
                {header}
            </Ui.Header>

            <Ui.Body primary={primary} multiple={multiple}>
                {children}
            </Ui.Body>
        </Ui.Container>
    )
}

export { JsonFormComponent}
