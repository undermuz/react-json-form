# AGENTS.md — themes

Guidance for AI agents working on any package under `packages/themes/`.

Contract and core behavior live in `@undermuz/react-json-form` (`packages/react-json-form/src/types.ts`, `AGENTS.md`). Themes only implement UI — they do not own scheme parsing or form state.

Do not commit unless the user asks.

## Packages

| Package | Path | Notes |
| --- | --- | --- |
| `@undermuz/react-json-form-theme-base` | `base/` | Native HTML + CSS, zero UI libs |
| `@undermuz/react-json-form-theme-base-dnd-tabs` | `base-dnd-tabs/` | Optional DnD `ArrayFormList` only (not a full theme) |
| `@undermuz/react-json-form-theme-chakra` | `chakra/` | Chakra UI v2 |
| `@undermuz/react-json-form-theme-chakra-v3` | `chakra3/` | Chakra UI v3 |
| `@undermuz/react-json-form-theme-heroui` | `heroui/` | HeroUI |
| `@undermuz/react-json-form-theme-rsuite` | `rsuite/` | Rsuite (+ optional `Components.JsonForm`) |
| `@undermuz/react-json-form-theme-grommet` | `grommet/` | Grommet |
| `@undermuz/react-json-form-theme-antd` | `antd/` | Ant Design v6 (+ optional `Components.JsonForm`) |
| `@undermuz/react-json-form-theme-mantine` | `mantine/` | Mantine v9 — **React 19.2+** peer (+ optional `Components.JsonForm`) |
| `@undermuz/react-json-form-theme-mui` | `mui/` | Material UI (+ optional `Components.JsonForm`) |

Kit-specific notes (when present): `<theme>/AGENTS.md` (e.g. `antd/AGENTS.md`).

## Contract (`JsonFormUi`)

Every full theme default-exports an object matching `JsonFormUi`:

```tsx
const Theme: JsonFormUi = {
    ...Ui,       // layout chrome
    Controls,    // field widgets
    Icons,       // Tabs icons
    // Components?: { JsonForm?, ArrayFormList? }
}
export default Theme
```

### Required

| Key | Role |
| --- | --- |
| `Container`, `Header`, `Body` | Outer chrome / nesting |
| `FlatForm` | Single-object form shell; honor `isShow` (hide via CSS, don’t break mount) and `primary` |
| `Field` | Label, description, errors, optional disable toggle |
| `Item`, `ItemWrapper` | Non-control items (e.g. Submit button) |
| `ArrayForm` (+ `Header`, `Tabs`, `Body`, `TrashContainer`) | Compound array chrome |
| `Tab` | `forwardRef` tab/button for array items |
| `Controls` | `FileInput`, `Input`, `TextBlock`, `CheckBox`, `Date`, `Select` |
| `Icons.Tabs` | `Add`, `Remove`, `MoveUp`, `MoveDown` (accept `title`) |

### Optional `Components`

Merged with core defaults in `useJsonFormComponents`:

- `JsonForm` — wrap root form (e.g. Card/Panel); see rsuite / antd
- `ArrayFormList` — replace list UI; DnD lives in `base-dnd-tabs`, not core

```ts
import BaseTheme from "@undermuz/react-json-form-theme-base"
import { ArrayFormList } from "@undermuz/react-json-form-theme-base-dnd-tabs"

const theme = { ...BaseTheme, Components: { ArrayFormList } }
```

### Behavioral must-haves

- **Field `showToggle`:** `ConnectToForm` with name `` `${name}__isDisabled` ``. Toggle usually inverted (checked = field enabled).
- **`FlatForm.isShow`:** `display: none` / `hidden` when false — keep subtree mounted.
- **Select:** support sync `settings.options` arrays and async `options` functions (`{ ids }`, search/default load). Mirror chakra if unsure.
- **Controls props:** `IInput & IConnectedProps` from core / `@undermuz/use-form` (`onChange`, `onBlur`, `errors`, `isDisabled`, …).
- **UI prop types** (`IField`, `IUiTabProps`, trash props, …) live only in core `types.ts` — extend there if the contract must change.

