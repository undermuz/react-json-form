/*SYSTEM IMPORTS*/
import type React from "react"
import {
    type FC,
    memo,
    useEffect,
    type PropsWithChildren,
    Children,
    createContext,
    useMemo,
} from "react"

/* HELPERS */
import type { FieldTests, ISchemeItem, TypeValueItem } from "./types"
import { EnumSchemeItemType } from "./types"
import { getDefValueForItem, useSchemeToForm } from "./utils"

import type { IErrors, IValues } from "@undermuz/use-form"
import useForm, { FormContext } from "@undermuz/use-form"
import FormField from "./FormField"
import JsonFormLayout from "./components/JsonFormLayout"

export type IFlatFormParams = {
    scheme: ISchemeItem[]
    isFormPrimary: boolean
    level: number
    isShow?: boolean
}

export type IFlatFormFieldsParams = {
    scheme: ISchemeItem[]
    isFormPrimary: boolean
    level: number
}

export type IFormFieldsParams = {
    except?: string[]
}

export const FlatFormContext = createContext<IFlatFormParams>({
    scheme: [],
    isShow: true,
    isFormPrimary: true,
    level: 1,
})

const DEF_EXCEPT = []

export const FieldsList: FC<IFlatFormFieldsParams & IFormFieldsParams> = (
    props
) => {
    const { scheme, isFormPrimary, level, except = DEF_EXCEPT } = props

    const fields = useMemo(() => {
        if (except.length === 0) return scheme

        return scheme.filter((s) => !except.includes(s.name))
    }, [except, scheme])

    return (
        <>
            {fields.map((schemeItem, index) => {
                return (
                    <FormField
                        {...schemeItem}
                        key={index}
                        level={level}
                        isFormPrimary={isFormPrimary}
                        isLast={index === scheme.length - 1}
                    />
                )
            })}
        </>
    )
}

const FieldsBlock: FC<PropsWithChildren & IFlatFormParams> = memo((props) => {
    const { scheme, isFormPrimary, level, children: _children } = props

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
                    isFormPrimary={isFormPrimary}
                />
            </JsonFormLayout.Form>
        )

    return (
        <FlatFormContext.Provider value={value}>
            {children}
        </FlatFormContext.Provider>
    )
})

FieldsBlock.displayName = "FieldsBlock"

const FlatForm: React.FC<
    PropsWithChildren & {
        isShow?: boolean
        primary?: boolean
        level: number
        scheme: ISchemeItem[]
        value: TypeValueItem
        tests?: FieldTests
        onChange: (v: IValues) => void
        onError: (v: IErrors) => void
    }
> = (props) => {
    const {
        scheme,
        value,
        level,
        children,
        isShow = true,
        primary = false,
        tests,
        onChange,
        onError,
    } = props

    const formConfig = useSchemeToForm({
        scheme,
        value,
        tests,
        onChange,
        onError,
    })

    const form = useForm(formConfig)

    /* Set default values */
    useEffect(() => {
        const new_value: TypeValueItem = {}

        for (const schemeItem of scheme) {
            const { name, type = EnumSchemeItemType.Text } = schemeItem

            const def_value = getDefValueForItem(schemeItem)

            if (value[name] || type === EnumSchemeItemType.Checkbox) {
                continue
            }

            new_value[name] = def_value
        }

        onChange({ ...value, ...new_value })
    }, [])

    return (
        <FormContext.Provider value={form}>
            <FieldsBlock
                level={level}
                isShow={isShow}
                scheme={scheme}
                isFormPrimary={primary}
            >
                {children}
            </FieldsBlock>
        </FormContext.Provider>
    )
}

export default FlatForm
