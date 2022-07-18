/*SYSTEM IMPORTS*/
import React, {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react"

import FlatForm from "./FlatForm"

import { ISchemeItem, IUiTabProps, TypeValue, TypeValueItem } from "./types"

import { isArray } from "underscore"

import {
    closestCenter,
    CollisionDetection,
    DndContext,
    DragEndEvent,
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

            {createPortal(
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

interface IWidgetItem {
    id: number
    primary?: boolean
    value: TypeValue
    scheme: ISchemeItem[]
    onChange: Function
}

const WidgetItem: React.FC<IWidgetItem> = (props) => {
    const { id, value, scheme, primary = false, onChange } = props

    useEffect(() => {
        if (!id) {
            console.error("WidgetItem: props id is required")
        }
    }, [])

    const handleChange = (newValue: TypeValue) => {
        onChange(newValue, id)
    }

    return (
        <FlatForm
            primary={primary}
            scheme={scheme}
            value={value}
            onChange={handleChange}
        />
    )
}

interface IArrayForm {
    value: TypeValueItem[]
    primary?: boolean
    defValue: TypeValueItem
    scheme: ISchemeItem[]
    onChange: Function
}

const ArrayForm: React.FC<IArrayForm> = (props) => {
    const { value, scheme, primary = false, defValue, onChange } = props

    const Ui = useJsonFormUi()

    const tabs = value as TabList

    const [tab, setTab] = useState(() => {
        if (isArray(value) && value.length > 0) {
            return value[0].id
        }

        return 1
    })

    const handleChange = useCallback(
        (newValue: Record<string, any>, id = null) => {
            const _newValue = value.map((item: Record<string, any>) =>
                item.id == id ? { ...item, ...newValue } : item
            )

            console.log("MultipleWidgetItem::handleChange", {
                id,
                item: newValue,
                oldValue: value,
                newValue: _newValue,
            })

            onChange(_newValue)
        },
        [value, onChange]
    )

    const handleAddTab = () => {
        const _value: TypeValueItem[] = value as TypeValueItem[]

        const def_value = {
            ...defValue,
            id: Math.max(..._value.map((item) => item.id)) + 1,
        }

        const newList = [..._value, def_value]

        onChange(newList)

        setTab(newList.length - 1)
    }

    const handleRemoveTab = (tab_id: number) => {
        const _value: TypeValueItem[] = value as TypeValueItem[]

        if (_value.length > 1) {
            if (window.confirm("Вы действительно хотите удалить?")) {
                const new_value = _value.filter((tab) => tab.id != tab_id)

                onChange(new_value)

                if (tab == tab_id) {
                    setTab(new_value[0].id)
                }
            }
        }
    }

    const handleSortTabs = (event: DragEndEvent) => {
        const { active, over } = event

        if (active && over && active.id !== over.id) {
            if (over.id === "trash") {
                handleRemoveTab(active.id as number)

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

    const currentItem = useMemo(() => {
        const item = value.find((_i) => _i.id === tab)

        if (!item) {
            return null
        }

        return item
    }, [value, tab])

    return (
        <Ui.ArrayForm style={{ position: "relative", zIndex: 1 }}>
            <Ui.ArrayForm.Header>
                <Ui.ArrayForm.Tabs>
                    <SortableList tabs={tabs} onSortEnd={handleSortTabs}>
                        {tabs.map((val, index) => (
                            <SortableTab
                                key={val.id}
                                label={`#${index + 1}`}
                                tabId={val.id}
                                active={tab === val.id}
                                onClick={() => setTab(val.id)}
                            />
                        ))}
                    </SortableList>
                </Ui.ArrayForm.Tabs>

                <Ui.ArrayForm.Tabs>
                    <Ui.Tab onClick={() => handleRemoveTab(tab)}>
                        <Ui.Icons.Tabs.Remove />
                    </Ui.Tab>

                    <Ui.Tab onClick={handleAddTab}>
                        <Ui.Icons.Tabs.Add />
                    </Ui.Tab>
                </Ui.ArrayForm.Tabs>
            </Ui.ArrayForm.Header>

            <Ui.ArrayForm.Body>
                {currentItem !== null && (
                    <WidgetItem
                        key={currentItem.id}
                        id={currentItem.id}
                        primary={primary}
                        scheme={scheme}
                        value={currentItem}
                        onChange={handleChange}
                    />
                )}
            </Ui.ArrayForm.Body>
        </Ui.ArrayForm>
    )
}

export default ArrayForm
