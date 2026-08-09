import type { FC, PropsWithChildren } from "react"
import { Card, Flex } from "antd"
import type { IJsonFormProps } from "@undermuz/react-json-form"
import { useJsonFormUi } from "@undermuz/react-json-form"

const JsonFormComponent: FC<PropsWithChildren<IJsonFormProps>> = (props) => {
    const { title, header = null, primary = true, children } = props

    const Ui = useJsonFormUi()

    const card = (
        <Card
            title={
                title || header ? (
                    <Flex justify="space-between" align="center">
                        {title}
                        {header}
                    </Flex>
                ) : undefined
            }
            size={primary ? "default" : "small"}
            variant={primary ? "outlined" : "borderless"}
        >
            {children}
        </Card>
    )

    if (!Ui?.Container) {
        return card
    }

    return <Ui.Container>{card}</Ui.Container>
}

export { JsonFormComponent }
