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

const IconMoveUp: FC<any> = (props) => (
    <svg
        {...props}
        className={`rjf-icon ${props.className ?? ""}`.trim()}
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        focusable="false"
    >
        <path
            d="M8 12V4M4 8l4-4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
    </svg>
)

const IconMoveDown: FC<any> = (props) => (
    <svg
        {...props}
        className={`rjf-icon ${props.className ?? ""}`.trim()}
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        focusable="false"
    >
        <path
            d="M8 4v8M4 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
    </svg>
)

const Icons = {
    Tabs: {
        Add: IconAdd,
        Remove: IconRemove,
        MoveUp: IconMoveUp,
        MoveDown: IconMoveDown,
    },
} as JsonFormIcons

export default Icons
