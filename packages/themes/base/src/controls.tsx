import {
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

    const { onChange, onBlur } = props

    const { showLabel: _showLabel, showToggle: _showToggle, ...settings } =
        rawSettings

    const inputRef = useRef<HTMLInputElement | null>(null)

    const displayValue = useMemo(() => {
        if (!value) {
            return ""
        }

        if (Array.isArray(value)) {
            return value.map((file) => file.name).join(", ")
        }

        if (value instanceof File) {
            return value.name
        }

        if (typeof value === "object" && "name" in value) {
            return String((value as File).name)
        }

        return ""
    }, [value])

    return (
        <div className="rjf-file">
            <input
                {...settings}
                id={id}
                type="file"
                className="rjf-file-input"
                disabled={isDisabled}
                onChange={(event) =>
                    onChange?.(
                        settings?.multiple
                            ? event.target.files
                            : event.target.files?.[0]
                    )
                }
                name={name}
                ref={inputRef}
            />
            <button
                type="button"
                className="rjf-file-trigger"
                disabled={isDisabled}
                onClick={() => inputRef.current?.click()}
                onBlur={() => onBlur?.()}
            >
                {displayValue || placeholder || "Choose file…"}
            </button>
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
