import { type IErrors } from "@undermuz/use-form"

import {
    useCallback,
    type EventHandler,
    type SyntheticEvent,
    type RefObject,
} from "react"

import type { DefType, IJsonFormRef, SubmitErrors, TypeValue } from "./types"

const hasErrors = (errors?: SubmitErrors) =>
    errors !== null && errors !== undefined && Object.keys(errors).length > 0

const useSubmit = <T extends DefType = DefType>(
    ref: RefObject<IJsonFormRef<T> | null>,
    onSubmit: (
        values: TypeValue<T>,
        errors: SubmitErrors,
        isValid: boolean
    ) => void
) => {
    return useCallback<EventHandler<SyntheticEvent>>(
        (event?: SyntheticEvent) => {
            event?.preventDefault()

            if (!ref.current) {
                console.error("ref is null")
                return
            }

            if (Array.isArray(ref.current)) {
                const formErrors = ref.current.map((r) => r.validate(false))
                const fromValues = ref.current.map((r) => r.values())

                onSubmit(
                    fromValues as unknown as TypeValue<T>,
                    formErrors as IErrors[],
                    formErrors.some((e) => hasErrors(e))
                )
                return
            }

            ref.current.setTouched(null, true, false)
            const formErrors = ref.current.validate(false)

            return onSubmit(
                ref.current.values(),
                formErrors,
                !hasErrors(formErrors)
            )
        },
        [onSubmit]
    )
}

export { useSubmit }
