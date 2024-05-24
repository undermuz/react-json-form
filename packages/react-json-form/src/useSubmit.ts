import { type IErrors } from "@undermuz/use-form"

import { useCallback, type FormEventHandler, type RefObject } from "react"

import type { IJsonFormRef, TypeErrorItem, TypeValue } from "./types"

const hasErrors = (errors?: IErrors | TypeErrorItem[] | null) =>
    errors !== null && errors !== undefined && Object.keys(errors).length > 0

const useSubmit = (
    ref: RefObject<IJsonFormRef>,
    onSubmit: (
        values: TypeValue,
        errors: null | IErrors | TypeErrorItem[] | IErrors[],
        isValid: boolean
    ) => void
) => {
    return useCallback<FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault()

            if (!ref.current) {
                console.error("ref is null")
                return
            }

            if (Array.isArray(ref.current)) {
                const formErrors = ref.current.map((r) => r.validate(false))
                const fromValues = ref.current.map((r) => r.values())

                onSubmit(
                    fromValues,
                    formErrors as IErrors[],
                    formErrors.some((e) => hasErrors(e))
                )
                return
            }

            ref.current.setTouched(null, true, false)
            const formErrors = ref.current.validate(false)

            return onSubmit(ref.current.values(), formErrors, !hasErrors(formErrors))
        },
        [onSubmit]
    )
}

export { useSubmit }
