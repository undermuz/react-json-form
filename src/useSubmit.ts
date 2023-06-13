import { type IErrors } from "@undermuz/use-form"

import { useCallback, type FormEventHandler, type RefObject } from "react"

import type { IJsonFormRef, TypeErrorItem, TypeValue } from "./types"

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
                    formErrors.some((e) => e !== null)
                )
                return
            }

            const formErrors = ref.current.validate(false)

            onSubmit(
                ref.current.values(),
                formErrors,
                formErrors === null || Object.keys(formErrors).length === 0
            )
        },
        [onSubmit]
    )
}

export { useSubmit }
