export const SNIPPETS = {
    login: {
        filename: "LoginForm.tsx",
        code: `import { useState } from "react"
import JsonForm, {
  UiContext,
  EnumSchemeItemType,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

const scheme = {
  id: "Login",
  title: "Login",
  scheme: [
    {
      name: "email",
      title: "E-mail",
      type: EnumSchemeItemType.Input,
      settings: { inputType: "email" },
      rules: [
        [["Boolean"], "Required"],
        [["isEmail"], "Incorrect e-mail"],
      ],
    },
    {
      name: "password",
      title: "Password",
      type: EnumSchemeItemType.Input,
      settings: { inputType: "password" },
      rules: [
        [["Boolean"], "Required"],
        [["isStringMinMaxLength:[6,18]"], "Min length: 6; Max length: 18"],
      ],
    },
    {
      name: "remember",
      title: "Remember?",
      type: EnumSchemeItemType.Checkbox,
      def_value: true,
    },
  ],
}

export default function LoginForm() {
  const [value, setValue] = useState({})

  return (
    <UiContext.Provider value={BaseTheme}>
      <JsonForm {...scheme} value={value} onChange={setValue} />
    </UiContext.Provider>
  )
}`,
    },

    signup: {
        filename: "SignupForm.tsx",
        code: `import { useState } from "react"
import JsonForm, {
  UiContext,
  EnumSchemeItemType,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

const scheme = {
  id: "SignUp",
  title: "SignUp",
  scheme: [
    {
      name: "email",
      title: "E-mail",
      type: EnumSchemeItemType.Input,
      settings: { inputType: "email" },
      rules: [[["Boolean"], "Required"], [["isEmail"], "Incorrect e-mail"]],
    },
    {
      name: "avatar",
      title: "Avatar",
      type: EnumSchemeItemType.Files,
      def_value: [],
    },
    {
      name: "skills",
      title: "Your skills",
      type: EnumSchemeItemType.Widget,
      multiple: true,
      scheme: [
        { name: "title", title: "Name", type: EnumSchemeItemType.Text },
      ],
    },
    {
      name: "company",
      title: "Create company",
      type: EnumSchemeItemType.Widget,
      scheme: [
        { name: "name", title: "Company name", type: EnumSchemeItemType.Text },
        {
          name: "employee",
          title: "Employee",
          type: EnumSchemeItemType.Widget,
          multiple: true,
          settings: { viewType: "tabs" },
          scheme: [
            { name: "name", title: "Name", type: EnumSchemeItemType.Text },
            {
              name: "email",
              title: "E-mail",
              type: EnumSchemeItemType.Input,
              settings: { inputType: "email" },
            },
          ],
        },
      ],
    },
  ],
}

export default function SignupForm() {
  const [value, setValue] = useState({})

  return (
    <UiContext.Provider value={BaseTheme}>
      <JsonForm {...scheme} value={value} onChange={setValue} />
    </UiContext.Provider>
  )
}`,
    },

    select: {
        filename: "SelectForm.tsx",
        code: `import { useMemo, useState } from "react"
import JsonForm, {
  ApiContext,
  UiContext,
  EnumSchemeItemType,
  type ApiValue,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

const options = [
  { label: "Big", value: 1 },
  { label: "Small", value: 2 },
  { label: "Medium", value: 3 },
]

const scheme = {
  id: "Select",
  title: "Select",
  scheme: [
    {
      name: "multiple-async-list",
      title: "Multiple async list (API)",
      type: EnumSchemeItemType.Select,
      settings: { useApi: "api::async-select.list", multiple: true },
    },
    {
      name: "single-simple-list",
      title: "Single simple list",
      type: EnumSchemeItemType.Select,
      settings: { options },
    },
  ],
}

export default function SelectForm() {
  const [value, setValue] = useState({})
  const api = useMemo<ApiValue>(
    () => ({
      "api::async-select.list": async () => options,
    }),
    []
  )

  return (
    <UiContext.Provider value={BaseTheme}>
      <ApiContext.Provider value={api}>
        <JsonForm {...scheme} value={value} onChange={setValue} />
      </ApiContext.Provider>
    </UiContext.Provider>
  )
}`,
    },

    offer: {
        filename: "OfferForm.tsx",
        code: `import { useMemo, useState } from "react"
import JsonForm, {
  ApiContext,
  UiContext,
  EnumSchemeItemType,
  type ApiValue,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

const scheme = {
  id: "offer",
  title: "Offer",
  scheme: [
    {
      name: "title",
      title: "Title",
      type: EnumSchemeItemType.Text,
      settings: { showToggle: true },
      rules: [[["Boolean"], "Required"]],
    },
    {
      name: "size",
      title: "Offer Size",
      type: EnumSchemeItemType.Select,
      settings: { useApi: "api::size.list", showToggle: true },
    },
    {
      name: "date",
      title: "Date",
      type: EnumSchemeItemType.Date,
      settings: { showToggle: true },
    },
    {
      name: "prices",
      title: "Prices",
      type: EnumSchemeItemType.Widget,
      multiple: true,
      settings: { viewType: "tabs", showToggle: true },
      scheme: [
        { name: "title", title: "Title", type: EnumSchemeItemType.Text },
        { name: "price", title: "Price value", type: EnumSchemeItemType.Text },
        {
          name: "is_active",
          title: "Is active?",
          type: EnumSchemeItemType.Checkbox,
        },
        {
          name: "list",
          title: "Advantages",
          type: EnumSchemeItemType.Widget,
          multiple: true,
          scheme: [
            { name: "title", title: "Title", type: EnumSchemeItemType.Text },
          ],
        },
      ],
    },
  ],
}

export default function OfferForm() {
  const [value, setValue] = useState({ date: new Date(), prices: [] })
  const api = useMemo<ApiValue>(
    () => ({
      "api::size.list": async () => [
        { label: "S", value: "s" },
        { label: "M", value: "m" },
        { label: "L", value: "l" },
      ],
    }),
    []
  )

  return (
    <UiContext.Provider value={BaseTheme}>
      <ApiContext.Provider value={api}>
        <JsonForm {...scheme} value={value} onChange={setValue} />
      </ApiContext.Provider>
    </UiContext.Provider>
  )
}`,
    },

    submit: {
        filename: "SubmitLoginForm.tsx",
        code: `import { useRef, useState } from "react"
import JsonForm, {
  UiContext,
  useSubmit,
  type IJsonFormRefObject,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"
import LoginScheme from "./schemes/login"

export default function SubmitLoginForm() {
  const [value, setValue] = useState({})
  const ref = useRef<IJsonFormRefObject>(null)

  const onSubmit = useSubmit(ref, (values, errors, isValid) => {
    console.log({ values, errors, isValid })
  })

  return (
    <form onSubmit={onSubmit}>
      <UiContext.Provider value={BaseTheme}>
        <JsonForm
          {...LoginScheme}
          ref={ref}
          value={value}
          onChange={setValue}
        />
      </UiContext.Provider>
      <button type="submit">Submit</button>
    </form>
  )
}`,
    },

    "custom-component": {
        filename: "CustomFieldForm.tsx",
        code: `import { useState, type FC } from "react"
import JsonForm, {
  UiContext,
  CustomComponentsContext,
  JFL,
  EnumSchemeItemType,
  type TypeCustomComponentProps,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

const ToggleButton: FC<TypeCustomComponentProps<{ texts?: string[] }>> = (
  props
) => {
  const texts = props.texts ?? ["Allowed", "Disallowed"]
  return (
    <button type="button" onClick={() => props.onChange?.(!props.value)}>
      {props.value ? \`✓ \${texts[0]}\` : \`× \${texts[1]}\`}
    </button>
  )
}

const customComponents = { ToggleButton }

const scheme = {
  id: "CustomLogin",
  title: "Login + custom field",
  scheme: [
    {
      name: "email",
      title: "E-mail",
      type: EnumSchemeItemType.Input,
      settings: { inputType: "email" },
    },
    {
      name: "password",
      title: "Password",
      type: EnumSchemeItemType.Input,
      settings: { inputType: "password" },
    },
    {
      name: "allowed_send_news",
      title: "News letters",
      type: "ToggleButton",
      def_value: false,
    },
  ],
}

export default function CustomFieldForm() {
  const [value, setValue] = useState({ allowed_send_news: false })

  return (
    <UiContext.Provider value={BaseTheme}>
      <CustomComponentsContext.Provider value={customComponents}>
        <JsonForm {...scheme} value={value} onChange={setValue}>
          <JFL.Form>
            <JFL.Fields except={["allowed_send_news"]} />
            <JFL.Field
              name="allowed_send_news"
              texts={["Enabled", "Disabled"]}
            />
          </JFL.Form>
        </JsonForm>
      </CustomComponentsContext.Provider>
    </UiContext.Provider>
  )
}`,
    },

    "grid-layout": {
        filename: "GridLayoutForm.tsx",
        code: `import { useState, type FC, type ReactNode } from "react"
import JsonForm, { UiContext, JFL } from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"
import LayoutScheme from "./schemes/layout"

const GridBox: FC<{ children?: ReactNode }> = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    {children}
  </div>
)

export default function GridLayoutForm() {
  const [value, setValue] = useState({})

  return (
    <UiContext.Provider value={BaseTheme}>
      <JsonForm {...LayoutScheme} value={value} onChange={setValue}>
        <JFL.Form as={GridBox} />
      </JsonForm>
    </UiContext.Provider>
  )
}`,
    },
} as const
