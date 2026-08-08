import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type FC,
} from "react"

import type { IInput, JsonFormControls } from "@undermuz/react-json-form"

interface SelectOption {
    label: string
    value: string | number
}

const ControlInput: FC<IInput> = (props) => {
    const {
        id,
        name,
        placeholder = "",
        isDisabled = false,
        value,
        type,
        settings: rawSettings = {},
    } = props

    const { onChange, onBlur } = props

    const { inputType, showLabel: _showLabel, showToggle: _showToggle, ...settings } =
        rawSettings

    return (
        <input
            id={id}
            className="rjf-input"
            {...settings}
            disabled={isDisabled}
            placeholder={placeholder}
            name={name}
            type={inputType || type || "text"}
            value={value ?? ""}
            onChange={(event) => onChange?.(event.currentTarget.value)}
            onBlur={() => onBlur?.()}
        />
    )
}

const ControlTextBlock: FC<IInput> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props
    const { onChange, onBlur } = props

    return (
        <textarea
            id={id}
            className="rjf-textarea"
            value={value ?? ""}
            name={name}
            disabled={isDisabled}
            {...settings}
            onBlur={() => onBlur?.()}
            onChange={(event) => onChange?.(event.currentTarget.value)}
        />
    )
}

const ControlCheckBox: FC<IInput> = (props) => {
    const { id, name, value, title, isDisabled = false } = props
    const { onChange, onBlur } = props

    return (
        <label className="rjf-checkbox">
            <input
                id={id}
                type="checkbox"
                disabled={isDisabled}
                checked={Boolean(value)}
                name={name}
                onChange={(event) => onChange?.(event.target.checked)}
                onBlur={() => onBlur?.()}
            />
            <span>{title}</span>
        </label>
    )
}

const ControlDate: FC<IInput> = (props) => {
    const { id, name, value, isDisabled = false } = props
    const { onChange, onBlur } = props

    const dateValue =
        value instanceof Date
            ? value.toISOString().slice(0, 10)
            : typeof value === "string"
              ? value.slice(0, 10)
              : ""

    return (
        <input
            id={id}
            className="rjf-input"
            type="date"
            name={name}
            disabled={isDisabled}
            value={dateValue}
            onChange={(event) => onChange?.(event.currentTarget.value)}
            onBlur={() => onBlur?.()}
        />
    )
}

