/*SYSTEM IMPORTS*/
import {
    Children,
    createContext,
    forwardRef,
    useEffect,
    type FC,
    type PropsWithChildren,
} from "react"
import type React from "react"
import { useCallback, useMemo, useState } from "react"

import type {
    IJsonFormRef,
    IJsonFormRefArray,
    IJsonFormRefObject,
    ISchemeItem,
    IUiTabProps,
    TypeErrorItem,
    TypeValueItem,
} from "./types"

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
import { useJsonFormUi } from "./UiContext"
import type { IErrors } from "@undermuz/use-form"
import ArrayFormItem from "./ArrayFormItem"
import useTabs, { type IUseTabs } from "./utils/useTabs"
import type { IChildFormRefs } from "./FlatForm"

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

const ArrayFormStack: FC<IArrayFormParams> = (props) => {
    const {
        value,
        addTab,
        removeTab,
        changeTab,
        setTabErrors,
        fillArrayDefault,
        onRef,
        ...rest
    } = props

    const Ui = useJsonFormUi()

    if (!value.length) {
        return (
            <Ui.ArrayForm style={{ position: "relative", zIndex: 1 }}>
                <Ui.ArrayForm.Header>
                    <Ui.ArrayForm.Tabs actions>
                        <Ui.Tab onSelect={addTab}>
                            <Ui.Icons.Tabs.Add title="add-tab" />
                        </Ui.Tab>
                    </Ui.ArrayForm.Tabs>
                </Ui.ArrayForm.Header>

                <Ui.ArrayForm.Body></Ui.ArrayForm.Body>
            </Ui.ArrayForm>
        )
    }

    return (
        <>
            {value.map((item, index) => {
                return (
                    <Ui.ArrayForm
                        key={item.id}
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        <Ui.ArrayForm.Header>
                            <Ui.ArrayForm.Tabs>
                                <Ui.Tab active>{`#${index + 1}`}</Ui.Tab>
                            </Ui.ArrayForm.Tabs>

                            <Ui.ArrayForm.Tabs actions>
                                {(!fillArrayDefault || value.length > 1) && (
                                    <Ui.Tab onSelect={() => removeTab(item.id)}>
                                        <Ui.Icons.Tabs.Remove title="remove-tab" />
                                    </Ui.Tab>
                                )}

                                <Ui.Tab onSelect={addTab}>
                                    <Ui.Icons.Tabs.Add title="add-tab" />
                                </Ui.Tab>
                            </Ui.ArrayForm.Tabs>
                        </Ui.ArrayForm.Header>

                        <Ui.ArrayForm.Body>
                            <ArrayFormItem
                                {...rest}
                                isShow
                                id={item.id}
                                value={item}
                                onRef={onRef}
                                onChange={changeTab}
                                onError={setTabErrors}
                            />
                        </Ui.ArrayForm.Body>
                    </Ui.ArrayForm>
                )
            })}
        </>
    )
}
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

const ArrayFormTabs: FC<IArrayFormParams> = (props) => {
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
const ArrayForm = forwardRef<IJsonFormRef, PropsWithChildren & IArrayForm>(
    (props, ref) => {
        const {
            id,
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
                changeTab: change,
                setTabErrors: setErrors,
                onRef: ({ id: itemId, ref }) => {
                    console.log(`[ArrayForm: ${id}][onRef]`, itemId, ref)

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

            const indexes = Object.keys(childForms)

            console.log(`[ArrayForm: ${id}][on: childForms]`, indexes)

            setRef(
                indexes.map((index) => {
                    const ref = childForms[index]

                    console.log(
                        `[ArrayForm: ${id}][on: childForms][#${index}]`,
                        ref
                    )

                    return ref as IJsonFormRefObject
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
