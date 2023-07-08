import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FC,
} from "react"

import { SingleDatepicker } from "chakra-dayzed-datepicker"

import { Checkbox, Input, Textarea } from "@chakra-ui/react"

import type { IInput } from "../../input"
import type { JsonFormControls } from "../../types"

import _, { isArray } from "underscore"

// import ChakraReactSelect from "chakra-react-select"
// const { AsyncSelect, Select } = ChakraReactSelect

import { AsyncSelect, Select } from "chakra-react-select"

// import _Select from "react-select"
// const Select = ((_Select as any).default ?? _Select) as typeof _Select

// import _AsyncSelect from "react-select/async"
// const AsyncSelect = ((_AsyncSelect as any).default ??
//     _AsyncSelect) as typeof _AsyncSelect

interface TypeSelectValue {
    label: string
    value: number
}

const ControlSelect: FC<IInput> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props

    const { options, multiple, ...otherSettings } = settings

    const { onChange, onBlur } = props

    const [asyncValues, setAsyncValues] = useState<TypeSelectValue[]>([])
    const [asyncValue, setAsyncValue] = useState<TypeSelectValue | null>(null)

    const isSync = Array.isArray(options)

    const SelectCmp = isSync ? Select : AsyncSelect

    const rest = {
        isClearable: true,
        ...otherSettings,
        ...(!isSync
            ? {
                  loadOptions: options,
                  cacheOptions: true,
                  defaultOptions: true,
              }
            : { options: options }),
    }

    const lastLoadedValues = useRef<TypeSelectValue[]>([])
    const cacheValues = useRef<Record<string, TypeSelectValue>>({})

    const selectValue = useMemo(() => {
        if (!multiple) {
            if (!isSync) return asyncValue

            return options.find((_i) => _i.value == value)
        }

        if (!isSync) return asyncValues

        const _list: TypeSelectValue[] = isArray(value)
            ? (value as TypeSelectValue[])
            : []

        return _list.map((v) => options.find((_i) => _i.value == v))
    }, [isSync, multiple, value, asyncValues, asyncValue, options])

    const onChangeSelect = useCallback(
        (_value: any) => {
            if (multiple) {
                const _list: TypeSelectValue[] = isArray(_value)
                    ? (_value as TypeSelectValue[])
                    : []

                onChange?.(_list.map((_val) => _val.value))
            } else {
                onChange?.(_value.value)
            }
        },
        [multiple]
    )

    const onBlurSelect = useCallback(() => onBlur?.(), [onBlur])

    useEffect(() => {
        if (isSync || !multiple) return

        const valueList = value as any[]

        if (!valueList) return

        const newUniqValues =
            valueList.length > lastLoadedValues.current.length
                ? _.difference(valueList, lastLoadedValues.current)
                : _.difference(lastLoadedValues.current, valueList)

        let isValid = true

        const loadValues = async () => {
            const toAdd = newUniqValues.filter(
                (v) => !lastLoadedValues.current.includes(v)
            )

            const toRemove = newUniqValues.filter((v) => !valueList.includes(v))

            if (toAdd.length) {
                const toLoad = toAdd.filter((v) => !cacheValues.current[v])

                let _values = toAdd
                    .map((v) => cacheValues.current[v])
                    .filter((v) => Boolean(v))

                if (toLoad.length) {
                    const _loadValues = await options({ ids: toLoad })

                    _values = [..._values, ..._loadValues]
                }

                for (const _val of _values) {
                    cacheValues.current[_val.value] = _val
                }

                if (!isValid) return

                lastLoadedValues.current = valueList

                setAsyncValues((prevAsyncValue) => {
                    return [
                        ...prevAsyncValue.filter(
                            (_val) =>
                                valueList.includes(_val.value) &&
                                !newUniqValues.includes(_val.value) &&
                                !toRemove.includes(_val.value)
                        ),
                        ..._values,
                    ]
                })
            } else if (toRemove.length) {
                lastLoadedValues.current = valueList

                setAsyncValues((prevAsyncValue) => {
                    return prevAsyncValue.filter(
                        (_val) => !toRemove.includes(_val.value)
                    )
                })
            }
        }

        loadValues()

        return () => {
            isValid = false
        }
    }, [isSync, value, options, multiple])

    useEffect(() => {
        if (isSync || multiple) return

        const valueItem = value as any

        if (!valueItem) return

        let isValid = true

        const fetchValue = async () => {
            if (cacheValues.current[valueItem])
                return cacheValues.current[valueItem]

            const list = await options({ ids: [valueItem] })

            return list[0] || null
        }

        const loadValue = async () => {
            const newValue = await fetchValue()

            if (!isValid) return

            setAsyncValue(newValue)
        }

        loadValue()

        return () => {
            isValid = false
        }
    }, [isSync, value, options, multiple])

    return (
        <SelectCmp
            id={id}
            isDisabled={isDisabled}
            {...rest}
            isMulti={multiple ? true : false}
            name={name}
            value={selectValue}
            onBlur={onBlurSelect}
            onChange={onChangeSelect}
        />
    )
}

const ControlDate: FC<IInput> = (props) => {
    const { id, name, value /* , isDisabled = false */ } = props

    // const defValue = useMemo(() => {
    //     return new Date()
    // }, [])

    const { onChange } = props

    return (
        <SingleDatepicker
            id={id}
            name={name}
            // isDisabled={isDisabled}
            date={value ? value : undefined}
            onDateChange={(value) => onChange?.(value)}
        />
    )
}

const ControlCheckBox: FC<IInput> = (props) => {
    const { id, name, value, title, isDisabled = false } = props

    const { onChange, onBlur } = props

    return (
        <Checkbox
            id={id}
            isDisabled={isDisabled}
            isChecked={Boolean(value)}
            name={name}
            onChange={(event) => onChange?.(event.target.checked)}
            onMouseLeave={(e) =>
                onBlur?.((e.currentTarget as HTMLInputElement).checked)
            }
        >
            {title}
        </Checkbox>
    )
}

const ControlTextBlock: FC<IInput> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props

    const { onChange, onBlur } = props

    return (
        <Textarea
            id={id}
            value={value}
            name={name}
            isDisabled={isDisabled}
            {...settings}
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
            onChange={(event) => onChange?.(event.currentTarget.value)}
        />
    )
}

const ControlInput: FC<IInput> = (props) => {
    const {
        id,
        name,
        placeholder = "",
        isDisabled = false,
        value,
        type,
        settings: _rawSettings = {},
    } = props

    const { onChange, onBlur } = props

    /* @ts-ignore */
    const { inputType, showLabel, showToggle, ...settings } = _rawSettings

    return (
        <Input
            id={id}
            {...settings}
            isDisabled={isDisabled}
            placeholder={placeholder}
            name={name}
            type={inputType || type || "text"}
            value={value}
            onChange={(e) => onChange?.(e.currentTarget.value)}
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
        />
    )
}

const Controls: JsonFormControls = {
    Input: ControlInput,
    TextBlock: ControlTextBlock,
    CheckBox: ControlCheckBox,
    Date: ControlDate,
    Select: ControlSelect,
}

export default Controls