## Canonical layout

```
packages/themes/<name>/
  package.json          # @undermuz/react-json-form-theme-<name>
  tsup.config.ts        # multi-entry + file-path-extensions
  tsconfig.json
  tsconfig.build.json
  eslint.config.mjs
  src/
    index.tsx           # assemble + default export
    controls.tsx
    icons.tsx
    ui.tsx              # or ui/*.tsx (heroui)
    components.tsx      # optional
```

**References**

- Behavior: `chakra/src/`
- Lean / CSS tokens: `base/`
- Optional `Components.JsonForm`: `rsuite/`, `antd/`
- Split UI modules: `heroui/src/ui/`

## Build (tsup)

- **Multi-entry** for every relative module the package imports (`index`, `controls`, `icons`, `ui`, …).
- Always use `esbuild-plugin-file-path-extensions` (`esmExtension: "mjs"`, `cjsExtension: "js"`). A single-entry build breaks ESM (`./ui.mjs` missing).
- Externalize `react`, `react-dom`, `@undermuz/react-json-form`, `@undermuz/use-form`, and the UI kit.
- Publish `dist` only; dual CJS/ESM `exports` like sibling themes.
- Version / peer `@undermuz/react-json-form` — keep aligned with other themes (currently `2.3.x` / `^2.3.0`).

## Demo apps (`www/home-<theme>`)

Each full theme has an isolated Vite app. Shared shell: `www/home-lib`.

Checklist when adding a theme:

1. Package under `packages/themes/<id>/` implementing full `JsonFormUi`.
2. App `www/home-<id>/` with `App.tsx`, `ThemeRoot.tsx` (kit provider), vite alias to theme `src`.
3. Register in:
   - `www/home-lib/src/siteUrls.ts` — `THEME_APP_IDS`, `THEME_APP_LABELS`, `DEV_PORTS`
   - `www/scripts/build-home-pages.mjs` — `THEMES`
   - root `package.json` — `dev:home-<id>`
   - landing Themes block — `www/home/src/blocks/themes/index.tsx`
   - optional: `www/scripts/scaffold-theme-app-shared.mjs`, `.vscode/settings.json` eslint dirs
4. Dev ports: themes use **5174+** sequentially; avoid **5180/5181** (cross-project use-form / page-builder links in `siteUrls`).

Landing (`www/home`) demos use **base** theme; other kits are reached via ThemeSwitcher / `getExamplesHref`.

## Commands

From repo root:

```bash
npx nx build @undermuz/react-json-form-theme-chakra
npx nx run-many -t lint,build
npm run dev:home-base    # etc.
npm run build:home:pages # all theme example apps → www/dist-pages
```

Per package: `npm run lint`, `npm run build` inside `packages/themes/<name>` (or `--workspace=`).

## Per-theme React (and other) constraints

Themes **may** raise peer requirements above the core (`react >= 17`). Example: Mantine v9 peers `react` / `react-dom` `^19.2.0`.

Rules:

- Declare the constraint in the theme’s `peerDependencies` (and kit-specific `AGENTS.md`).
- Keep the matching `www/home-<theme>` on a compatible React; use root `overrides` scoped to that workspace + Vite `resolve.alias` to the app’s `node_modules/react` when the monorepo still hoists React 18 elsewhere.
- Do **not** force the entire monorepo onto a newer React just for one kit.
- Core `@undermuz/react-json-form` stays on a wide peer (`>=17`) so themes with different React majors remain valid consumers.

## Conventions

- Functional components, TypeScript, Prettier (4-space, no semicolons), `import type` for types.
- Scope changes to the theme(s) asked for; no drive-by refactors across kits.
- Prefer the UI kit’s primitives; don’t invent a parallel design system inside the theme.
- Providers (`ChakraProvider`, `ConfigProvider`, `HeroUIProvider`, …) belong in the **app** (`ThemeRoot`), not inside the published theme object — unless the package explicitly documents a provider export (chakra3 snippets).
- DnD is opt-in via `base-dnd-tabs` or a custom `Components.ArrayFormList`; never add `@dnd-kit` to core.
