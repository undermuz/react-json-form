import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FC,
} from "react"

import { SingleDatepicker } from "chakra-dayzed-datepicker"

import {
    Button,
    Checkbox,
    Flex,
    Input,
    Tag,
    Text,
    Textarea,
    Wrap,
} from "@chakra-ui/react"

import type { IInput, JsonFormControls } from "@undermuz/react-json-form"

import _, { isArray } from "underscore"

// import ChakraReactSelect from "chakra-react-select"
// const { AsyncSelect, Select } = ChakraReactSelect

import { AsyncSelect, Select } from "chakra-react-select"
import { AttachmentIcon, CloseIcon } from "@chakra-ui/icons"
import type { IConnectedProps } from "@undermuz/use-form"

// import _Select from "react-select"
// const Select = ((_Select as any).default ?? _Select) as typeof _Select

// import _AsyncSelect from "react-select/async"
// const AsyncSelect = ((_AsyncSelect as any).default ??
//     _AsyncSelect) as typeof _AsyncSelect

interface TypeSelectValue {
    label: string
    value: number
}

const ControlSelect: FC<IInput & IConnectedProps> = (props) => {
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

const ControlDate: FC<IInput & IConnectedProps> = (props) => {
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

const ControlCheckBox: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, title, isDisabled = false } = props

    const { onChange, onBlur } = props

    return (
        <Checkbox
            id={id}
            isDisabled={isDisabled}
            isChecked={Boolean(value)}
            name={name}
            onChange={(event) => onChange?.(event.target.checked)}
            onMouseLeave={(e) => onBlur?.()}
        >
            {title}
        </Checkbox>
    )
}

const ControlTextBlock: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props

    const { onChange, onBlur } = props

    return (
        <Textarea
            id={id}
            value={value}
            name={name}
            isDisabled={isDisabled}
            {...settings}
            onBlur={(e) => onBlur?.()}
            onChange={(event) => onChange?.(event.currentTarget.value)}
        />
    )
}

const ControlFileInput: FC<IInput & IConnectedProps> = (props) => {
    const {
        id,
        name,
        placeholder = "",
        isDisabled = false,
        value,
        settings: _rawSettings = {},
    } = props

    const { onChange } = props

    /* @ts-ignore */
    const {
        showLabel,
        showToggle,
        icon,
        max = Infinity,
        ...settings
    } = _rawSettings

    const inputRef = useRef<HTMLInputElement | null>(null)

    const isMultiple = Boolean(settings?.multiple)

    const files = useMemo(() => {
        if (Array.isArray(value)) return value

        if (!value) return []

        return [value]
    }, [value])

    const onChangeFile = useCallback(
        (inFiles?: FileList | null) => {
            try {
                console.log("[onChangeFile]", inFiles)

                if (!onChange) return

                if (!inFiles?.length) {
                    console.log("[onChangeFile][Nothing]", inFiles)
                    return
                }

                if (!isMultiple) {
                    console.log("[onChangeFile][Single]", inFiles[0])
                    onChange(inFiles[0])
                    return
                }

                console.log("[onChangeFile][Multiple]", inFiles[0])
                let nextFiles = [...files, ...inFiles]

                if (nextFiles.length > max) {
                    nextFiles = nextFiles.slice(0, max)
                }

                onChange(nextFiles)
            } finally {
                if (inputRef.current) inputRef.current.value = ""
            }
        },
        [onChange, files]
    )

    console.log("[ControlFileInput]", props)

    return (
        <Wrap>
            <Flex align="center">{icon || <AttachmentIcon />}</Flex>

            <input
                {...settings}
                id={id}
                type="file"
                onChange={(e) => {
                    onChangeFile(e.target.files)
                }}
                name={name}
                ref={inputRef}
                style={{ display: "none" }}
            />

            {files.map((file) => (
                <Tag key={file.name} size="sm">
                    <Text>{file.name}</Text>
                    <Button
                        size="sm"
                        onClick={() =>
                            onChange?.(
                                isMultiple
                                    ? files.filter((f) => f.name !== file.name)
                                    : null
                            )
                        }
                    >
                        <CloseIcon />
                    </Button>
                </Tag>
            ))}

            {(isMultiple || files.length === 0) && (
                <Button
                    size="sm"
                    onClick={() => inputRef.current?.click()}
                    isDisabled={isDisabled || files.length === max}
                >
                    {placeholder || "Choose file"}
                </Button>
            )}
        </Wrap>
    )
}

const ControlInput: FC<IInput & IConnectedProps> = (props) => {
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
            onBlur={(e) => onBlur?.()}
        />
    )
}

const Controls: JsonFormControls = {
    FileInput: ControlFileInput,
    Input: ControlInput,
    TextBlock: ControlTextBlock,
    CheckBox: ControlCheckBox,
    Date: ControlDate,
    Select: ControlSelect,
}

export default Controls
