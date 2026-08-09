# react-json-form

(⚠️⚠️⚠️ THIS PACKAGE IS UNDER DEVELOPING ⚠️⚠️⚠️)

Monorepo for [@undermuz/react-json-form](https://www.npmjs.com/package/@undermuz/react-json-form) — a React library that renders forms from a JSON scheme. UI is swappable via themes.

**Home:** [undermuz.github.io/react-json-form](https://undermuz.github.io/react-json-form/)

## Repository layout

```
packages/
  react-json-form/          # core library (@undermuz/react-json-form)
  themes/
    base/                   # @undermuz/react-json-form-theme-base — native HTML + CSS
    base-dnd-tabs/          # DnD ArrayFormList for themes
    chakra/                 # Chakra UI v2
    grommet/                # Grommet
    rsuite/                 # Rsuite
    chakra3/                # Chakra UI v3
    heroui/                 # HeroUI
www/
  home/                     # landing page (Vite) → GitHub Pages
stories/                    # legacy Storybook (not in Nx workspaces; not deployed)
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

| Package | Notes |
| --- | --- |
| `@undermuz/react-json-form-theme-base` | Native HTML + CSS |
| `@undermuz/react-json-form-theme-chakra` | Chakra UI v2 |
| `@undermuz/react-json-form-theme-chakra-v3` | Chakra UI v3 |
| `@undermuz/react-json-form-theme-heroui` | HeroUI |
| `@undermuz/react-json-form-theme-rsuite` | Rsuite |
| `@undermuz/react-json-form-theme-grommet` | Grommet |

## Development

This is an npm workspaces + Nx monorepo. Install once from the repo root:

```bash
npm install
```

Run tasks via Nx:

```bash
npm run build          # nx run-many -t build
npm run lint
npm run test
npm run typecheck

npx nx build @undermuz/react-json-form
npx nx build @undermuz/react-json-form-theme-base
npx nx affected -t build
```

### Home page

```bash
npm run dev:home           # local Vite (Edit mode + Download JSON in DEV)
npm run build:home:pages   # production build with /react-json-form/ base
```

- Landing: `/` (hash: `#/`)
- Form examples from stories: `#/examples` (Login, Signup, Select, Offer, useSubmit, custom field, grid layout)

GitHub Pages deploys from `.github/workflows/deploy-home-page.yml` on push to `master`.

`stories/` is legacy Storybook (outside the workspace / Nx graph) and is not deployed to GitHub Pages.

Agent/contributor notes: [packages/react-json-form/AGENTS.md](./packages/react-json-form/AGENTS.md)

Package README: [packages/react-json-form/README.md](./packages/react-json-form/README.md)
