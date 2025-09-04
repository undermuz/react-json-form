import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FC,
} from "react"

import type { IInput, JsonFormControls } from "@undermuz/react-json-form"

import _, { isArray } from "underscore"

import { IoIosAttach } from "react-icons/io"
import { type IConnectedProps } from "@undermuz/use-form"

import {
    type DateValue,
    CalendarDate,
    getLocalTimeZone,
} from "@internationalized/date"

import {
    Button,
    Checkbox,
    Chip,
    DatePicker,
    Input,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react"

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
        [multiple],
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
                (v) => !lastLoadedValues.current.includes(v),
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
                                !toRemove.includes(_val.value),
                        ),
                        ..._values,
                    ]
                })
            } else if (toRemove.length) {
                lastLoadedValues.current = valueList

                setAsyncValues((prevAsyncValue) => {
                    return prevAsyncValue.filter(
                        (_val) => !toRemove.includes(_val.value),
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
        <Select
            id={id}
            isDisabled={isDisabled}
            {...rest}
            selectionMode={multiple ? "multiple" : "single"}
            name={name}
            value={selectValue}
            onBlur={onBlurSelect}
            onChange={onChangeSelect}
        >
            {options.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
        </Select>
    )
}

const ControlDate: FC<IInput & IConnectedProps> = (props) => {
    const { value, label, settings, onChange } = props

    const date = useMemo(() => {
        const _d = value instanceof Date ? value : new Date()

        return new CalendarDate(
            _d.getFullYear(),
            _d.getMonth() + 1,
            _d.getDate(),
        )
    }, [value])

    const handleChange = useCallback(
        (date: DateValue | null) => {
            onChange?.(date?.toDate(getLocalTimeZone()))
        },
        [onChange],
    )

    return (
        <DatePicker
            {...settings}
            label={label}
            value={date}
            onChange={handleChange}
        />
    )
}

const ControlCheckBox: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, title, isDisabled = false } = props

    const { onChange, onBlur } = props

    return (
        <Checkbox
            id={id}
            name={name}
            color="success"
            isSelected={Boolean(value)}
            disabled={isDisabled}
            onValueChange={(checked) => onChange?.(checked)}
            onMouseLeave={(e) =>
                //@ts-ignore
                onBlur?.((e.currentTarget as HTMLInputElement).checked)
            }
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
            disabled={isDisabled}
            {...settings}
            onBlur={(e) =>
                //@ts-ignore
                onBlur?.(e.currentTarget.value)
            }
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
        [onChange, files],
    )

    console.log("[ControlFileInput]", props)

    return (
        <>
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

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 items-center">
                    {icon || <IoIosAttach />}
                </div>

                {files.map((file) => (
                    <Chip
                        key={file.name}
                        onClose={() =>
                            onChange?.(
                                isMultiple
                                    ? files.filter((f) => f.name !== file.name)
                                    : null,
                            )
                        }
                    >
                        {file.name}
                    </Chip>
                ))}

                {(isMultiple || files.length === 0) && (
                    <Button
                        size="sm"
                        onPress={() => inputRef.current?.click()}
                        disabled={isDisabled || files.length === max}
                    >
                        {placeholder || "Choose file"}
                    </Button>
                )}
            </div>
        </>
    )
}

const ControlInput: FC<IInput & IConnectedProps> = (props) => {
    const {
        id,
        name,
        title,
        placeholder = "",
        isDisabled = false,
        value,
        type,
        settings: _rawSettings = {},
    } = props

    const { onChange, onBlur } = props

    /* @ts-ignore */
    const { inputType, showLabel, showToggle, ...settings } = _rawSettings

    const errors = props.errors
        ?.map((errorText) => {
            if (typeof errorText !== "string") {
                return null
            }

            return errorText
        })
        .filter((error) => error !== null)

    return (
        <Input
            id={id}
            {...settings}
            label={title}
            disabled={isDisabled}
            placeholder={placeholder}
            name={name}
            errorMessage={
                errors?.length
                    ? () => (
                          <ul>
                              {errors.map((error, i) => (
                                  <li key={i}>{error}</li>
                              ))}
                          </ul>
                      )
                    : undefined
            }
            type={inputType || type || "text"}
            value={value}
            onChange={(e) => onChange?.(e.currentTarget.value)}
            // @ts-ignore
            onBlur={(e) => onBlur?.(e.currentTarget.value)}
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
