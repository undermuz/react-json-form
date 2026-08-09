# AGENTS.md

Guidance for AI agents working on `@undermuz/react-json-form-theme-mantine`.

Shared rules: [`../AGENTS.md`](../AGENTS.md).

## Package

Mantine **v9** theme. This package **requires React 19.2+** (Mantine peer). Other themes and most of the monorepo may stay on React 18 — that is intentional.

| | |
| --- | --- |
| Path | `packages/themes/mantine` |
| Demo | `www/home-mantine` (`npm run dev:home-mantine`, port **5183**) |
| UI kit | `@mantine/core` / `hooks` / `dates` `^9.5` |
| React | peer `^19.2.0` (demo app pins React 19; root overrides nest it for this workspace) |

## React version isolation

Themes may declare their own `peerDependencies.react` / `react-dom`. Consumers of this package must use React 19.2+.

In this monorepo:

1. Theme + `www/home-mantine` depend on React 19.
2. Root `overrides`: React 19 runtime for theme + home-mantine; `@types/react` 19 **only** for the theme package. Do **not** override `@types/react` on `home-mantine` — that nests React 19 types under shared `home-lib` and breaks `tsc` for every other home app / GH Pages build. `build-home-pages.mjs` also rimrafs `www/home-lib/node_modules` before building as a CI safety net.
3. `www/home-mantine/vite.config.ts` aliases `react` / `react-dom` to the app’s own `node_modules` so the React 18 hoist cannot enter the demo bundle.
4. `home-lib` peers `react` / `react-dom` `>=18.3.1` so React 19 demos are valid without forcing types into the shared package.

Do **not** bump the whole monorepo to React 19 just to support this theme.

Typecheck bridge: core/`JsonFormUi` is authored against `@types/react` 18. This package uses React 19 types — assemble the theme with `as unknown as JsonFormUi` (see `src/index.tsx` / `src/ui.tsx`). The demo casts the same way for `ExamplesApp`.

`www/home-mantine` builds with **Vite only** (`tsc -b` across home-lib + core hits dual `@types/react` and is optional via `npm run typecheck`). Vite aliases force React 19 + theme `src/` for the demo bundle.

## App wiring

- Import styles in the app: `@mantine/core/styles.css`, `@mantine/dates/styles.css`
- Wrap with `MantineProvider` (`forceColorScheme="dark"` in the demo)
- Dates need `dayjs` (dependency of `@mantine/dates`)
