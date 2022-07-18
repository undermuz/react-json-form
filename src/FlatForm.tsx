/*SYSTEM IMPORTS*/
import React, { useCallback, useEffect, useState } from "react"

/* HELPERS */
import { EnumSchemeItemType, ISchemeItem, TypeValueItem } from "./types"
import { isArray } from "underscore"
import { getDefValueForItem } from "./utils"
import Input from "./input"
import { useJsonFormUi } from "./UiContext"

export interface IFieldWidgetSettings {
    scheme: ISchemeItem[]
    multiple: boolean
}

interface IFlatForm {
    primary?: boolean
    scheme: ISchemeItem[]
    value: TypeValueItem
    onChange: Function
}

const FlatForm: React.FC<IFlatForm> = (props) => {
    const { scheme, value, primary = false, onChange } = props

    const Ui = useJsonFormUi()

    const [errors, setErrors] = useState<string[]>([])

    const setError = useCallback(
        (name: string, value: any, error: boolean = true) => {
            if (error && errors.indexOf(name) === -1) {
                setErrors([...errors, name])
            }

            if (!error && errors.indexOf(name) > -1) {
                setErrors(errors.filter((item) => item != name))
            }
        },
        []
    )

    const handleTestField = (name: string, value: any) => {
        const last_error = errors.indexOf(name) > -1

        const field = scheme.find((item) => item.name == name)

        if (!field) {
            throw new Error(`Field not found: ${name}`)
        }

        const { is_require = false, type = "text" } = field

        let check_value = (_v: any) => Boolean(_v)

        if (type == "files") {
            check_value = (_val) =>
                Boolean(_val) && isArray(_val) && _val.length > 0
        }

        if (
            is_require &&
            type !== "checkbox" &&
            !check_value(value) &&
            !last_error
        ) {
            setError(name, value, true)
        }

        if (
            is_require &&
            type !== "checkbox" &&
            check_value(value) &&
            last_error
        ) {
            setError(name, value, false)
        }
    }

    const handleChange = (name: string, fieldValue: any) => {
        let old_value = value

        if (!old_value) old_value = {}

        if (old_value[name] !== fieldValue) {
            onChange({ ...old_value, [name]: fieldValue })

            handleTestField(name, fieldValue)
        }
    }

    useEffect(() => {
        const new_value: TypeValueItem = {}

        scheme.forEach((scheme_item) => {
            const { name, type = EnumSchemeItemType.Text } = scheme_item

            const def_value = getDefValueForItem(scheme_item)

            if (type === EnumSchemeItemType.Widget) {
                if (!value[name]) new_value[name] = def_value
            } else {
                if (!value[name] && type !== "checkbox")
                    new_value[name] = def_value
            }
        })

        onChange({ ...value, ...new_value })
    }, [])

    return (
        <Ui.FlatForm>
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
                        hasError={errors.indexOf(name) > -1}
                    >
                        <Input
                            name={name}
                            value={value[name]}
                            type={type}
                            title={title}
                            hasError={errors.indexOf(name) > -1}
                            settings={field_settings}
                            onChange={(_v: any) => handleChange(name, _v)}
                            onTest={(_v: any = "NOT_SET") =>
                                handleTestField(
                                    name,
                                    _v === "NOT_SET" ? value[name] : _v
                                )
                            }
                        />
                    </Ui.Field>
                )
            })}
        </Ui.FlatForm>
    )
}

export default FlatForm
