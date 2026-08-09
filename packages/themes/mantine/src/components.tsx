import type { FC, PropsWithChildren } from "react"
import { Group, Paper, Title } from "@mantine/core"
import type { IJsonFormProps } from "@undermuz/react-json-form"
import { useJsonFormUi } from "@undermuz/react-json-form"

const JsonFormComponent = ((props: PropsWithChildren<IJsonFormProps>) => {
    const { title, header = null, primary = true, children } = props

    const Ui = useJsonFormUi()

    const card = (
        <Paper
            withBorder={primary}
            p={primary ? "md" : "sm"}
            radius="md"
            w="100%"
        >
            {(title || header) && (
                <Group justify="space-between" mb="sm" wrap="nowrap">
                    {title ? (
                        <Title order={primary ? 3 : 4}>{title}</Title>
                    ) : (
                        <span />
                    )}
                    {header}
                </Group>
            )}
            {children}
        </Paper>
    )

    if (!Ui?.Container) {
        return card
    }

    return <Ui.Container>{card}</Ui.Container>
}) as FC<PropsWithChildren<IJsonFormProps>>

export { JsonFormComponent }
