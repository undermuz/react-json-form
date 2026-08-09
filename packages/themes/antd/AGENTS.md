# AGENTS.md

Guidance for AI agents working on `@undermuz/react-json-form-theme-antd`.

Shared rules for all themes: [`../AGENTS.md`](../AGENTS.md).

## Package

Ant Design **v6** theme for `@undermuz/react-json-form`. Implements `JsonFormUi` and is consumed via `UiContext.Provider`.

| | |
| --- | --- |
| Path | `packages/themes/antd` |
| Demo app | `www/home-antd` (`npm run dev:home-antd`, port **5182**) |
| UI kit | `antd` `^6.5`, `@ant-design/icons`, `dayjs` |

Peer deps: `react` / `react-dom` `>=18`, `@undermuz/react-json-form` `^2.3.0`.

Do not commit unless the user asks.

## Commands

From the **repo root** (`npm install` once):

| Command | Purpose |
| --- | --- |
| `npx nx build @undermuz/react-json-form-theme-antd` | tsup multi-entry build → `dist/` |
| `npx nx lint @undermuz/react-json-form-theme-antd` | ESLint + `tsc --noEmit` |
| `npm run build --workspace=@undermuz/react-json-form-theme-antd` | Same via workspace script |
| `npm run dev:home-antd` | Theme examples Vite app |

## Source layout

```
src/
  index.tsx       # default export: assembled JsonFormUi
  controls.tsx    # FileInput, Input, TextBlock, CheckBox, Date, Select
  ui.tsx          # Container, Header, Body, FlatForm, Field, Item*, ArrayForm*, Tab
  icons.tsx       # JsonFormIcons (Tabs Add/Remove/MoveUp/MoveDown)
  components.tsx  # optional Components.JsonForm (antd Card wrapper)
```

Assembly pattern (same as rsuite):

```tsx
const AntdUi: JsonFormUi = {
    ...Ui,
    Controls,
    Icons,
    Components: { JsonForm: Components.JsonFormComponent },
}
export default AntdUi
```

## Ant Design specifics

- **CSS-in-JS** — no `antd/dist/reset.css` (or similar) import in the theme package. Styles come from components at runtime.
- **App provider** — consumers (and `www/home-antd`) must wrap with `ConfigProvider`. Demo uses `theme.darkAlgorithm` to match the home-lib shell.
- **Date** — `DatePicker` + `dayjs`. Control value in/out is `Date | null` (convert with `dayjs` / `.toDate()`).
- **Select** — antd `Select` has no `name` prop; use `aria-label` / `id`. Support sync `options[]` and async `options` function (`{ ids }`, `{ search }`, default load) like chakra.
- **Field disable toggle** — when `showToggle`, wire via `ConnectToForm` + `` `${name}__isDisabled` `` (inverted Switch: checked = enabled). Render label+switch in a full-width Flex (`justify="space-between"`) **above** `Form.Item`, not inside `label` — antd’s label box shrinks to text width so the switch otherwise sticks to the title.
- **FlatForm / Field layout** — always `layout="vertical"` (FlatForm wraps with `<Form layout="vertical" component="div">`). Horizontal `Form.Item` nests squeeze nested widgets to the right. Hide Field label for `Widget` (nested Header already titles the block). Keep `width: 100%` / `minWidth: 0` on nested Flex shells.
- **FlatForm.isShow** — hide with `display: none` when `isShow` is false (do not unmount).
- **Icons** — `@ant-design/icons` components; core passes `title` (e.g. `title="add-tab"`).

## Build (tsup)

- Multi-entry: `index`, `controls`, `icons`, `ui`, `components`.
- Use `esbuild-plugin-file-path-extensions` so ESM resolves `./ui.mjs` etc. **Do not** switch to a single-entry bundle — it breaks consumers.
- Externals: `react`, `react-dom`, `@undermuz/react-json-form`, `@undermuz/use-form`, `antd`, `@ant-design/icons`, `dayjs`, `underscore`.

## Demo app wiring

When changing the theme contract or public API, keep `www/home-antd` in sync:

- `App.tsx` — `themeId="antd"`, package `@undermuz/react-json-form-theme-antd`, import `AntdUi`
- `ThemeRoot.tsx` — `ConfigProvider` + dark algorithm
- Registry: `www/home-lib/src/siteUrls.ts` (`THEME_APP_IDS`, `DEV_PORTS`), `www/scripts/build-home-pages.mjs`, root `dev:home-antd`, landing Themes block

## Contract reference

Full `JsonFormUi` types live in `packages/react-json-form/src/types.ts`.

- Behavior reference: `packages/themes/chakra/src/`
- Similar kit packaging (optional `Components.JsonForm`): `packages/themes/rsuite/src/`
- Core theme notes: `packages/react-json-form/AGENTS.md` → Themes

## Conventions

- Match repo style: functional components, TypeScript, Prettier (4-space, no semicolons), `import type` for type-only imports.
- Keep changes scoped to this theme; do not “fix” unrelated themes or core unless asked.
- Prefer antd primitives over custom CSS; if layout CSS is needed, use inline styles or antd tokens (`var(--ant-color-border)`, etc.).
