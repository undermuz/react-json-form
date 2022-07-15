/*SYSTEM IMPORTS*/
import React, { useMemo } from "react"

import Input from "./input"
import { EnumSchemeItemType, TypeSchemeItemSettings } from "./types"
import { Box, FormField } from "grommet"

interface IField {
    title: string
    name: string
    value: any
    error: boolean
    type: EnumSchemeItemType
    settings: TypeSchemeItemSettings
    onChange: Function
    onTest: Function
}

const Field: React.FC<IField> = (props) => {
    const { title, value/*, error*/, onTest } = props

    // const handleTestField = () => {
    //     onTest(value)
    // }

    const def_input_params = {
        title,
        name: props.name,
        value,
        type: props.type,
        settings: props.settings,
        onChange: props.onChange,
        onTest,
    }

    const showLabel = useMemo(() => {
        if (props.type == "checkbox") {
            return false
        } else if (props.type == "widget") {
            return false
        }

        return true
    }, [])

    if (!showLabel) {
        return (
            <Box pad={"xsmall"}>
                <Input {...def_input_params} />
            </Box>
        )
    }

    return (
        <FormField label={title}>
            <Input {...def_input_params} />
        </FormField>
    )
}

export default Field
