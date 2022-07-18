import { FC, PropsWithChildren } from "react"
import { Panel } from "rsuite"
import { IJsonFormProps } from "../../types"
import { useJsonFormUi } from "../../UiContext"

const JsonFormComponent: FC<PropsWithChildren<IJsonFormProps>> = (props) => {
    const {
        title,
        header = null,
        primary = true,
        children,
    } = props

    const Ui = useJsonFormUi()

    return (
        <Ui.Container>
            <Panel
                header={
                    <>
                        {title}
                        {header}
                    </>
                }
                shaded={!primary}
            >
                {children}
            </Panel>
        </Ui.Container>
    )
}

export { JsonFormComponent }
