import type { IErrors, ITouched, UseFormConfig } from "@undermuz/use-form"
import type { IJsonFormRef, IJsonFormRefObject, TypeErrorItem } from "../types"
import type { ForwardedRef, MutableRefObject } from "react"

import { useEffect } from "react"

export interface IChildFormRef {
    id: string
    ref: IJsonFormRef | null
}

export interface IChildFormRefs {
    [s: string]: IJsonFormRef
}

export type IChildFormsSetRef = (ref: IChildFormRef) => void

export const hasErrors = (errors?: IErrors | TypeErrorItem[] | null) =>
    errors !== null && errors !== undefined && Object.keys(errors).length > 0

export const useFlatRef = (
    id: string | number,
    ref: ForwardedRef<IJsonFormRef>,
    form: UseFormConfig,
    childFormsRef: MutableRefObject<IChildFormRefs>
) => {
    useEffect(() => {
        const setRef = (value: IJsonFormRefObject | null) => {
            if (typeof ref === "function") {
                ref(value)
            } else if (ref !== null) {
                ref.current = value
            }
        }

        setRef({
            setTouched(
                newTouched: ITouched | null,
                silent?: boolean,
                checkOnlyFilled?: boolean
            ) {
                const state = form.store.getState()
                const fields = Object.keys(state.fields)

                form.setTouched(newTouched || fields, silent, checkOnlyFilled)

                const childRefs = Object.values(childFormsRef.current)

                const _setTouchedChild = (child: IJsonFormRefObject) => {
                    if (child === null) {
                        console.warn(
                            `[FlatForm: ${id}][ref][SetTouched][Child is null]`,
                            childRefs
                        )

                        return
                    }

                    try {
                        child.setTouched(newTouched, silent, checkOnlyFilled)
                    } catch (e) {
                        console.error(
                            `[ERROR] [FlatForm: setTouched][Child]: ${
                                (e as Error)?.message
                            }`,
                            { item: child, refs: childRefs }
                        )
                        console.error(e)
                    }
                }

                for (const childRef of childRefs) {
                    if (!Array.isArray(childRef)) {
                        _setTouchedChild(childRef)

                        continue
                    }

                    for (const child of childRef) {
                        _setTouchedChild(child)
                    }
                }
            },
            validate(checkOnlyFilled = true, level = 0) {
                const prefixLogArr: string[] = []

                for (let i = 0; i < level; i++) {
                    prefixLogArr.push("  ")
                }

                const p = `${prefixLogArr.join("")}[Ref: ${id}][Validate]`

                let [hasFormErrors, formErrors] =
                    form.hasFormErrors(checkOnlyFilled)

                console.log(`${p}`, {
                    checkOnlyFilled,
                    hasErrors: hasFormErrors,
                    errors: formErrors,
                })

                const childForms = childFormsRef.current

                const childRefs = Object.entries(childForms)

                console.log(`${p}[Sub: ${childRefs.length}]`, childRefs)

                let childIndex = -1

                for (const [childId, child] of childRefs) {
                    childIndex++

                    if (!Array.isArray(child)) {
                        const subFormErrors = child.validate(
                            checkOnlyFilled,
                            level + 1
                        )

                        const hasSubFormsErrors = hasErrors(subFormErrors)

                        if (hasSubFormsErrors) {
                            hasFormErrors = true

                            /* @ts-ignore */
                            formErrors[childId] = subFormErrors!
                        }

                        console.log(`${p}[Child #${childIndex}]`, {
                            hasErrors: hasSubFormsErrors,
                            errors: subFormErrors,
                        })

                        continue
                    }

                    let subChildIndex = -1

                    const subErrors = {}

                    for (const subChild of child) {
                        subChildIndex++

                        if (subChild === null) {
                            console.warn(
                                `${p}[Sub #${childIndex}][Item: ${subChildIndex}][Error: Child is null]`,
                                childRefs
                            )

                            continue
                        }

                        const subFormErrors = subChild.validate(
                            checkOnlyFilled,
                            level + 1
                        )

                        const hasSubFormsErrors = hasErrors(subFormErrors)

                        if (hasSubFormsErrors) {
                            hasFormErrors = true

                            subErrors[subChildIndex] = subFormErrors
                        }

                        console.log(
                            `${p}[Sub #${childIndex}][Item: #${subChildIndex}]`,
                            {
                                hasErrors: hasSubFormsErrors,
                                errors: subFormErrors,
                            }
                        )
                    }

                    if (Object.keys(subErrors).length > 0) {
                        /* @ts-ignore */
                        formErrors[childId] = subErrors
                    }
                }

                if (hasFormErrors) {
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
            reset() {
                form.reset()

                const childRefs = Object.values(childFormsRef.current)

                const _resetChild = (child: IJsonFormRefObject) => {
                    if (child === null) {
                        console.warn(
                            `[FlatForm: ${id}][ref][Reset][Child is null]`,
                            childRefs
                        )

                        return
                    }

                    try {
                        child.reset()
                    } catch (e) {
                        console.error(
                            `[ERROR] [FlatForm: reset][Child]: ${
                                (e as Error)?.message
                            }`,
                            { item: child, refs: childRefs }
                        )
                        console.error(e)
                    }
                }

                for (const childRef of childRefs) {
                    if (!Array.isArray(childRef)) {
                        _resetChild(childRef)

                        continue
                    }

                    for (const child of childRef) {
                        _resetChild(child)
                    }
                }
            },
        })

        return () => {
            setRef(null)
        }
    }, [])
}
