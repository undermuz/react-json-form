import { type FC, type PropsWithChildren } from "react"
import type React from "react"
import type { IUiTabProps, TypeValueItem } from "../types"
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
import { useJsonFormUi } from "../contexts/ui"
import ArrayFormItem from "./ArrayFormItem"

import { type IArrayFormParams } from "./ArrayForm"

const TAB_TYPE = "tab"

interface SortableTabProps {
    tabId: number
    index: number
}

const SortableTab: FC<PropsWithChildren<SortableTabProps & IUiTabProps>> = ({
    tabId,
    index,
    ...props
}) => {
    const Ui = useJsonFormUi()

    const { ref } = useSortable({
        id: tabId,
        index,
        type: TAB_TYPE,
        accept: TAB_TYPE,
        collisionDetector: closestCenter,
    })

    if (!Ui?.Tab) {
        return null
    }

    return <Ui.Tab {...props} ref={ref} />
}

const TrashDroppable: FC = () => {
    const Ui = useJsonFormUi()

    const { isDropTarget, ref } = useDroppable({
        id: "trash",
        accept: TAB_TYPE,
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
                    const currentIndex = tabs.findIndex(
                        (_i) => _i.id === source.id
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

    const body = value.map((item) => {
        if (!item.id) {
            console.error("ERROR: item.id is required")

            return "ERROR: item.id is required"
        }

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
    })

    if (!Ui?.ArrayForm || !Ui.Tab || !Ui.Icons) return <>{body}</>

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
                                index={index}
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
                    <Ui.Tab onSelect={() => addTab()}>
                        <Ui.Icons.Tabs.Add />
                    </Ui.Tab>
                </Ui.ArrayForm.Tabs>
            </Ui.ArrayForm.Header>

            <Ui.ArrayForm.Body>{body}</Ui.ArrayForm.Body>
        </Ui.ArrayForm>
    )
}
