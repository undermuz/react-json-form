import { FC, PropsWithChildren } from "react"
import { Panel } from "rsuite"
import styled from "styled-components"
import { IJsonFormProps } from "../../types"
import { useJsonFormUi } from "../../UiContext"

const UiHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const JsonFormComponent: FC<PropsWithChildren<IJsonFormProps>> = (props) => {
    const { title, header = null, primary = true, children } = props

    const Ui = useJsonFormUi()

    return (
        <Ui.Container>
            <Panel
                header={
                    <UiHeader>
                        {title}
                        {header}
                    </UiHeader>
                }
                shaded={!primary}
            >
                {children}
            </Panel>
        </Ui.Container>
    )
}

export { JsonFormComponent }
