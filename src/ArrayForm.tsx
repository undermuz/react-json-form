/*SYSTEM IMPORTS*/
import type { FC, PropsWithChildren } from "react"
import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"

import FlatForm from "./FlatForm"

import type {
    ISchemeItem,
    IUiTabProps,
    TypeErrorItem,
    TypeValueItem,
} from "./types"

import { isArray } from "underscore"

import type { CollisionDetection, DragEndEvent } from "@dnd-kit/core"
import {
    closestCenter,
    DndContext,
    DragOverlay,
    getFirstCollision,
    PointerSensor,
    pointerWithin,
    rectIntersection,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core"

import {
    horizontalListSortingStrategy,
    SortableContext,
} from "@dnd-kit/sortable"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { arrayMoveImmutable } from "array-move"
import { createPortal } from "react-dom"
import { useJsonFormUi } from "./UiContext"
import type { IErrors } from "@undermuz/use-form"

interface SortableTabProps {
    tabId: number
}

const SortableTab: FC<PropsWithChildren<SortableTabProps & IUiTabProps>> = ({
    tabId,
    ...props
}) => {
    const Ui = useJsonFormUi()

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: tabId })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Ui.Tab
            {...props}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        />
    )
}

const TrashDroppable: FC = () => {
    const Ui = useJsonFormUi()

    const { isOver, setNodeRef } = useDroppable({
        id: "trash",
    })

    return (
        <Ui.ArrayForm.TrashContainer
            isOver={isOver}
            ref={setNodeRef}
            label="Отпустите чтобы удалить"
        ></Ui.ArrayForm.TrashContainer>
    )
}

type TabList = (TypeValueItem & { id: number })[]

interface ISortableList {
    tabs: TabList
    onSortEnd: (event: DragEndEvent) => void
}

