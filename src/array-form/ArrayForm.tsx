/*SYSTEM IMPORTS*/
import {
    Children,
    createContext,
    forwardRef,
    useEffect,
    type PropsWithChildren,
} from "react"

import { useCallback, useMemo, useState } from "react"

import type {
    IJsonFormRef,
    IJsonFormRefArray,
    IJsonFormRefObject,
    ISchemeItem,
    TypeErrorItem,
    TypeValueItem,
} from "../types"

import type { IErrors } from "@undermuz/use-form"
import useTabs, { type IUseTabs } from "../utils/useTabs"
import type { IChildFormRefs } from "../flat-form/useFlatRef"

import { ArrayFormStack } from "./ArrayFormStack"
import { ArrayFormTabs } from "./ArrayFormTabs"

export interface IArrayForm {
    id?: string
    value: TypeValueItem[]
    errors: TypeErrorItem[]
    fillArrayDefault?: boolean
    viewType?: string
    primary?: boolean
    level: number
    defValue: TypeValueItem
    scheme: ISchemeItem[]
    onChange: (v: TypeValueItem[]) => void
    onError: (v: TypeErrorItem[]) => void
}

export type IArrayFormParams = IUseTabs &
    IArrayForm & {
        changeTab: (newValue: TypeValueItem, id: number | null) => void
        setTabErrors: (newErrors: IErrors, id: number) => void
        onRef?: ({ id, ref }: { id: number; ref: IJsonFormRef | null }) => void
    }

export const ArrayFormContext = createContext<IArrayFormParams>({
    tab: 0,
    value: [],
    errors: [],
    viewType: "stack",
    primary: false,
    level: 1,
    defValue: [],
    scheme: [],
    addTab: () => {},
    setTab: () => {},
    sortTabs: () => {},
    removeTab: () => {},
    changeTab: () => {},
    setTabErrors: () => {},
    onChange: () => {},
    onError: () => {},
})

const ArrayForm = forwardRef<IJsonFormRef, PropsWithChildren & IArrayForm>(
    (props, ref) => {
        const {
            // id,
            value: _value,
            errors,
            viewType = "stack",
            onChange,
            onError,
            children: _children,
        } = props

        const setErrors = useCallback(
            (newErrors: IErrors, id: number) => {
                const isExists = errors.some((e) => e.id === id)

                if (!isExists) {
                    onError([
                        ...errors,
                        {
                            id,
                            value: newErrors,
                        },
                    ])

                    return
                }

                const _newValue = errors.map((item) =>
                    item.id == id ? { ...item, value: newErrors } : item
                )

                onError(_newValue)
            },
            [errors, onError]
        )

        const value = useMemo(() => {
            if (!Array.isArray(_value)) return []

            return _value
        }, [_value])

        const onTabRemove = useCallback(
            (tabId: number) => {
                setErrors({}, tabId)
            },
            [setErrors]
        )

        const tabs = useTabs({ ...props, onTabRemove })

        const change = useCallback(
            (newValue: TypeValueItem, id: number | null = null) => {
                const _newValue = value.map((item) =>
                    item.id == id ? { ...item, ...newValue } : item
                )

                onChange(_newValue)
            },
            [value, onChange]
        )

        const [childForms, setChildForms] = useState<IChildFormRefs>({})

        const params = useMemo<IArrayFormParams>(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { children, ...rest } = props

            const _params: IArrayFormParams = {
                ...rest,
                ...tabs,
                changeTab: (...args) => {
                    console.log("[ArrayForm][changeTab]", ...args)

                    return change(...args)
                },
                setTabErrors: setErrors,
                onRef: ({ id: itemId, ref }) => {
                    setChildForms((prev) => ({
                        ...prev,
                        [itemId]: ref,
                    }))
                },
                value,
            }

            return _params
        }, [...Object.values(props), ...Object.values(tabs), change, setErrors])

        const count = Children.count(_children)

        const children =
            count > 0 ? (
                _children
            ) : viewType === "stack" ? (
                <ArrayFormStack {...params} />
            ) : (
                <ArrayFormTabs {...params} />
            )

        /* Ref */
        useEffect(() => {
            const setRef = (value: IJsonFormRefArray | null) => {
                if (typeof ref === "function") {
                    ref(value)
                } else if (ref !== null) {
                    ref.current = value
                }
            }

            setRef(
                Object.keys(childForms).map((index) => {
                    return childForms[index] as IJsonFormRefObject
                })
            )

            return () => {
                setRef(null)
            }
        }, [childForms])

        return (
            <ArrayFormContext.Provider value={params}>
                {children}
            </ArrayFormContext.Provider>
        )
    }
)

ArrayForm.displayName = "ArrayForm"

export default ArrayForm
