# @undermuz/react-json-form-theme-base

Lightweight base theme for [@undermuz/react-json-form](https://github.com/undermuz/react-json-form). Native HTML controls and plain CSS — no UI library dependencies.

## Install

```bash
npm install @undermuz/react-json-form-theme-base
```

Peer dependencies: `react`, `react-dom`, `@undermuz/react-json-form`.

## Usage

Import the theme and its stylesheet, then pass the theme to `UiContext`:

```tsx
import { JsonForm, UiContext } from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

function App() {
    return (
        <UiContext.Provider value={BaseTheme}>
            <JsonForm
                id="example"
                scheme={[/* ... */]}
                value={{}}
                onChange={() => {}}
            />
        </UiContext.Provider>
    )
}
```

## Customization

Override CSS variables on a wrapper element:

```css
.my-form {
    --rjf-accent: #059669;
    --rjf-border: #e5e7eb;
    --rjf-radius: 4px;
}
```

Available variables: `--rjf-font`, `--rjf-text`, `--rjf-muted`, `--rjf-border`, `--rjf-bg`, `--rjf-surface`, `--rjf-accent`, `--rjf-accent-text`, `--rjf-danger`, `--rjf-danger-bg`, `--rjf-radius`, `--rjf-gap`, `--rjf-input-height`.

## License

MIT
