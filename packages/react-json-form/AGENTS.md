# AGENTS.md

Guidance for AI agents working on `@undermuz/react-json-form`.

## Package

React library that renders forms from a JSON scheme. UI is themeable via `UiContext`. Core form state comes from `@undermuz/use-form`.

Published package lives in this directory. Themes and Storybook live elsewhere in the monorepo (`packages/themes/*`, `stories/`).

## Commands

Run from `packages/react-json-form`:

| Command | Purpose |
| --- | --- |
| `npm run lint` | ESLint + `tsc --noEmit` (TypeScript 7) |
| `npm run typecheck` | Typecheck only (`tsc` = TS 7) |
| `npm test` | Vitest once |
| `npm run test:watch` | Vitest watch |
| `npm run build` | tsup CJS + ESM + DTS |

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
- Tests: Vitest + Testing Library + jsdom; setup in `src/tests/setup.ts` (includes `ResizeObserver` mock for `@dnd-kit`)
- Exclude test/setup files from the published build in `tsup.config.ts`

## Source layout

```
src/
  JsonForm.tsx, Form.tsx, index.tsx   # public entry
  types.ts                            # scheme + UI prop types
  array-form/                         # multi-value / tabs (dnd-kit sortable)
  flat-form/                          # single object form + field inputs
  components/                         # layout primitives
  contexts/                           # ui, value, api, id
  custom-components/                  # consumer-provided field components
  utils/                              # useTabs, helpers
  tests/                              # Vitest specs + test theme/schemes
```

## Drag and drop

Array tabs use `@dnd-kit/react` + `@dnd-kit/helpers` (not legacy `@dnd-kit/core` / `sortable` / `utilities`):

- Provider: `DragDropProvider`
- Sortable: `useSortable` from `@dnd-kit/react/sortable` (pass `id` + `index`)
- Reorder: `move` from `@dnd-kit/helpers` (or `isSortable` + index)
- Trash drop: `useDroppable` + `event.operation.target?.id === "trash"`; cancel via `event.canceled`
- Overlay: `DragOverlay` render prop; do not use sortable hooks inside the overlay
- Collision: per-droppable `collisionDetector` from `@dnd-kit/collision` (`closestCenter`, `pointerIntersection`)

## Conventions

- Match existing code style: functional components, TypeScript, Prettier (4-space, no semicolons).
- Keep changes scoped; no drive-by refactors or unsolicited markdown.
- Theme UI types (`IUiTabProps`, trash container, etc.) live in `types.ts` — extend those when changing theme contracts.
- Themes are separate packages; this package only defines the UI contract and a minimal test theme under `src/tests/theme`.
