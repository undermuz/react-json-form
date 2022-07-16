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

import { ISchemeItem, TypeValue, TypeValueItem } from "./types"

import { isArray } from "underscore"

import { Box, Text, BoxExtendedProps } from "grommet"

import { Add } from "grommet-icons"

import styled, { css } from "styled-components"

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

interface StyledTabProps {
    active?: boolean
}

const StyledTab = styled(Box)<StyledTabProps>`
    ${({ active, theme }) => css`
        background-color: ${theme.global.colors["light-4"]};

        ${active && `background-color: ${theme.global.colors["accent-4"]};`}

        user-select: none;
    `}
`

const TrashContainer = styled(Box)`
    position: absolute;
    z-index: 2;
    top: -60px;
    left: 0px;
    width: 100%;
`

interface SortableTabProps {
    tabId: number
}

const SortableTab: FC<SortableTabProps & StyledTabProps & BoxExtendedProps> = ({
    tabId,
    ...props
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: tabId })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <StyledTab
            {...props}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        />
    )
}

const TrashDroppable: FC = () => {
    const { isOver, setNodeRef } = useDroppable({
        id: "trash",
    })

    return (
        <TrashContainer
            ref={setNodeRef}
            animation={{ type: "fadeIn", duration: 300 }}
            border={{
                color: "status-critical",
                size: "small",
                style: "dashed",
            }}
            background={{
                color: isOver ? "status-critical" : "light-2",
            }}
            pad="xsmall"
        >
            <Text>Отпустите чтобы удалить</Text>
        </TrashContainer>
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
                        <SortableTab tabId={activeId as number}>
                            <Box pad={"xsmall"}>
                                <Text>#{currentIndex + 1}</Text>
                            </Box>
                        </SortableTab>
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
    value: TypeValue
    scheme: ISchemeItem[]
    onChange: Function
}

const WidgetItem: React.FC<IWidgetItem> = (props) => {
    const { id, value, scheme, onChange } = props

    useEffect(() => {
        if (!id) {
            console.error("WidgetItem: props id is required")
        }
    }, [])

    const handleChange = (newValue: TypeValue) => {
        onChange(newValue, id)
    }

    return <FlatForm scheme={scheme} value={value} onChange={handleChange} />
}

interface IArrayForm {
    value: TypeValueItem[]
    defValue: TypeValueItem
    scheme: ISchemeItem[]
    onChange: Function
}

const ArrayForm: React.FC<IArrayForm> = (props) => {
    const { value, scheme, defValue, onChange } = props

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
        <Box direction="column" style={{ position: "relative", zIndex: 1 }}>
            <Box direction="row">
                <Box direction="row">
                    <SortableList tabs={tabs} onSortEnd={handleSortTabs}>
                        {tabs.map((val, index) => (
                            <SortableTab
                                key={val.id}
                                tabId={val.id}
                                hoverIndicator
                                active={tab === val.id}
                                onClick={() => setTab(val.id)}
                            >
                                <Box pad={"xsmall"}>
                                    <Text>#{index + 1}</Text>
                                </Box>
                            </SortableTab>
                        ))}
                    </SortableList>
                </Box>

                <StyledTab hoverIndicator onClick={handleAddTab}>
                    <Box pad={"xsmall"}>
                        <Add />
                    </Box>
                </StyledTab>
            </Box>

            {currentItem !== null && (
                <WidgetItem
                    id={currentItem.id}
                    scheme={scheme}
                    value={currentItem}
                    onChange={handleChange}
                />
            )}
        </Box>
    )
}

export default ArrayForm
