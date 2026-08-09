import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FC,
} from "react"

import {
    Button,
    Checkbox,
    DatePicker,
    Flex,
    Input,
    Select,
    Space,
    Tag,
    Upload,
} from "antd"
import {
    CloseOutlined,
    PaperClipOutlined,
    UploadOutlined,
} from "@ant-design/icons"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import _, { isArray } from "underscore"

import type { IInput, JsonFormControls } from "@undermuz/react-json-form"
import type { IConnectedProps } from "@undermuz/use-form"

interface TypeSelectValue {
    label: string
    value: number | string
}

const ControlSelect: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props

    const { options, multiple, ...otherSettings } = settings

    const { onChange, onBlur } = props

    const [asyncOptions, setAsyncOptions] = useState<TypeSelectValue[]>([])
    const [searching, setSearching] = useState(false)

    const isSync = Array.isArray(options)

    const lastLoadedValues = useRef<(number | string)[]>([])
    const cacheValues = useRef<Record<string, TypeSelectValue>>({})

    const selectOptions = useMemo(() => {
        if (isSync) return options as TypeSelectValue[]

        return asyncOptions
    }, [isSync, options, asyncOptions])

    const selectValue = useMemo(() => {
        if (multiple) {
            const list: (number | string)[] = isArray(value)
                ? (value as (number | string)[])
                : []

            return list
        }

        return value ?? null
    }, [multiple, value])

    const onChangeSelect = useCallback(
        (next: any) => {
            if (multiple) {
                onChange?.(isArray(next) ? next : [])
            } else {
                onChange?.(next ?? null)
            }
        },
        [multiple, onChange]
    )

    const onSearch = useCallback(
        async (search: string) => {
            if (isSync || typeof options !== "function") return

            setSearching(true)

            try {
                const loaded = await options({ search })

                if (Array.isArray(loaded)) {
                    for (const item of loaded) {
                        cacheValues.current[String(item.value)] = item
                    }

                    setAsyncOptions((prev) => {
                        const byValue = new Map(
                            [...prev, ...loaded].map((item) => [
                                String(item.value),
                                item,
                            ])
                        )

                        return Array.from(byValue.values())
                    })
                }
            } finally {
                setSearching(false)
            }
        },
        [isSync, options]
    )

    useEffect(() => {
        if (isSync || !multiple) return

        const valueList = (value as (number | string)[]) || []

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
                const toLoad = toAdd.filter((v) => !cacheValues.current[String(v)])

                let loaded = toAdd
                    .map((v) => cacheValues.current[String(v)])
                    .filter(Boolean) as TypeSelectValue[]

                if (toLoad.length && typeof options === "function") {
                    const fetched = await options({ ids: toLoad })

                    loaded = [...loaded, ...(fetched || [])]
                }

                for (const item of loaded) {
                    cacheValues.current[String(item.value)] = item
                }

                if (!isValid) return

                lastLoadedValues.current = valueList

                setAsyncOptions((prev) => {
                    return [
                        ...prev.filter(
                            (item) =>
                                valueList.includes(item.value) &&
                                !newUniqValues.includes(item.value) &&
                                !toRemove.includes(item.value)
                        ),
                        ...loaded,
                    ]
                })
            } else if (toRemove.length) {
                lastLoadedValues.current = valueList

                setAsyncOptions((prev) =>
                    prev.filter((item) => !toRemove.includes(item.value))
                )
            }
        }

        loadValues()

        return () => {
            isValid = false
        }
    }, [isSync, value, options, multiple])

    useEffect(() => {
        if (isSync || multiple) return

        const valueItem = value as number | string | null | undefined

        if (valueItem == null || valueItem === "") return

        let isValid = true

        const loadValue = async () => {
            const cached = cacheValues.current[String(valueItem)]

            if (cached) {
                setAsyncOptions((prev) => {
                    if (prev.some((item) => item.value == valueItem)) return prev

                    return [...prev, cached]
                })
                return
            }

            if (typeof options !== "function") return

            const list = await options({ ids: [valueItem] })
            const next = list?.[0]

            if (!isValid || !next) return

            cacheValues.current[String(next.value)] = next
            setAsyncOptions((prev) => {
                if (prev.some((item) => item.value == next.value)) return prev

                return [...prev, next]
            })
        }

        loadValue()

        return () => {
            isValid = false
        }
    }, [isSync, value, options, multiple])

    useEffect(() => {
        if (isSync || typeof options !== "function") return

        let isValid = true

        const loadDefault = async () => {
            const loaded = await options({})

            if (!isValid || !Array.isArray(loaded)) return

            for (const item of loaded) {
                cacheValues.current[String(item.value)] = item
            }

            setAsyncOptions((prev) => {
                const byValue = new Map(
                    [...prev, ...loaded].map((item) => [
                        String(item.value),
                        item,
                    ])
                )

                return Array.from(byValue.values())
            })
        }

        loadDefault()

        return () => {
            isValid = false
        }
    }, [isSync, options])

    return (
        <Select
            id={id}
            disabled={isDisabled}
            allowClear
            showSearch
            optionFilterProp="label"
            style={{ width: "100%" }}
            {...otherSettings}
            mode={multiple ? "multiple" : undefined}
            loading={!isSync && searching}
            filterOption={isSync ? undefined : false}
            onSearch={isSync ? undefined : onSearch}
            aria-label={name}
            value={selectValue}
            options={selectOptions}
            onBlur={() => onBlur?.()}
            onChange={onChangeSelect}
        />
    )
}

