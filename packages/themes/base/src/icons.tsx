import type { FC } from "react"
import type { JsonFormIcons } from "@undermuz/react-json-form"

const IconAdd: FC<any> = (props) => (
    <svg
        {...props}
        className={`rjf-icon ${props.className ?? ""}`.trim()}
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        focusable="false"
    >
        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
)

const IconRemove: FC<any> = (props) => (
    <svg
        {...props}
        className={`rjf-icon ${props.className ?? ""}`.trim()}
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        focusable="false"
    >
        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
)

const Icons = {
    Tabs: {
        Add: IconAdd,
        Remove: IconRemove,
    },
} as JsonFormIcons

export default Icons
