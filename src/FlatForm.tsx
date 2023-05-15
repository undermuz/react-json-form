/*SYSTEM IMPORTS*/
import {
    type FC,
    memo,
    useEffect,
    type PropsWithChildren,
    Children,
    createContext,
    useMemo,
    forwardRef,
    useRef,
    useCallback,
} from "react"

/* HELPERS */
import type {
    FieldTests,
    IJsonFormRef,
    IJsonFormRefObject,
    ISchemeItem,
    TypeValueItem,
} from "./types"
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
    onFormsRef?: IChildFormsSetRef
}

export type IFlatFormFieldsParams = {
    scheme: ISchemeItem[]
    isFormPrimary: boolean
    level: number
    onFormsRef?: IChildFormsSetRef
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
    const {
        scheme,
        isFormPrimary,
        level,
        except = DEF_EXCEPT,
        onFormsRef,
    } = props

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
                        onFormsRef={onFormsRef}
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
    const {
        scheme,
        isFormPrimary,
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
})

FieldsBlock.displayName = "FieldsBlock"

type FlatFormProps = {
    id?: string
    name?: string
    isShow?: boolean
    primary?: boolean
    level: number
    scheme: ISchemeItem[]
    value: TypeValueItem
    tests?: FieldTests
    onChange: (v: IValues) => void
    onError: (v: IErrors) => void
}

export interface IChildFormRef {
    id: string
    ref: IJsonFormRef | null
}

export interface IChildFormRefs {
    [s: string]: IJsonFormRef
}

export type IChildFormsSetRef = (ref: IChildFormRef) => void

const FlatForm = forwardRef<IJsonFormRef, PropsWithChildren & FlatFormProps>(
    (props, ref) => {
        const {
            id,
            name: _name,
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

        const name = useMemo(() => {
            return _name || id || "(unnamed)"
        }, [_name, id])

        const form = useForm(formConfig)
        const childFormsRef = useRef<IChildFormRefs>({})

        const onChildRef: IChildFormsSetRef = useCallback(
            (params: IChildFormRef) => {
                console.log(
                    `[FlatForm: ${name}][onChildRef][#${params.id}]`,
                    params.ref
                )

                if (!params.ref) {
                    delete childFormsRef.current[params.id]

                    console.log(
                        `[FlatForm: ${name}][onChildRef][#${params.id}][deleted]`,
                        childFormsRef.current
                    )

                    return
                }

                childFormsRef.current[params.id] = params.ref

                console.log(
                    `[FlatForm: ${name}][onChildRef][#${params.id}][defined]`,
                    childFormsRef.current
                )
            },
            []
        )

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

        /* Ref */
        useEffect(() => {
            const setRef = (value: IJsonFormRefObject | null) => {
                if (typeof ref === "function") {
                    ref(value)
                } else if (ref !== null) {
                    ref.current = value
                }
            }

            setRef({
                validate(checkOnlyFilled = true) {
                    const [hasErrors, formErrors] =
                        form.hasFormErrors(checkOnlyFilled)

                    const childRefs = Object.values(childFormsRef.current)

                    console.log(
                        `[FlatForm: ${name}][ref][validate][child forms]`,
                        childFormsRef.current
                    )

                    for (const childRef of childRefs) {
                        if (Array.isArray(childRef)) {
                            for (const child of childRef) {
                                child.validate(checkOnlyFilled)
                            }

                            continue
                        }

                        childRef.validate(checkOnlyFilled)
                    }

                    if (hasErrors) {
                        form.validate(checkOnlyFilled)

                        return formErrors
                    }

                    return null
                },
                values() {
                    return form.getValues()
                },
                errors() {
                    return form.getErrors()
                },
            })

            return () => {
                setRef(null)
            }
        }, [])

        return (
            <FormContext.Provider value={form}>
                <FieldsBlock
                    level={level}
                    isShow={isShow}
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
