# @undermuz/react-json-form

(⚠️⚠️⚠️ THIS PACKAGE IS UNDER DEVELOPING ⚠️⚠️⚠️)

[React library for generate JSON-based form](https://www.npmjs.com/package/@undermuz/react-json-form)

## Install

`npm i @undermuz/react-json-form`

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
import ChakraUiTheme from "@undermuz/react-json-form/themes/chakra"
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
const scheme = {
    id: "login-form-v1",
    single: true,
    multiple: false,
    title: "My login form",
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

## Examples

[Storybook: Grommet](https://undermuz.github.io/react-json-form/?path=/story/example-jsonform--ui-grommet)
[Storybook: ChakraUi](https://undermuz.github.io/react-json-form/?path=/story/example-jsonform--ui-chakra)
[Storybook: Rsuite](https://undermuz.github.io/react-json-form/?path=/story/example-jsonform--ui-rsuite)
