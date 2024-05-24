import { type FC, type PropsWithChildren } from "react"
import type React from "react"
import { useCallback, useMemo, useState } from "react"
import type { IUiTabProps, TypeValueItem } from "../types"
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
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { createPortal } from "react-dom"
import { useJsonFormUi } from "../contexts/ui"
import ArrayFormItem from "./ArrayFormItem"
import { type IArrayFormParams } from "./ArrayForm"

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

            // console.log(`[collisionDetectionStrategy][Over: ${overId}]`, args)
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
export const ArrayFormTabs: FC<IArrayFormParams> = (props) => {
    const {
        value,
        tab,
        addTab,
        removeTab,
        changeTab,
        setTabErrors,
        sortTabs,
        setTab,
        fillArrayDefault,
        onRef,
        ...rest
    } = props

    const tabs = value as TabList

    const Ui = useJsonFormUi()

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
                    {(!fillArrayDefault || value.length > 1) && (
                        <Ui.Tab onSelect={() => removeTab(tab)}>
                            <Ui.Icons.Tabs.Remove />
                        </Ui.Tab>
                    )}
                    <Ui.Tab onSelect={addTab}>
                        <Ui.Icons.Tabs.Add />
                    </Ui.Tab>
                </Ui.ArrayForm.Tabs>
            </Ui.ArrayForm.Header>

            <Ui.ArrayForm.Body>
                {value.map((item) => {
                    return (
                        <ArrayFormItem
                            {...rest}
                            key={item.id}
                            id={item.id}
                            isShow={item.id === tab}
                            value={item}
                            onRef={onRef}
                            onChange={changeTab}
                            onError={setTabErrors}
                        />
                    )
                })}
            </Ui.ArrayForm.Body>
        </Ui.ArrayForm>
    )
}
