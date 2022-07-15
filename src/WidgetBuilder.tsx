/*SYSTEM IMPORTS*/
import React, { ReactNode, useCallback } from "react"
import { ErrorBoundary } from "react-error-boundary"

/* UI */
import { Box, Heading, Tag } from "grommet"

/* TYPES */
import { FunctionOnChange, IScheme, TypeValue, TypeValueItem } from "./types"

/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback"

import Widget from "./Widget"
import MultipleWidget from "./MultipleWidget"

/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils"

interface IWidgetBuilderParams {
    value: TypeValue
    primary?: boolean
    header?: ReactNode
    onChange: FunctionOnChange
}

type IWidgetBuilder = IWidgetBuilderParams &
    Partial<Pick<IScheme, "id" | "title">> &
    Pick<IScheme, "multiple" | "scheme">

const WidgetBuilder: React.FC<IWidgetBuilder> = (props) => {
    const {
        id,
        title = false,
        header = null,
        multiple = false,
        primary = false,
        scheme = [],
        onChange,
    } = props

    const defValue = useDefSchemeValue(scheme)

    const value = useSafeValue(props.value, defValue, multiple)

    const handleChange = useCallback(
        (newValue: Record<string, any>) => {
            onChange({ ...value, ...newValue })
        },
        [value, onChange]
    )

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >
            {Boolean(title) && (
                <Box
                    width={"100%"}
                    direction="row"
                    pad={"small"}
                    justify="between"
                    background={primary ? "brand" : "light-6"}
                >
                    <Box direction="row" justify="start" gap="small">
                        <Heading level={3} margin="none">
                            {title}
                        </Heading>

                        {Boolean(id) && <Tag value={`#${id}`} />}
                    </Box>

                    {header}
                </Box>
            )}

            <Box pad={"small"}>
                {multiple && (
                    <MultipleWidget
                        scheme={scheme}
                        defValue={defValue}
                        value={value as TypeValueItem[]}
                        onChange={onChange}
                    />
                )}

                {!multiple && (
                    <Widget
                        scheme={scheme}
                        value={value as TypeValueItem}
                        onChange={handleChange}
                    />
                )}
            </Box>
        </ErrorBoundary>
    )
}

export default WidgetBuilder
