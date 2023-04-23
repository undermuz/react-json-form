import { type IErrors } from "@undermuz/use-form"

import { useCallback, type FormEventHandler, type RefObject } from "react"

import type { IJsonFormRefObject, TypeErrorItem, TypeValue } from "./types"

const useSubmit = (
    ref: RefObject<IJsonFormRefObject>,
    onSubmit: (
        values: TypeValue,
        errors: null | IErrors | TypeErrorItem[],
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

            const formErrors = ref.current.validate(false)

            onSubmit(ref.current.values(), formErrors, formErrors === null)
        },
        [onSubmit]
    )
}

export { useSubmit }
