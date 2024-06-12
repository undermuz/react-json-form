import { type FC, memo, type PropsWithChildren, Children, useMemo } from "react"
import { nonFieldTypes } from "../utils"
import JsonFormLayout from "../components/JsonFormLayout"

import FormField from "./FormField"
import FormItem from "./FormItem"

import {
    type IFlatFormFieldsParams,
    type IFlatFormParams,
    FlatFormContext,
} from "./FlatForm"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "../components/ErrorFallback"

export type IFormFieldsParams = {
    except?: string[]
    include?: string[]
    isLoading?: boolean
}

const DEF_EXCEPT = []

export const FieldsList: FC<IFlatFormFieldsParams & IFormFieldsParams> = (
    props
) => {
    const {
        scheme,
        isFormPrimary,
        isLoading = false,
        level,
        except = DEF_EXCEPT,
        include = DEF_EXCEPT,
        onFormsRef,
    } = props

    const fields = useMemo(() => {
        const fields = scheme /* .filter(
            (s) => s.type && !nonFieldTypes.includes(s.type)
        ) */

        if (include?.length > 0)
            return fields.filter((s) => include.includes(s.name))

        if (except?.length > 0)
            return fields.filter((s) => !except.includes(s.name))

        return fields
    }, [except, scheme])

    return (
        <>
            {fields.map((schemeItem, index) => {
                const isField =
                    schemeItem.type && !nonFieldTypes.includes(schemeItem.type)

                if (!isField)
                    return (
                        <ErrorBoundary
                            key={index}
                            FallbackComponent={ErrorFallback}
                            onReset={() => {
                                // reset the state of your app so the error doesn't happen again
                            }}
                        >
                            <FormItem
                                key={index}
                                {...schemeItem}
                                level={level}
                                isLoading={isLoading}
                                isFormPrimary={isFormPrimary}
                                isLast={index === scheme.length - 1}
                            />
                        </ErrorBoundary>
                    )

                return (
                    <ErrorBoundary
                        key={index}
                        FallbackComponent={ErrorFallback}
                        onReset={() => {
                            // reset the state of your app so the error doesn't happen again
                        }}
                    >
                        <FormField
                            {...schemeItem}
                            onFormsRef={onFormsRef}
                            level={level}
                            isFormPrimary={isFormPrimary}
                            isLast={index === scheme.length - 1}
                        />
                    </ErrorBoundary>
                )
            })}
        </>
    )
}

export const FieldsBlock: FC<PropsWithChildren & IFlatFormParams> = memo(
    (props) => {
        const {
            scheme,
            isFormPrimary,
            isLoading = false,
            level,
            children: _children,
            onFormsRef,
        } = props

        const value = useMemo<IFlatFormParams>(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { children, ...rest } = props

            return rest
        }, Object.values(props))

        const count = Children.count(_children)

        const children =
            count > 0 ? (
                _children
            ) : (
                <JsonFormLayout.Form>
                    <FieldsList
                        scheme={scheme}
                        level={level}
                        isLoading={isLoading}
                        isFormPrimary={isFormPrimary}
                        onFormsRef={onFormsRef}
                    />
                </JsonFormLayout.Form>
            )

        return (
            <FlatFormContext.Provider value={value}>
                {children}
            </FlatFormContext.Provider>
        )
    }
)
FieldsBlock.displayName = "FieldsBlock"
