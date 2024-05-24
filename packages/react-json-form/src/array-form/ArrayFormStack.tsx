import { type FC } from "react"

import { useJsonFormUi } from "../contexts/ui"
import ArrayFormItem from "./ArrayFormItem"
import { type IArrayFormParams } from "./ArrayForm"

export const ArrayFormStack: FC<IArrayFormParams> = (props) => {
    const {
        id,
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
                                parentId={id}
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
