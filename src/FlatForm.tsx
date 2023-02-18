/*SYSTEM IMPORTS*/
import type React from "react"
import { useEffect } from "react"

/* HELPERS */
import type { ISchemeItem, TypeValueItem } from "./types"
import { EnumSchemeItemType } from "./types"
import { getDefValueForItem, useSchemeToForm } from "./utils"
import Input from "./input"
import { useJsonFormUi } from "./UiContext"
import type { IValues } from "@undermuz/use-form"
import useForm, { ConnectToForm, FormContext } from "@undermuz/use-form"

interface IFlatForm {
    primary?: boolean
    scheme: ISchemeItem[]
    value: TypeValueItem
    onChange: (v: IValues) => void
}

const FlatForm: React.FC<IFlatForm> = (props) => {
    const { scheme, value, primary = false, onChange } = props

    const Ui = useJsonFormUi()

    const form = useForm(useSchemeToForm(scheme, value, onChange))

    useEffect(() => {
        const new_value: TypeValueItem = {}

        scheme.forEach((scheme_item) => {
            const { name, type = EnumSchemeItemType.Text } = scheme_item

            const def_value = getDefValueForItem(scheme_item)

            if (!value[name]) {
                if (type === EnumSchemeItemType.Widget) {
                    new_value[name] = def_value
                } else if (type !== EnumSchemeItemType.Checkbox) {
                    new_value[name] = def_value
                }
            }
        })

        console.log("[FlatForm][Set default values]", {
            ...value,
            ...new_value,
        })

        onChange({ ...value, ...new_value })
    }, [])

    return (
        <FormContext.Provider value={form}>
            <Ui.FlatForm primary={primary}>
                {scheme.map((scheme_item, index) => {
                    const {
                        title,
                        name,
                        type = EnumSchemeItemType.Widget,
                        settings = {},
                    } = scheme_item

                    let field_settings = {}

                    if (type == EnumSchemeItemType.Widget) {
                        const { scheme, multiple = false } = scheme_item

                        field_settings = { scheme, multiple }
                    } else if (type == EnumSchemeItemType.Select) {
                        field_settings = settings
                    } else if (type == EnumSchemeItemType.Files) {
                        field_settings = { settings }
                    }

                    return (
                        <Ui.Field
                            key={index}
                            isLast={index === scheme.length - 1}
                            type={type}
                            name={name}
                            primary={primary}
                            title={title}
                            errors={form.errors[name]}
                        >
                            <ConnectToForm name={name}>
                                <Input
                                    type={type}
                                    title={title}
                                    settings={field_settings}
                                />
                            </ConnectToForm>
                        </Ui.Field>
                    )
                })}
            </Ui.FlatForm>
        </FormContext.Provider>
    )
}

export default FlatForm
