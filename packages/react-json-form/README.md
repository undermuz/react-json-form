# @undermuz/react-json-form

(⚠️⚠️⚠️ THIS PACKAGE IS UNDER DEVELOPING ⚠️⚠️⚠️)

[React library for generate JSON-based form](https://www.npmjs.com/package/@undermuz/react-json-form)

## Install

Core library + a theme (pick one):

```bash
npm i @undermuz/react-json-form @undermuz/react-json-form-theme-chakra
```

Lightweight option without UI libraries:

```bash
npm i @undermuz/react-json-form @undermuz/react-json-form-theme-base
```

## Basic usage

```jsx
import { useState } from "react"
import JsonForm, { UiContext, EnumSchemeItemType } from "@undermuz/react-json-form"
import ChakraUiTheme from "@undermuz/react-json-form-theme-chakra"

const scheme = {
    id: "login-form-v1",
    title: "Login",
    scheme: [
        {
            name: "email",
            title: "E-mail",
            placeholder: "ex: youremail@mail.com",
            type: EnumSchemeItemType.Input,
            settings: { inputType: "email" },
            def_value: "",
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
            def_value: "",
            rules: [
                [["Boolean"], "Required"],
                [
                    ["isStringMinMaxLength:[6,18]"],
                    "Min length: 6; Max length: 18",
                ],
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

const YourForm = () => {
    const [value, setValue] = useState({})

    return (
        <UiContext.Provider value={ChakraUiTheme}>
            <JsonForm {...scheme} value={value} onChange={setValue} />
        </UiContext.Provider>
    )
}
```

### Base theme

Native HTML controls + CSS variables. Import styles separately:

```jsx
import { JsonForm, UiContext } from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

<UiContext.Provider value={BaseTheme}>
    <JsonForm {...scheme} value={value} onChange={setValue} />
</UiContext.Provider>
```

See [packages/themes/base/README.md](../themes/base/README.md) for CSS customization.

## Themes

| Package | Storybook |
| --- | --- |
| `@undermuz/react-json-form-theme-base` | [Base](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-base) |
| `@undermuz/react-json-form-theme-chakra` | [Chakra UI](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-chakra) |
| `@undermuz/react-json-form-theme-rsuite` | [Rsuite](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-rsuite) |
| `@undermuz/react-json-form-theme-grommet` | [Grommet](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-grommet) |

Other theme packages in the monorepo: `chakra3`, `heroui`, `antd`, `mantine` (React 19.2+), `mui`.

## Examples

### Forms

[Login form](https://undermuz.github.io/react-json-form/?path=/story/form-examples--login-form)

[Signup form](https://undermuz.github.io/react-json-form/?path=/story/form-examples--signup-form)

### Custom layout

[Wrap form](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--wrapp-form)

[Wrap fields block](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--wrapp-field-block)

[Wrap each field](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--wrapp-each-field)

[Vertical stack](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--vertical-stack)

[Horizontal stack](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--horizontal-stack)

[Grid layout](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--grid-layout)

## Development

From this directory:

```bash
npm run lint
npm test
npm run build
```

See [AGENTS.md](./AGENTS.md) for monorepo layout, theme contracts, and tooling notes.
