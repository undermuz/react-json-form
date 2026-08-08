# react-json-form

(⚠️⚠️⚠️ THIS PACKAGE IS UNDER DEVELOPING ⚠️⚠️⚠️)

Monorepo for [@undermuz/react-json-form](https://www.npmjs.com/package/@undermuz/react-json-form) — a React library that renders forms from a JSON scheme. UI is swappable via themes.

## Repository layout

```
packages/
  react-json-form/          # core library (@undermuz/react-json-form)
  themes/
    base/                   # @undermuz/react-json-form-theme-base — native HTML + CSS
    chakra/                 # Chakra UI v2
    grommet/                # Grommet
    rsuite/                 # Rsuite
    chakra3/                # Chakra UI v3
    heroui/                 # HeroUI
stories/                    # Storybook demos
```

## Install

Core + theme:

```bash
npm i @undermuz/react-json-form @undermuz/react-json-form-theme-chakra
```

Or with the lightweight base theme (no UI library):

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
            type: EnumSchemeItemType.Input,
            settings: { inputType: "email" },
            rules: [[["Boolean"], "Required"]],
        },
        {
            name: "password",
            title: "Password",
            type: EnumSchemeItemType.Input,
            settings: { inputType: "password" },
            rules: [[["Boolean"], "Required"]],
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

```jsx
import { JsonForm, UiContext } from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

<UiContext.Provider value={BaseTheme}>
    <JsonForm {...scheme} value={value} onChange={setValue} />
</UiContext.Provider>
```

## Themes

| Package | Storybook |
| --- | --- |
| `@undermuz/react-json-form-theme-base` | [Base](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-base) |
| `@undermuz/react-json-form-theme-chakra` | [Chakra UI](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-chakra) |
| `@undermuz/react-json-form-theme-rsuite` | [Rsuite](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-rsuite) |
| `@undermuz/react-json-form-theme-grommet` | [Grommet](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-grommet) |

## Examples

[Storybook](https://undermuz.github.io/react-json-form/)

- [Login form](https://undermuz.github.io/react-json-form/?path=/story/form-examples--login-form)
- [Signup form](https://undermuz.github.io/react-json-form/?path=/story/form-examples--signup-form)
- [Custom layouts](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--wrapp-form)

## Development

**Core library** (`packages/react-json-form`):

```bash
cd packages/react-json-form
npm install
npm run lint
npm test
npm run build
```

**Theme** (example: base):

```bash
cd packages/themes/base
npm install
npm run build
```

**Storybook**:

```bash
cd stories
npm install
npm run storybook
```

Agent/contributor notes: [packages/react-json-form/AGENTS.md](./packages/react-json-form/AGENTS.md)

Package README: [packages/react-json-form/README.md](./packages/react-json-form/README.md)
