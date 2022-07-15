/*SYSTEM IMPORTS*/
import React, { useEffect, useState } from "react"

import Field from "./Field"
import { EnumSchemeItemType, ISchemeItem, TypeValueItem } from "./types"
import { isArray } from "underscore"
import { Box } from "grommet"

export interface IFieldWidgetSettings {
    scheme: ISchemeItem[]
    multiple: boolean
}

interface IWidget {
    scheme: ISchemeItem[]
    value: TypeValueItem
    onChange: Function
}

const Widget: React.FC<IWidget> = (props) => {
    const { scheme, value, onChange } = props

    const [errors, setErrors] = useState<string[]>([])

    const setError = (name: string, value: any, error: boolean = true) => {
        if (error && errors.indexOf(name) === -1) {
            setErrors([...errors, name])
        }

        if (!error && errors.indexOf(name) > -1) {
            setErrors(errors.filter((item) => item != name))
        }
    }

    const handleTestField = (name: string, value: any) => {
        const last_error = errors.indexOf(name) > -1

        const field = scheme.find((item) => item.name == name)

        if (!field) {
            console.error(`Field not found: ${name}`)
            return
        }

        const { is_require = false, type = "text" } = field

        let check_value = (_v: any) => Boolean(_v)

        if (type == "files") {
            check_value = (_val) =>
                Boolean(_val) && isArray(_val) && _val.length > 0
        }

        if (
            is_require &&
            type != "checkbox" &&
            !check_value(value) &&
            !last_error
        ) {
            setError(name, value, true)
        }

        if (
            is_require &&
            type != "checkbox" &&
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
            console.log("Widget::handleChange", {
                name,
                value,
                fieldValue,
            })

            onChange({ ...old_value, [name]: fieldValue })

            handleTestField(name, fieldValue)
        }
    }

    useEffect(() => {
        const new_value: TypeValueItem = {}

        scheme.forEach((scheme_item) => {
            const {
                // title,
                name,
                type = EnumSchemeItemType.Text,
                settings = {},
            } = scheme_item

            let { def_value = "" } = scheme_item

            if (!def_value) {
                if (type == "checkbox") def_value = false

                if (type == "files") def_value = []

                if (type == "widget") {
                    const { multiple = false } = scheme_item

                    if (multiple) {
                        def_value = []
                    } else {
                        def_value = {}
                    }
                }

                if (type == EnumSchemeItemType.GeoCoordinates)
                    def_value = {
                        address: "",
                        lat: 0,
                        lng: 0,
                    }

                if (type == "select") {
                    if (settings.multiple) {
                        def_value = []
                    } else {
                        if (settings.options && settings.options.length) {
                            // def_value = settings.options[0]
                        } else {
                            def_value = 0
                        }
                    }
                }
            }

            if (type == EnumSchemeItemType.Widget) {
                if (!value[name]) new_value[name] = def_value
            } else {
                if (!value[name] && type != "checkbox")
                    new_value[name] = def_value
            }
        })

        onChange({ ...value, ...new_value })
    }, [])

    return (
        <Box pad={"xxsmall"}>
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
                    <Field
                        key={index}
                        name={name}
                        value={value[name]}
                        type={type}
                        title={title}
                        error={errors.indexOf(name) > -1}
                        settings={field_settings}
                        onChange={(_v: any) => handleChange(name, _v)}
                        onTest={(_v: any = "NOT_SET") =>
                            handleTestField(
                                name,
                                _v === "NOT_SET" ? value[name] : _v
                            )
                        }
                    />
                )
            })}
        </Box>
    )
}

export default Widget
