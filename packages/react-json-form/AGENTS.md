# AGENTS.md

Guidance for AI agents working on `@undermuz/react-json-form`.

## Package

React library that renders forms from a JSON scheme. UI is themeable via `UiContext`. Core form state comes from `@undermuz/use-form`.

Published package lives in this directory. Themes live under `packages/themes/*`. The repo root is an npm workspaces + Nx monorepo (`stories/` is legacy and excluded from the graph).

## Commands

From the **repo root** (`npm install` once):

| Command | Purpose |
| --- | --- |
| `npx nx run-many -t build` | Build all workspace packages |
| `npx nx build @undermuz/react-json-form` | Build this package |
| `npx nx lint @undermuz/react-json-form` | ESLint + `tsc --noEmit` (TypeScript 7) |
| `npx nx test @undermuz/react-json-form` | Vitest once |
| `npx nx run @undermuz/react-json-form:typecheck` | Typecheck only (`tsc` = TS 7) |
| `npx nx affected -t build` | Build only affected projects |

Per-package scripts still work from `packages/react-json-form` (`npm run lint`, `npm test`, `npm run build`, `npm run test:watch`).

Theme packages: `npx nx run-many -t lint,build` or target a theme by package name.

Do not commit unless the user asks.

## TypeScript side-by-side

TypeScript 7 has no Compiler API yet, so tooling that imports `typescript` must use 6.x:

| Alias | Resolves to | Used for |
| --- | --- | --- |
| `@typescript/native` | `typescript@^7` | `tsc` / `npm run typecheck` |
| `typescript` | `@typescript/typescript6` | ESLint, tsup DTS, `require("typescript")` |

Do not replace this with a single `typescript@7` until typescript-eslint supports TS 7.1+.

`tsconfig.json` uses `moduleResolution: "bundler"`, `isolatedModules`, `verbatimModuleSyntax`. Prefer `import type` for type-only imports.

## Lint / test / build

- ESLint 10 flat config: `eslint.config.mjs`
- `eslint-plugin-react` needs `@eslint/compat` + explicit `settings.react.version` (ESLint 10 API break)
- Tests: Vitest + Testing Library + jsdom; setup in `src/tests/setup.ts` (includes `ResizeObserver` mock)
- Exclude test/setup files from the published build in `tsup.config.ts`

## Source layout

```
src/
  JsonForm.tsx, Form.tsx, index.tsx   # public entry
  types.ts                            # scheme + UI prop types (JsonFormUi contract)
  array-form/                         # multi-value list view (ArrayFormList)
  flat-form/                          # single object form + field inputs
  components/                         # layout primitives
  contexts/                           # ui, value, api, id
  custom-components/                  # consumer-provided field components
  utils/                              # useTabs, helpers
  tests/                              # Vitest specs + test theme/schemes
```

## Array list view

There is a single array view: `ArrayFormList` (no `viewType`, no tabs mode).

- Core default: `array-form/ArrayFormList.tsx` — items with move up/down / add / remove actions.
- Theme override: `JsonFormUi.Components.ArrayFormList` (merged in `useJsonFormComponents`).
- State API: `useTabs` — `addTab` / `removeTab` / `moveTab` / `sortTabs(fromIndex, toIndex)` (DnD-agnostic).
- Public exports for custom theme lists: `ArrayFormItem`, type `IArrayFormParams`.

## Drag and drop

DnD is **not** a core dependency. Themes that want sortable lists implement `Components.ArrayFormList` and own `@dnd-kit/*`.

Reference package: `@undermuz/react-json-form-theme-base-dnd-tabs` (`packages/themes/base-dnd-tabs`) — drop-in `ArrayFormList` with `@dnd-kit/react`:

```ts
import BaseTheme from "@undermuz/react-json-form-theme-base"
import { ArrayFormList } from "@undermuz/react-json-form-theme-base-dnd-tabs"

const theme = { ...BaseTheme, Components: { ArrayFormList } }
```

- Provider: `DragDropProvider`
- Sortable: `useSortable` from `@dnd-kit/react/sortable` (pass `id` + `index`)
- Reorder: call `sortTabs(fromIndex, toIndex)` from `IArrayFormParams`
- Trash drop: `useDroppable` + `target.id === "trash"` → `removeTab(id)`; cancel via `event.canceled`
- Overlay: `DragOverlay` render prop; do not use sortable hooks inside the overlay
- Collision: per-droppable `collisionDetector` from `@dnd-kit/collision` (`closestCenter`, `pointerIntersection`)

## Themes

Themes are separate npm packages under `packages/themes/`. Each implements `JsonFormUi` from `types.ts` and is passed via `UiContext.Provider`.

**Shared theme agent guide:** [`packages/themes/AGENTS.md`](../themes/AGENTS.md) (contract, layout, tsup, demo apps, checklist for new themes). Kit-specific notes live in `<theme>/AGENTS.md` when present.

| Package | Path | Notes |
| --- | --- | --- |
| `@undermuz/react-json-form-theme-base` | `packages/themes/base` | Native HTML + plain CSS (`styles.css`), zero UI libs |
| `@undermuz/react-json-form-theme-base-dnd-tabs` | `packages/themes/base-dnd-tabs` | Optional DnD `ArrayFormList` for any theme chrome |
| `@undermuz/react-json-form-theme-chakra` | `packages/themes/chakra` | Chakra UI v2 |
| `@undermuz/react-json-form-theme-grommet` | `packages/themes/grommet` | Grommet |
| `@undermuz/react-json-form-theme-rsuite` | `packages/themes/rsuite` | Rsuite |
| `@undermuz/react-json-form-theme-chakra3` | `packages/themes/chakra3` | Chakra UI v3 |
| `@undermuz/react-json-form-theme-heroui` | `packages/themes/heroui` | HeroUI |
| `@undermuz/react-json-form-theme-antd` | `packages/themes/antd` | Ant Design v6 |
| `@undermuz/react-json-form-theme-mantine` | `packages/themes/mantine` | Mantine v9 (React 19.2+) |
| `@undermuz/react-json-form-theme-mui` | `packages/themes/mui` | Material UI |

This package ships a minimal test theme at `src/tests/theme/` (not published).

## Conventions

- Match existing code style: functional components, TypeScript, Prettier (4-space, no semicolons).
- Keep changes scoped; no drive-by refactors or unsolicited markdown.
- Theme UI types (`IUiTabProps`, trash container, etc.) live in `types.ts` — extend those when changing theme contracts.
- Themes are separate packages; this package only defines the UI contract and a minimal test theme under `src/tests/theme`.
