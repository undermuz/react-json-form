import type { FC, PropsWithChildren } from "react"
import { Box, Card, CardContent, CardHeader, Stack } from "@mui/material"
import type { IJsonFormProps } from "@undermuz/react-json-form"
import { useJsonFormUi } from "@undermuz/react-json-form"

const JsonFormComponent: FC<PropsWithChildren<IJsonFormProps>> = (props) => {
    const { title, header = null, primary = true, children } = props

    const Ui = useJsonFormUi()

    const card = (
        <Card
            variant={primary ? "outlined" : "elevation"}
            elevation={primary ? 0 : 0}
            sx={{ width: "100%" }}
        >
            {(title || header) && (
                <CardHeader
                    title={title}
                    action={header ? <Box>{header}</Box> : undefined}
                    titleTypographyProps={{
                        variant: primary ? "h6" : "subtitle1",
                    }}
                    sx={{ pb: 0 }}
                />
            )}
            <CardContent>
                <Stack spacing={2} sx={{ width: "100%" }}>
                    {children}
                </Stack>
            </CardContent>
        </Card>
    )

    if (!Ui?.Container) {
        return card
    }

    return <Ui.Container>{card}</Ui.Container>
}

export { JsonFormComponent }