const ControlDate: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props
    const { onChange, onBlur } = props

    const dateValue = useMemo(() => {
        if (!value) return null

        if (dayjs.isDayjs(value)) return value as Dayjs

        if (value instanceof Date) return dayjs(value)

        if (typeof value === "string" || typeof value === "number") {
            const parsed = dayjs(value)

            return parsed.isValid() ? parsed : null
        }

        return null
    }, [value])

    return (
        <DatePicker
            id={id}
            {...settings}
            name={name}
            disabled={isDisabled}
            style={{ width: "100%" }}
            value={dateValue}
            onChange={(next) => onChange?.(next ? next.toDate() : null)}
            onBlur={() => onBlur?.()}
        />
    )
}

const ControlCheckBox: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, title, isDisabled = false } = props
    const { onChange, onBlur } = props

    return (
        <Checkbox
            id={id}
            disabled={isDisabled}
            checked={Boolean(value)}
            name={name}
            onChange={(event) => onChange?.(event.target.checked)}
            onMouseLeave={() => onBlur?.()}
        >
            {title}
        </Checkbox>
    )
}

const ControlTextBlock: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props
    const { onChange, onBlur } = props

    return (
        <Input.TextArea
            id={id}
            value={value}
            name={name}
            disabled={isDisabled}
            {...settings}
            onBlur={() => onBlur?.()}
            onChange={(event) => onChange?.(event.target.value)}
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

    const {
        /* @ts-ignore */
        showLabel: _showLabel,
        /* @ts-ignore */
        showToggle: _showToggle,
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
                if (!onChange) return

                if (!inFiles?.length) return

                if (!isMultiple) {
                    onChange(inFiles[0])
                    return
                }

                let nextFiles = [...files, ...Array.from(inFiles)]

                if (nextFiles.length > max) {
                    nextFiles = nextFiles.slice(0, max)
                }

                onChange(nextFiles)
            } finally {
                if (inputRef.current) inputRef.current.value = ""
            }
        },
        [onChange, files, isMultiple, max]
    )

    return (
        <Space wrap>
            <Flex align="center">{icon || <PaperClipOutlined />}</Flex>

            <input
                {...settings}
                id={id}
                type="file"
                onChange={(e) => onChangeFile(e.target.files)}
                name={name}
                ref={inputRef}
                style={{ display: "none" }}
            />

            {files.map((file: File) => (
                <Tag key={file.name}>
                    {file.name}
                    <Button
                        type="text"
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={() =>
                            onChange?.(
                                isMultiple
                                    ? files.filter(
                                          (f: File) => f.name !== file.name
                                      )
                                    : null
                            )
                        }
                    />
                </Tag>
            ))}

            {(isMultiple || files.length === 0) && (
                <Upload
                    disabled={isDisabled || files.length === max}
                    showUploadList={false}
                    beforeUpload={() => false}
                    openFileDialogOnClick={false}
                >
                    <Button
                        size="small"
                        icon={<UploadOutlined />}
                        disabled={isDisabled || files.length === max}
                        onClick={() => inputRef.current?.click()}
                    >
                        {placeholder || "Choose file"}
                    </Button>
                </Upload>
            )}
        </Space>
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
    const { inputType, showLabel: _showLabel, showToggle: _showToggle, ...settings } =
        _rawSettings

    return (
        <Input
            id={id}
            {...settings}
            disabled={isDisabled}
            placeholder={placeholder}
            name={name}
            type={inputType || type || "text"}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={() => onBlur?.()}
        />
    )
}

const Controls = {
    FileInput: ControlFileInput,
    Input: ControlInput,
    TextBlock: ControlTextBlock,
    CheckBox: ControlCheckBox,
    Date: ControlDate,
    Select: ControlSelect,
} as JsonFormControls

export default Controls
