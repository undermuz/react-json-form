import type { FC, PropsWithChildren } from "react"
import type { IJsonFormProps } from "../types"
import { useJsonFormUi } from "../contexts/ui"

const JsonFormComponent: FC<PropsWithChildren<IJsonFormProps>> = (props) => {
    const {
        id,
        title,
        level = 1,
        header = null,
        multiple = false,
        primary = true,
        children,
    } = props

    const Ui = useJsonFormUi()

    if (!Ui?.Container || !Ui?.Header || !Ui?.Body) {
        return (
            <>
                {header}
                {children}
            </>
        )
    }

    return (
        <Ui.Container>
            <Ui.Header id={id} primary={primary} level={level} title={title}>
                {header}
            </Ui.Header>

            <Ui.Body primary={primary} level={level} multiple={multiple}>
                {children}
            </Ui.Body>
        </Ui.Container>
    )
}

export { JsonFormComponent }
