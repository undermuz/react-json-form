import { type DragEndEvent } from "@dnd-kit/core"
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
    addTab: () => void
    removeTab: (tab_id: number) => void
    sortTabs: (event: DragEndEvent) => void
}

const useTabs = (props: IUseTabsProps): IUseTabs => {
    const { value, defValue, onChange, onTabRemove } = props

    const [tab, setTab] = useState<number>(() => {
        if (value.length > 0) return value[0].id as number

        return 1
    })

    const addTab = () => {
        let maxId = Math.max(...value.map((item) => item.id))

        if (isNaN(maxId) || !isFinite(maxId) || maxId < 0) {
            maxId = 0
        }

        const def_value = {
            ...defValue,
            id: maxId + 1,
        }

        const newList = [...value, def_value]

        onChange(newList)

        setTab(newList[newList.length - 1].id as number)
    }

    const removeTab = (tab_id: number) => {
        // if (value.length <= 1) {
        //     window.alert("Вы не можете удалить самое первое значение")
        //     return
        // }

        if (!window.confirm("Вы действительно хотите удалить?")) {
            return
        }

        const new_value = value.filter((tab) => tab.id !== tab_id)

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

    const sortTabs = (event: DragEndEvent) => {
        const { active, over } = event

        if (active && over && active.id !== over.id) {
            if (over.id === "trash") {
                removeTab(active.id as number)

                return
            }

            const oldIndex = value.findIndex(
                (_i) => _i.id === (active.id as number)
            )

            const newIndex = value.findIndex(
                (_i) => _i.id === (over.id as number)
            )

            onChange(arrayMoveImmutable(value, oldIndex, newIndex))
        }
    }

    return {
        tab,
        setTab,
        addTab,
        removeTab,
        sortTabs,
    }
}

export default useTabs
