import type React from "react"
import { useState } from "react"
import type { TypeErrorItem, TypeValueItem } from "../types"
import { arrayMoveImmutable } from "./arrayMove"

interface IUseTabsProps {
    value: TypeValueItem[]
    errors: TypeErrorItem[]

    defValue: TypeValueItem

    onChange: (v: TypeValueItem[]) => void
    onTabRemove: (tabId: number) => void
}

export interface IUseTabs {
    tab: number
    setTab: React.Dispatch<number>
    addTab: (afterId?: number) => void
    removeTab: (tab_id: number) => void
    moveTab: (tabId: number, direction: -1 | 1) => void
    sortTabs: (fromIndex: number, toIndex: number) => void
}

const useTabs = (props: IUseTabsProps): IUseTabs => {
    const { value, defValue, onChange, onTabRemove } = props

    const [tab, setTab] = useState<number>(() => {
        if (value.length > 0) return value[0].id as number

        return 1
    })

    const addTab = (afterId?: number) => {
        let maxId = Math.max(...value.map((item) => item.id))

        if (isNaN(maxId) || !isFinite(maxId) || maxId < 0) {
            maxId = 0
        }

        const def_value = {
            ...defValue,
            id: maxId + 1,
        }

        const insertAfterId = afterId ?? tab
        const insertIndex = value.findIndex((item) => item.id === insertAfterId)

        const newList =
            insertIndex >= 0
                ? [
                      ...value.slice(0, insertIndex + 1),
                      def_value,
                      ...value.slice(insertIndex + 1),
                  ]
                : [...value, def_value]

        onChange(newList)

        setTab(def_value.id as number)
    }

    const removeTab = (tab_id: number) => {
        if (!window.confirm("Вы действительно хотите удалить?")) {
            return
        }

        const new_value = value.filter((item) => item.id !== tab_id)

        onChange(new_value)
        onTabRemove(tab_id)

        if (tab === tab_id) {
            if (new_value[0]) {
                setTab(new_value[0].id as number)
            } else {
                setTab(1)
            }
        }
    }

    const moveTab = (tabId: number, direction: -1 | 1) => {
        const fromIndex = value.findIndex((item) => item.id === tabId)

        if (fromIndex < 0) {
            return
        }

        const toIndex = fromIndex + direction

        if (toIndex < 0 || toIndex >= value.length) {
            return
        }

        onChange(arrayMoveImmutable(value, fromIndex, toIndex))
    }

    const sortTabs = (fromIndex: number, toIndex: number) => {
        if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= value.length ||
            toIndex >= value.length ||
            fromIndex === toIndex
        ) {
            return
        }

        onChange(arrayMoveImmutable(value, fromIndex, toIndex))
    }

    return {
        tab,
        setTab,
        addTab,
        removeTab,
        moveTab,
        sortTabs,
    }
}

export default useTabs
