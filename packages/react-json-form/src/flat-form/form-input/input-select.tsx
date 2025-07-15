import type { FC } from "react"
import type { IInput } from "./input"

import { useMemo } from "react"
import { useJsonFormUi } from "../../contexts/ui"
import { useJsonFormApi } from "../../contexts/api"
import { type IConnectedProps } from "@undermuz/use-form"

const InputAsyncSelect: FC<IInput & IConnectedProps & { apiName: string }> = (
    props
) => {
    const Ui = useJsonFormUi()

    if (!Ui?.Controls?.Select) {
        console.error("No Ui.Controls.Select provided")

        return null
    }

    const api = useJsonFormApi(props.apiName)

    const settings = useMemo(() => {
        const _s = props.settings

        return {
            ..._s,
            options: api,
        }
    }, [props.settings, api])

    return <Ui.Controls.Select {...props} settings={settings} />
}

export const InputSelect: FC<IInput & IConnectedProps> = (props) => {
    const Ui = useJsonFormUi()

    if (!Ui?.Controls?.Select) {
        console.error("No Ui.Controls.Select provided")

        return null
    }

    if (props?.settings?.useApi) {
        return (
            <InputAsyncSelect
                {...props}
                apiName={props.settings.useApi as string}
            />
        )
    }

    return <Ui.Controls.Select {...props} />
}