const ControlSelect: FC<IInput> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props
    const { options, multiple, ...restSettings } = settings
    const { onChange, onBlur } = props

    const isSync = Array.isArray(options)
    const [asyncOptions, setAsyncOptions] = useState<SelectOption[]>([])
    const [loading, setLoading] = useState(false)

    const lastLoadedValues = useRef<Array<string | number>>([])
    const cacheValues = useRef<Record<string, SelectOption>>({})

    useEffect(() => {
        if (isSync || typeof options !== "function") {
            return
        }

        let cancelled = false

        setLoading(true)

        Promise.resolve(options(""))
            .then((result) => {
                if (!cancelled) {
                    setAsyncOptions(Array.isArray(result) ? result : [])
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [isSync, options])

    useEffect(() => {
        if (isSync || !multiple || typeof options !== "function") {
            return
        }

        const valueList = (Array.isArray(value) ? value : []) as Array<
            string | number
        >

        if (!valueList.length) {
            setAsyncOptions([])
            lastLoadedValues.current = []
            return
        }

        const newUniqValues =
            valueList.length > lastLoadedValues.current.length
                ? valueList.filter(
                      (item) => !lastLoadedValues.current.includes(item),
                  )
                : lastLoadedValues.current.filter(
                      (item) => !valueList.includes(item),
                  )

        let isValid = true

        const loadValues = async () => {
            const toAdd = newUniqValues.filter(
                (item) => !lastLoadedValues.current.includes(item),
            )
            const toRemove = newUniqValues.filter(
                (item) => !valueList.includes(item),
            )

            if (toAdd.length) {
                const toLoad = toAdd.filter((item) => !cacheValues.current[String(item)])

                let loaded = toAdd
                    .map((item) => cacheValues.current[String(item)])
                    .filter(Boolean)

                if (toLoad.length) {
                    const fetched = await options({ ids: toLoad })
                    loaded = [...loaded, ...(Array.isArray(fetched) ? fetched : [])]
                }

                for (const item of loaded) {
                    cacheValues.current[String(item.value)] = item
                }

                if (!isValid) {
                    return
                }

                lastLoadedValues.current = valueList

                setAsyncOptions((prevAsyncValue) => {
                    return [
                        ...prevAsyncValue.filter(
                            (item) =>
                                valueList.includes(item.value) &&
                                !newUniqValues.includes(item.value) &&
                                !toRemove.includes(item.value),
                        ),
                        ...loaded,
                    ]
                })
            } else if (toRemove.length) {
                lastLoadedValues.current = valueList

                setAsyncOptions((prevAsyncValue) => {
                    return prevAsyncValue.filter(
                        (item) => !toRemove.includes(item.value),
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
        if (isSync || multiple || typeof options !== "function") {
            return
        }

        const valueItem = value as string | number | null | undefined

        if (valueItem === null || valueItem === undefined || valueItem === "") {
            setAsyncOptions([])
            return
        }

        let isValid = true

        const loadValue = async () => {
            if (cacheValues.current[String(valueItem)]) {
                setAsyncOptions([cacheValues.current[String(valueItem)]])
                return
            }

            const list = await options({ ids: [valueItem] })
            const loaded = Array.isArray(list) ? list[0] : null

            if (!isValid) {
                return
            }

            if (loaded) {
                cacheValues.current[String(loaded.value)] = loaded
                setAsyncOptions([loaded])
            }
        }

        loadValue()

        return () => {
            isValid = false
        }
    }, [isSync, value, options, multiple])

    const selectOptions = isSync ? (options as SelectOption[]) : asyncOptions

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (multiple) {
            const selected = Array.from(event.target.selectedOptions).map(
                (option) => {
                    const parsed = Number(option.value)
                    return Number.isNaN(parsed) ? option.value : parsed
                }
            )
            onChange?.(selected)
            return
        }

        const raw = event.target.value

        if (!raw) {
            onChange?.(null)
            return
        }

        const parsed = Number(raw)
        onChange?.(Number.isNaN(parsed) ? raw : parsed)
    }

    const selectedValues = useMemo(() => {
        if (multiple) {
            return Array.isArray(value) ? value.map(String) : []
        }

        return value === undefined || value === null ? "" : String(value)
    }, [multiple, value])

    return (
        <select
            id={id}
            className="rjf-select"
            name={name}
            disabled={isDisabled || loading}
            multiple={Boolean(multiple)}
            value={selectedValues}
            onChange={handleChange}
            onBlur={() => onBlur?.()}
            {...restSettings}
        >
            {!multiple && (
                <option value="" disabled>
                    {loading ? "Loading…" : "Select…"}
                </option>
            )}
            {selectOptions.map((option) => (
                <option key={String(option.value)} value={String(option.value)}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

const ControlFileInput: FC<IInput> = (props) => {
    const {
        id,
        name,
        placeholder = "",
        value,
        isDisabled = false,
        settings: rawSettings = {},
    } = props

    const { onChange } = props

    const {
        showLabel: _showLabel,
        showToggle: _showToggle,
        max = Infinity,
        ...settings
    } = rawSettings

    const inputRef = useRef<HTMLInputElement | null>(null)

    const isMultiple = Boolean(settings?.multiple)

    const files = useMemo(() => {
        if (Array.isArray(value)) {
            return value
        }

        if (!value) {
            return []
        }

        return [value]
    }, [value])

    const onChangeFile = useCallback(
        (inFiles?: FileList | null) => {
            try {
                if (!onChange || !inFiles?.length) {
                    return
                }

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
                if (inputRef.current) {
                    inputRef.current.value = ""
                }
            }
        },
        [onChange, files, isMultiple, max],
    )

    return (
        <div className="rjf-file">
            <input
                {...settings}
                id={id}
                type="file"
                className="rjf-file-input"
                disabled={isDisabled}
                onChange={(event) => onChangeFile(event.target.files)}
                name={name}
                ref={inputRef}
            />

            {files.map((file) => (
                <div key={file.name} className="rjf-file-tag">
                    <span>{file.name}</span>
                    <button
                        type="button"
                        className="rjf-file-tag__remove"
                        disabled={isDisabled}
                        onClick={() =>
                            onChange?.(
                                isMultiple
                                    ? files.filter((item) => item.name !== file.name)
                                    : null,
                            )
                        }
                    >
                        ×
                    </button>
                </div>
            ))}

            {(isMultiple || files.length === 0) && (
                <button
                    type="button"
                    className="rjf-file-trigger"
                    disabled={isDisabled || files.length >= max}
                    onClick={() => inputRef.current?.click()}
                >
                    {placeholder || "Choose file…"}
                </button>
            )}
        </div>
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
