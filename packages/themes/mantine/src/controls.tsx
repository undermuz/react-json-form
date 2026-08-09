import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FC,
} from "react"

import {
    ActionIcon,
    Button,
    Checkbox,
    Group,
    MultiSelect,
    Select,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import {
    IconPaperclip,
    IconUpload,
    IconX,
} from "@tabler/icons-react"
import dayjs from "dayjs"
import _, { isArray } from "underscore"

import type { IInput, JsonFormControls } from "@undermuz/react-json-form"
import type { IConnectedProps } from "@undermuz/use-form"

interface TypeSelectValue {
    label: string
    value: number | string
}

const toSelectData = (list: TypeSelectValue[]) =>
    list.map((item) => ({
        value: String(item.value),
        label: item.label,
    }))

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

    const data = useMemo(() => toSelectData(selectOptions), [selectOptions])

    const resolveRaw = useCallback(
        (stringValue: string) => {
            const found = selectOptions.find(
                (item) => String(item.value) === stringValue
            )
            return found ? found.value : stringValue
        },
        [selectOptions]
    )

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

    if (multiple) {
        const list: (number | string)[] = isArray(value)
            ? (value as (number | string)[])
            : []

        return (
            <MultiSelect
                id={id}
                disabled={isDisabled}
                clearable
                searchable
                aria-label={name}
                data={data}
                value={list.map(String)}
                onSearchChange={isSync ? undefined : onSearch}
                rightSection={searching ? undefined : undefined}
                onBlur={() => onBlur?.()}
                onChange={(next) => onChange?.(next.map(resolveRaw))}
                {...otherSettings}
            />
        )
    }

    return (
        <Select
            id={id}
            disabled={isDisabled}
            clearable
            searchable
            aria-label={name}
            data={data}
            value={value == null || value === "" ? null : String(value)}
            onSearchChange={isSync ? undefined : onSearch}
            onBlur={() => onBlur?.()}
            onChange={(next) =>
                onChange?.(next == null ? null : resolveRaw(next))
            }
            {...otherSettings}
        />
    )
}

const ControlDate: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props
    const { onChange, onBlur } = props

    const dateValue = useMemo(() => {
        if (!value) return null
        if (value instanceof Date) return value
        const parsed = dayjs(value)
        return parsed.isValid() ? parsed.toDate() : null
    }, [value])

    return (
        <DateInput
            id={id}
            {...settings}
            name={name}
            disabled={isDisabled}
            value={dateValue}
            onChange={(next) => onChange?.(next ?? null)}
            onBlur={() => onBlur?.()}
            clearable
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
            label={title}
            onChange={(event) => onChange?.(event.currentTarget.checked)}
            onMouseLeave={() => onBlur?.()}
        />
    )
}

const ControlTextBlock: FC<IInput & IConnectedProps> = (props) => {
    const { id, name, value, settings = {}, isDisabled = false } = props
    const { onChange, onBlur } = props

    return (
        <Textarea
            id={id}
            value={value ?? ""}
            name={name}
            disabled={isDisabled}
            {...settings}
            onBlur={() => onBlur?.()}
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
        <Group gap="xs" wrap="wrap">
            {icon || <IconPaperclip size={16} />}
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
                <Group key={file.name} gap={4} wrap="nowrap">
                    <Text size="sm">{file.name}</Text>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        onClick={() =>
                            onChange?.(
                                isMultiple
                                    ? files.filter(
                                          (f: File) => f.name !== file.name
                                      )
                                    : null
                            )
                        }
                    >
                        <IconX size={14} />
                    </ActionIcon>
                </Group>
            ))}
            {(isMultiple || files.length === 0) && (
                <Button
                    size="compact-sm"
                    leftSection={<IconUpload size={14} />}
                    disabled={isDisabled || files.length === max}
                    onClick={() => inputRef.current?.click()}
                >
                    {placeholder || "Choose file"}
                </Button>
            )}
        </Group>
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
        <TextInput
            id={id}
            {...settings}
            disabled={isDisabled}
            placeholder={placeholder}
            name={name}
            type={inputType || type || "text"}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.currentTarget.value)}
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
