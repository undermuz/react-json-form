/*SYSTEM IMPORTS*/
import type React from "react"
import type { FC } from "react"
import { useEffect } from "react"

/* HELPERS */
import type { FieldTests, ISchemeItem, TypeValueItem } from "./types"
import { EnumSchemeItemType } from "./types"
import { getDefValueForItem, useSchemeToForm } from "./utils"

import { useJsonFormUi } from "./UiContext"
import type { IErrors, IValues } from "@undermuz/use-form"
import useForm, { useFormContext, FormContext } from "@undermuz/use-form"
import FormField from "./FormField"

interface IFlatForm {
    primary?: boolean
    scheme: ISchemeItem[]
    value: TypeValueItem
    tests?: FieldTests
    onChange: (v: IValues) => void
    onError: (v: IErrors) => void
}

const FlatFormFields: FC<{ scheme: ISchemeItem[]; isFormPrimary: boolean }> = ({
    scheme,
    isFormPrimary,
}) => {
    const form = useFormContext()
    const Ui = useJsonFormUi()

    return (
        <Ui.FlatForm primary={isFormPrimary}>
            {scheme.map((schemeItem, index) => {
                const { name } = schemeItem

                return (
                    <FormField
                        {...schemeItem}
                        key={index}
                        isFormPrimary={isFormPrimary}
                        isLast={index === scheme.length - 1}
                        errors={form.errors[name]}
                    />
                )
            })}
        </Ui.FlatForm>
    )
}

const FlatForm: React.FC<IFlatForm> = (props) => {
    const { scheme, value, primary = false, tests, onChange, onError } = props

    const formConfig = useSchemeToForm({
        scheme,
        value,
        tests,
        onChange,
        onError,
    })

    const form = useForm(formConfig)

    /* Set default values */
    useEffect(() => {
        const new_value: TypeValueItem = {}

        for (const schemeItem of scheme) {
            const { name, type = EnumSchemeItemType.Text } = schemeItem

            const def_value = getDefValueForItem(schemeItem)

            if (value[name] || type === EnumSchemeItemType.Checkbox) {
                continue
            }

            new_value[name] = def_value
        }

        onChange({ ...value, ...new_value })
    }, [])

    return (
        <FormContext.Provider value={form}>
            <FlatFormFields scheme={scheme} isFormPrimary={primary} />
        </FormContext.Provider>
    )
}

export default FlatForm
