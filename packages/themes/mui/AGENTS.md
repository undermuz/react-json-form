# AGENTS.md

Guidance for AI agents working on `@undermuz/react-json-form-theme-mui`.

Shared rules: [`../AGENTS.md`](../AGENTS.md).

## Package

Material UI (**MUI**) theme for `@undermuz/react-json-form`.

| | |
| --- | --- |
| Path | `packages/themes/mui` |
| Demo | `www/home-mui` (`npm run dev:home-mui`, port **5184**) |
| Deps | `@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers`, `@emotion/react`, `@emotion/styled`, `dayjs` |

## App wiring

- Wrap with `ThemeProvider` + `LocalizationProvider` (`AdapterDayjs`)
- Demo uses a dark `createTheme({ palette: { mode: "dark" } })`
- Prefer not enabling full `CssBaseline` in the home demo — it fights the home-lib shell
