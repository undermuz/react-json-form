import type { FC } from "react"
import type { IInput } from "./input"

import { useMemo } from "react"
import { useJsonFormUi } from "../../contexts/ui"
import { useJsonFormApi } from "../../contexts/api"

const InputAsyncSelect: FC<IInput & { apiName: string }> = (props) => {
    const Ui = useJsonFormUi()

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

export const InputSelect: FC<IInput> = (props) => {
    const Ui = useJsonFormUi()

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
