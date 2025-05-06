/*SYSTEM IMPORTS*/
import {
    useEffect,
    type PropsWithChildren,
    createContext,
    forwardRef,
    useRef,
    useCallback,
} from "react"

import type { IErrors, IValues } from "@undermuz/use-form"
import useForm, { FormContext } from "@undermuz/use-form"

/* HELPERS */
import type {
    FieldTests,
    IJsonFormRef,
    ISchemeItem,
    TypeValueItem,
} from "../types"
import { EnumSchemeItemType } from "../types"
import { getDefValueForItem, useFieldsScheme, useSchemeToForm } from "../utils"

import {
    type IChildFormRef,
    type IChildFormRefs,
    type IChildFormsSetRef,
    useFlatRef,
} from "./useFlatRef"

import { FieldsBlock } from "./FieldsBlock"

export type IFlatFormParams = {
    scheme: ISchemeItem[]
    isFormPrimary: boolean
    level: number
    isShow?: boolean
    isLoading?: boolean
    onFormsRef?: IChildFormsSetRef
}

export type IFlatFormFieldsParams = {
    scheme: ISchemeItem[]
    isFormPrimary: boolean
    level: number
    onFormsRef?: IChildFormsSetRef
}

export type FlatFormProps = {
    id: string
    isLoading?: boolean
    isShow?: boolean
    primary?: boolean
    level: number
    scheme: ISchemeItem[]
    value: TypeValueItem
    tests?: FieldTests
    onChange: (v: IValues) => void
    onError: (v: IErrors) => void
}

export const FlatFormContext = createContext<IFlatFormParams>({
    scheme: [],
    isShow: true,
    isFormPrimary: true,
    isLoading: false,
    level: 1,
})

const FlatForm = forwardRef<IJsonFormRef, PropsWithChildren & FlatFormProps>(
    (props, ref) => {
        const {
            id,
            scheme,
            value,
            level,
            children,
            isShow = true,
            isLoading = false,
            primary = false,
            tests,
            onChange,
            onError,
        } = props

        const fieldsScheme = useFieldsScheme(scheme)

        const formConfig = useSchemeToForm({
            scheme: fieldsScheme,
            value,
            tests,
            onChange,
            onError,
        })

        const form = useForm(formConfig)
        const childFormsRef = useRef<IChildFormRefs>({})

        const onChildRef: IChildFormsSetRef = useCallback(
            (params: IChildFormRef) => {
                if (!params.ref) {
                    delete childFormsRef.current[params.id]

                    return
                }

                childFormsRef.current[params.id] = params.ref
            },
            []
        )

        /* Set default values */
        useEffect(() => {
            let shouldUpdate = false

            const new_value: TypeValueItem = {}

            for (const schemeItem of fieldsScheme) {
                const { name, type = EnumSchemeItemType.Text } = schemeItem

                const def_value = getDefValueForItem(schemeItem)

                if (
                    value[name] !== undefined ||
                    type === EnumSchemeItemType.Checkbox
                ) {
                    continue
                }

                new_value[name] = def_value
                shouldUpdate = true
            }

            if (shouldUpdate) onChange({ ...value, ...new_value })
        }, [])

        useFlatRef(id, ref, form, childFormsRef)

        return (
            <FormContext.Provider value={form}>
                <FieldsBlock
                    level={level}
                    isShow={isShow}
                    isLoading={isLoading}
                    scheme={scheme}
                    isFormPrimary={primary}
                    onFormsRef={onChildRef}
                >
                    {children}
                </FieldsBlock>
            </FormContext.Provider>
        )
    }
)

FlatForm.displayName = "FlatForm"

export default FlatForm
