import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FC,
} from "react"

import AttachFileIcon from "@mui/icons-material/AttachFile"
import CloseIcon from "@mui/icons-material/Close"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import {
    Autocomplete,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
    Stack,
    TextField,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
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

    const selected = useMemo(() => {
        if (multiple) {
            const list: (number | string)[] = isArray(value)
                ? (value as (number | string)[])
                : []
            return list
                .map((v) => selectOptions.find((item) => item.value == v))
                .filter(Boolean) as TypeSelectValue[]
        }

        return selectOptions.find((item) => item.value == value) ?? null
    }, [multiple, value, selectOptions])

    const onSearch = useCallback(
        async (search: string) => {
            if (isSync || typeof options !== "function") return

            setSearching(true)
            try {
                const loaded = await options({ search })
                if (!Array.isArray(loaded)) return

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
                const toLoad = toAdd.filter(
                    (v) => !cacheValues.current[String(v)]
                )
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
                setAsyncOptions((prev) => [
                    ...prev.filter(
                        (item) =>
                            valueList.includes(item.value) &&
                            !newUniqValues.includes(item.value) &&
                            !toRemove.includes(item.value)
                    ),
                    ...loaded,
                ])
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
                setAsyncOptions((prev) =>
                    prev.some((item) => item.value == valueItem)
                        ? prev
                        : [...prev, cached]
                )
                return
            }
            if (typeof options !== "function") return
            const list = await options({ ids: [valueItem] })
            const next = list?.[0]
            if (!isValid || !next) return
            cacheValues.current[String(next.value)] = next
            setAsyncOptions((prev) =>
                prev.some((item) => item.value == next.value)
                    ? prev
                    : [...prev, next]
            )
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
        <Autocomplete
            id={id}
            disabled={isDisabled}
            multiple={Boolean(multiple)}
            options={selectOptions}
            loading={!isSync && searching}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(a, b) => a.value == b.value}
            value={selected as any}
            onInputChange={(_e, search, reason) => {
                if (reason === "input") onSearch(search)
            }}
            onBlur={() => onBlur?.()}
            onChange={(_e, next) => {
                if (multiple) {
                    const list = isArray(next) ? (next as TypeSelectValue[]) : []
                    onChange?.(list.map((item) => item.value))
                } else {
                    onChange?.(
                        next ? (next as TypeSelectValue).value : null
                    )
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    {...otherSettings}
                    size="small"
                />
            )}
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
        const parsed = dayjs(value)
        return parsed.isValid() ? parsed : null
    }, [value])

    return (
        <DatePicker
            {...settings}
            disabled={isDisabled}
            value={dateValue}
            onChange={(next) => onChange?.(next ? next.toDate() : null)}
            slotProps={{
                textField: {
                    id,
                    name,
                    size: "small",
                    fullWidth: true,
                    onBlur: () => onBlur?.(),
                },
            }}
        />
    )
}

const ControlCheckBox: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, title, isDisabled = false } = props
    const { onChange, onBlur } = props

    return (
        <FormControlLabel
            control={
                <Checkbox
                    id={id}
                    disabled={isDisabled}
                    checked={Boolean(value)}
                    name={name}
                    onChange={(event) => onChange?.(event.target.checked)}
                    onMouseLeave={() => onBlur?.()}
                />
            }
            label={title}
        />
    )
}

const ControlTextBlock: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props
    const { onChange, onBlur } = props

    return (
        <TextField
            id={id}
            value={value ?? ""}
            name={name}
            disabled={isDisabled}
            fullWidth
            multiline
            minRows={3}
            size="small"
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
                if (!onChange || !inFiles?.length) return
                if (!isMultiple) {
                    onChange(inFiles[0])
                    return
                }
                let nextFiles = [...files, ...Array.from(inFiles)]
                if (nextFiles.length > max) nextFiles = nextFiles.slice(0, max)
                onChange(nextFiles)
            } finally {
                if (inputRef.current) inputRef.current.value = ""
            }
        },
        [onChange, files, isMultiple, max]
    )

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", flexWrap: "wrap" }}
        >
            {icon || <AttachFileIcon fontSize="small" />}
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
                <Chip
                    key={file.name}
                    size="small"
                    label={file.name}
                    onDelete={() =>
                        onChange?.(
                            isMultiple
                                ? files.filter(
                                      (f: File) => f.name !== file.name
                                  )
                                : null
                        )
                    }
                    deleteIcon={<CloseIcon />}
                />
            ))}
            {(isMultiple || files.length === 0) && (
                <Button
                    size="small"
                    startIcon={<UploadFileIcon />}
                    disabled={isDisabled || files.length === max}
                    onClick={() => inputRef.current?.click()}
                >
                    {placeholder || "Choose file"}
                </Button>
            )}
        </Stack>
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
        <TextField
            id={id}
            {...settings}
            disabled={isDisabled}
            placeholder={placeholder}
            name={name}
            type={inputType || type || "text"}
            value={value ?? ""}
            fullWidth
            size="small"
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
