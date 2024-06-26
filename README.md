# @undermuz/react-json-form

(⚠️⚠️⚠️ THIS PACKAGE IS UNDER DEVELOPING ⚠️⚠️⚠️)

[React library for generate JSON-based form](https://www.npmjs.com/package/@undermuz/react-json-form)

## Install

`npm i @undermuz/react-json-form @undermuz/react-json-form-theme-chakra`

## Basic usage

1. Import JsonForm component

```jsx
import JsonForm from "@undermuz/react-json-form"
```

2. Import UiContext for apply theme

```jsx
import JsonForm, {
    UiContext,
} from "@undermuz/react-json-form"
```

3. Import theme

```jsx
import ChakraUiTheme from "@undermuz/react-json-form-theme-chakra"
```

4. Create form component

```jsx
const YourForm = () => {
    const [value, setValue] = useState({})

    return (
        <>
            <UiContext.Provider value={ChakraUiTheme}>
                <JsonForm value={value} onChange={setValue} />
            </UiContext.Provider>
        </>
    )
}
```

5. Add form's scheme

```jsx
const scheme: IScheme = {
    id: "login-form-v1",
    single: true,
    multiple: false,
    title: "Login",
    name: "login-form-v1",
    scheme: [
        {
            name: "email",
            title: "E-mail",
            placeholder: "ex: youremail@mail.com",
            type: EnumSchemeItemType.Input,
            settings: {
                inputType: "email",
            },
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
            settings: {
                inputType: "password",
            },
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
```

6. Apply the scheme to JsonForm

```jsx
const YourForm = () => {
    const [value, setValue] = useState({})

    return (
        <>
            <UiContext.Provider value={ChakraUiTheme}>
                <JsonForm {...scheme} value={value} onChange={setValue} />
            </UiContext.Provider>
        </>
    )
}
```

7. Get result

![Result](/screenshots/login-form.png)

## Built-in themes

[Storybook: ChakraUi](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-chakra)

[Storybook: Rsuite](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-rsuite)

[Storybook: Grommet](https://undermuz.github.io/react-json-form/?path=/story/themes--ui-grommet)

## Examples

### Forms

[Storybook: Login form](https://undermuz.github.io/react-json-form/?path=/story/form-examples--login-form)

[Storybook: Signup form](https://undermuz.github.io/react-json-form/?path=/story/form-examples--signup-form)

### Custom layout

[Storybook: Wrapp form](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--wrapp-form)

[Storybook: Wrapp fields block](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--wrapp-field-block)

[Storybook: Wrapp each field](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--wrapp-each-field)

[Storybook: Vertical stack](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--vertical-stack)

[Storybook: Horizontal stack](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--horizontal-stack)

[Storybook: Grid layout](https://undermuz.github.io/react-json-form/?path=/story/custom-layout--grid-layout)
