import React, { FC, useMemo } from "react"

import ReactDatePicker from "react-datepicker"

interface IDateSelect {
    value: string | null
    onChange: Function
}

const DateSelect: FC<IDateSelect> = (props) => {
    const { value, onChange } = props

    const dateValue = useMemo(() => {
        if (!value) {
            return null
        }

        return new Date(value)
    }, [value])

    return (
        <ReactDatePicker
            selected={dateValue}
            onChange={(date: Date) => onChange(JSON.stringify(date))}
        />
    )
}

export default DateSelect