const SortableList: React.FC<PropsWithChildren<ISortableList>> = ({
    tabs,
    onSortEnd,
    children,
}) => {
    const [activeId, setActiveId] = useState<number | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 20,
            },
        })
    )

    const currentIndex = useMemo(() => {
        return tabs.findIndex((_i) => _i.id === activeId)
    }, [tabs, activeId])

    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
            // Start by finding any intersecting droppable
            const pointerIntersections = pointerWithin(args)

            const intersections =
                pointerIntersections.length > 0
                    ? // If there are droppables intersecting with the pointer, return those
                      pointerIntersections
                    : rectIntersection(args)

            let overId = getFirstCollision(intersections, "id")

            if (overId === "trash") {
                return intersections
            }

            console.log(`[collisionDetectionStrategy][Over: ${overId}]`, args)

            if (overId !== null) {
                return closestCenter(args)
            }

            return []
        },
        [activeId, tabs]
    )

    return (
        <DndContext
            sensors={sensors}
            // collisionDetection={closestCenter}
            collisionDetection={collisionDetectionStrategy}
            // modifiers={[restrictToHorizontalAxis]}
            onDragEnd={(event) => {
                console.log("[onDragEnd]", event)

                setActiveId(null)

                onSortEnd(event)
            }}
            onDragStart={(event) => {
                setActiveId(event.active.id as number)
            }}
        >
            <SortableContext
                id="list"
                items={tabs}
                strategy={horizontalListSortingStrategy}
            >
                {children}
            </SortableContext>

            {typeof document !== "undefined" &&
                createPortal(
                    <DragOverlay>
                        {currentIndex > -1 ? (
                            <SortableTab
                                tabId={activeId as number}
                                label={`#${currentIndex + 1}`}
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}

            {activeId !== null && <TrashDroppable />}
        </DndContext>
    )
}

interface IArrayFormItemProps {
    id: number
    isShow?: boolean
    primary?: boolean
    level: number
    value: TypeValueItem
    scheme: ISchemeItem[]
    onChange: (v: TypeValueItem, id: number | null) => void
    onError: (v: IErrors, id: number) => void
}

const ArrayFormItem: React.FC<IArrayFormItemProps> = (props) => {
    const {
        id,
        value,
        scheme,
        level,
        isShow = true,
        primary = false,
        onChange,
        onError,
    } = props

    useEffect(() => {
        if (!id) {
            console.error("ArrayFormItem: props id is required")
        }
    }, [])

    const change = useCallback(
        (newValue: TypeValueItem) => {
            onChange(newValue, id)
        },
        [id, onChange]
    )

    const setErrors = useCallback(
        (newErrors: IErrors) => {
            onError(newErrors, id)
        },
        [id, onError]
    )

    return (
        <FlatForm
            level={level}
            isShow={isShow}
            primary={primary}
            scheme={scheme}
            value={value}
            onChange={change}
            onError={setErrors}
        />
    )
}

interface IUseTabsProps {
    value: TypeValueItem[]
    errors: TypeErrorItem[]

    defValue: TypeValueItem

    onChange: (v: TypeValueItem[]) => void
    onError: (v: TypeErrorItem[]) => void
}

const useTabs = (props: IUseTabsProps) => {
    const { value, errors, defValue, onChange, onError } = props

    const [tab, setTab] = useState(() => {
        if (value.length > 0) return value[0].id

        return 1
    })

    const addTab = () => {
        const def_value = {
            ...defValue,
            id: Math.max(...value.map((item) => item.id)) + 1,
        }

        const newList = [...value, def_value]

        onChange(newList)

        setTab(newList.length - 1)
    }

    const removeTab = (tab_id: number) => {
        if (value.length <= 1) {
            return
        }

        if (!window.confirm("Вы действительно хотите удалить?")) {
            return
        }

        const new_value = value.filter((tab) => tab.id != tab_id)

        onChange(new_value)
        /* TODO: Remove from errors too */

        if (tab === tab_id) {
            setTab(new_value[0].id)
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

interface IArrayForm {
    value: TypeValueItem[]
    errors: TypeErrorItem[]
    viewType?: string
    primary?: boolean
    level: number
    defValue: TypeValueItem
    scheme: ISchemeItem[]
    onChange: (v: TypeValueItem[]) => void
    onError: (v: TypeErrorItem[]) => void
}

const ArrayForm: React.FC<IArrayForm> = (props) => {
    const {
        value: _value,
        errors,
        scheme,
        primary = false,
        viewType = "stack",
        level,
        defValue,
        onChange,
        onError,
    } = props

    const Ui = useJsonFormUi()

    const value = useMemo(() => {
        if (!Array.isArray(_value)) return []

        return _value
    }, [_value])

    const tabs = value as TabList

    const { tab, setTab, addTab, removeTab, sortTabs } = useTabs(props)

    const change = useCallback(
        (newValue: TypeValueItem, id: number | null = null) => {
            const _newValue = value.map((item) =>
                item.id == id ? { ...item, ...newValue } : item
            )

            onChange(_newValue)
        },
        [value, onChange]
    )

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

    if (viewType === "stack") {
        return (
            <>
                {value.map((item, index) => {
                    return (
                        <Ui.ArrayForm
                            style={{ position: "relative", zIndex: 1 }}
                            key={item.id}
                        >
                            <Ui.ArrayForm.Header>
                                <Ui.ArrayForm.Tabs>
                                    <Ui.Tab active>{`#${index + 1}`}</Ui.Tab>
                                </Ui.ArrayForm.Tabs>

                                <Ui.ArrayForm.Tabs actions>
                                    <Ui.Tab onSelect={() => removeTab(tab)}>
                                        <Ui.Icons.Tabs.Remove />
                                    </Ui.Tab>

                                    <Ui.Tab onSelect={addTab}>
                                        <Ui.Icons.Tabs.Add />
                                    </Ui.Tab>
                                </Ui.ArrayForm.Tabs>
                            </Ui.ArrayForm.Header>

                            <Ui.ArrayForm.Body>
                                <ArrayFormItem
                                    isShow
                                    id={item.id}
                                    level={level}
                                    primary={primary}
                                    scheme={scheme}
                                    value={item}
                                    onChange={change}
                                    onError={setErrors}
                                />
                            </Ui.ArrayForm.Body>
                        </Ui.ArrayForm>
                    )
                })}
            </>
        )
    }

    return (
        <Ui.ArrayForm style={{ position: "relative", zIndex: 1 }}>
            <Ui.ArrayForm.Header>
                <Ui.ArrayForm.Tabs>
                    <SortableList tabs={tabs} onSortEnd={sortTabs}>
                        {tabs.map((val, index) => (
                            <SortableTab
                                key={val.id}
                                label={`#${index + 1}`}
                                tabId={val.id}
                                active={tab === val.id}
                                onSelect={() => setTab(val.id)}
                            />
                        ))}
                    </SortableList>
                </Ui.ArrayForm.Tabs>

                <Ui.ArrayForm.Tabs actions>
                    <Ui.Tab onSelect={() => removeTab(tab)}>
                        <Ui.Icons.Tabs.Remove />
                    </Ui.Tab>

                    <Ui.Tab onSelect={addTab}>
                        <Ui.Icons.Tabs.Add />
                    </Ui.Tab>
                </Ui.ArrayForm.Tabs>
            </Ui.ArrayForm.Header>

            <Ui.ArrayForm.Body>
                {value.map((item) => {
                    return (
                        <ArrayFormItem
                            key={item.id}
                            id={item.id}
                            level={level}
                            isShow={item.id === tab}
                            primary={primary}
                            scheme={scheme}
                            value={item}
                            onChange={change}
                            onError={setErrors}
                        />
                    )
                })}
            </Ui.ArrayForm.Body>
        </Ui.ArrayForm>
    )
}

export default ArrayForm
