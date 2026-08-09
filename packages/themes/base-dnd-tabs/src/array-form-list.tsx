import {
    type FC,
    type PropsWithChildren,
    type CSSProperties,
} from "react"
import type { DragEndEvent } from "@dnd-kit/react"
import {
    DragDropProvider,
    DragOverlay,
    PointerSensor,
    useDragOperation,
    useDroppable,
} from "@dnd-kit/react"
import { PointerActivationConstraints } from "@dnd-kit/dom"
import { closestCenter, pointerIntersection } from "@dnd-kit/collision"
import { useSortable } from "@dnd-kit/react/sortable"
import {
    ArrayFormItem,
    useJsonFormUi,
    type IArrayFormParams,
    type TypeValueItem,
} from "@undermuz/react-json-form"

const ITEM_TYPE = "array-form-item"

type ItemList = (TypeValueItem & { id: number })[]

interface SortableItemProps {
    itemId: number
    index: number
    style?: CSSProperties
}

const SortableItem: FC<PropsWithChildren<SortableItemProps>> = ({
    itemId,
    index,
    style,
    children,
}) => {
    const { ref } = useSortable({
        id: itemId,
        index,
        type: ITEM_TYPE,
        accept: ITEM_TYPE,
        collisionDetector: closestCenter,
    })

    return (
        <div ref={ref} style={style}>
            {children}
        </div>
    )
}

const TrashDroppable: FC = () => {
    const Ui = useJsonFormUi()

    const { isDropTarget, ref } = useDroppable({
        id: "trash",
        accept: ITEM_TYPE,
        collisionDetector: pointerIntersection,
    })

    if (!Ui?.ArrayForm?.TrashContainer) {
        return null
    }

    return (
        <Ui.ArrayForm.TrashContainer
            isOver={isDropTarget}
            ref={ref}
            label="Отпустите чтобы удалить"
        />
    )
}

const TrashDroppableWhenDragging: FC = () => {
    const { source } = useDragOperation()

    if (!source) {
        return null
    }

    return <TrashDroppable />
}

interface ISortableList {
    items: ItemList
    onSortEnd: (event: DragEndEvent) => void
}

const SortableList: FC<PropsWithChildren<ISortableList>> = ({
    items,
    onSortEnd,
    children,
}) => {
    const Ui = useJsonFormUi()

    return (
        <DragDropProvider
            sensors={(defaults) => [
                ...defaults.filter((sensor) => sensor !== PointerSensor),
                PointerSensor.configure({
                    activationConstraints: [
                        new PointerActivationConstraints.Distance({
                            value: 20,
                        }),
                    ],
                }),
            ]}
            onDragEnd={onSortEnd}
        >
            {children}

            <DragOverlay>
                {(source) => {
                    const currentIndex = items.findIndex(
                        (_i) => _i.id === source.id,
                    )

                    if (!Ui?.Tab || currentIndex < 0) {
                        return null
                    }

                    return <Ui.Tab label={`#${currentIndex + 1}`} />
                }}
            </DragOverlay>

            <TrashDroppableWhenDragging />
        </DragDropProvider>
    )
}

export const ArrayFormList: FC<IArrayFormParams> = (props) => {
    const {
        id,
        value,
        addTab,
        removeTab,
        changeTab,
        setTabErrors,
        sortTabs,
        fillArrayDefault,
        onRef,
        ...rest
    } = props

    const items = value as ItemList
    const Ui = useJsonFormUi()

    const onSortEnd = (event: DragEndEvent) => {
        if (event.canceled) {
            return
        }

        const { source, target } = event.operation

        if (!source) {
            return
        }

        if (target?.id === "trash") {
            removeTab(source.id as number)
            return
        }

        if (!target) {
            return
        }

        const fromIndex = items.findIndex((item) => item.id === source.id)
        const toIndex = items.findIndex((item) => item.id === target.id)

        sortTabs(fromIndex, toIndex)
    }

    if (!value.length) {
        if (!Ui?.ArrayForm || !Ui.Tab || !Ui.Icons) return null

        return (
            <Ui.ArrayForm style={{ position: "relative", zIndex: 1 }}>
                <Ui.ArrayForm.Header>
                    <Ui.ArrayForm.Tabs actions>
                        <Ui.Tab onSelect={() => addTab()}>
                            <Ui.Icons.Tabs.Add title="add-tab" />
                        </Ui.Tab>
                    </Ui.ArrayForm.Tabs>
                </Ui.ArrayForm.Header>

                <Ui.ArrayForm.Body></Ui.ArrayForm.Body>
            </Ui.ArrayForm>
        )
    }

    if (!Ui?.ArrayForm || !Ui.Tab || !Ui.Icons) {
        return (
            <>
                {value.map((item, index) => {
                    if (!item.id) {
                        console.error("ERROR: item.id is required")

                        return <p key={index}>ERROR: item.id is required</p>
                    }

                    return (
                        <ArrayFormItem
                            {...rest}
                            key={item.id}
                            isShow
                            parentId={id}
                            id={item.id}
                            value={item}
                            onRef={onRef}
                            onChange={changeTab}
                            onError={setTabErrors}
                        />
                    )
                })}
            </>
        )
    }

    const ArrayFormUi = Ui.ArrayForm
    const Tab = Ui.Tab
    const Icons = Ui.Icons

    return (
        <SortableList items={items} onSortEnd={onSortEnd}>
            {value.map((item, index) => {
                if (!item.id) {
                    console.error("ERROR: item.id is required")

                    return <p key={index}>ERROR: item.id is required</p>
                }

                return (
                    <SortableItem
                        key={item.id}
                        itemId={item.id}
                        index={index}
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        <ArrayFormUi>
                            <ArrayFormUi.Header>
                                <ArrayFormUi.Tabs>
                                    <Tab active>{`#${index + 1}`}</Tab>
                                </ArrayFormUi.Tabs>

                                <ArrayFormUi.Tabs actions>
                                    {(!fillArrayDefault ||
                                        value.length > 1) && (
                                        <Tab
                                            onSelect={() =>
                                                removeTab(item.id)
                                            }
                                        >
                                            <Icons.Tabs.Remove title="remove-tab" />
                                        </Tab>
                                    )}

                                    <Tab onSelect={() => addTab(item.id)}>
                                        <Icons.Tabs.Add title="add-tab" />
                                    </Tab>
                                </ArrayFormUi.Tabs>
                            </ArrayFormUi.Header>

                            <ArrayFormUi.Body>
                                <ArrayFormItem
                                    {...rest}
                                    isShow
                                    parentId={id}
                                    id={item.id}
                                    value={item}
                                    onRef={onRef}
                                    onChange={changeTab}
                                    onError={setTabErrors}
                                />
                            </ArrayFormUi.Body>
                        </ArrayFormUi>
                    </SortableItem>
                )
            })}
        </SortableList>
    )
}

export default ArrayFormList
