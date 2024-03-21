import { Button } from "@chakra-ui/react"
import type { ComponentStory } from "@storybook/react"
import { type PropsWithChildren, type FC, useMemo } from "react"
import JsonFormLayout from "../../components/JsonFormLayout"
import CustomComponentsContext from "../../custom-components/context"
import { type IFormFieldCustomProps } from "../../flat-form/FormField"
import { type IInput } from "../../flat-form/form-input/input"
import { EnumSchemeItemType, type IScheme } from "../../types"

import BaseExampleForm from "./base"

const ToggleButton: FC<PropsWithChildren & IInput & IFormFieldCustomProps> = (
    props
) => {
    const texts = useMemo(() => {
        if (!props.texts) {
            return ["Allowed", "Disallowed"]
        }

        return props.texts
    }, [props.texts])

    return (
        <Button type="button" onClick={() => props.onChange?.(!props.value)}>
            {props.value ? `✅ ${texts[0]}` : `❌ ${texts[1]}`}
        </Button>
    )
}

const customComponents = {
    ToggleButton,
}

const Code1 = `
const ToggleButton: FC<PropsWithChildren & IInput & IFormFieldCustomProps> = (
    props
) => {
    const texts = useMemo(() => {
        if (!props.texts) {
            return ["Allowed", "Disallowed"]
        }

        return props.texts
    }, [props.texts])

    return (
        <Button type="button" onClick={() => props.onChange?.(!props.value)}>
            {props.value ? \`✅ \${texts[0]}\` : \`❌ \${texts[1]}\`}
        </Button>
    )
}

const customComponents = {
    ToggleButton,
}

...

`
const Code2 = `
const jsonFormRef = useRef<IJsonFormRefObject>(null)

const submit = useSubmit(jsonFormRef, onSubmit)

return (
    <form onSubmit={submit}>
        <UiContext.Provider value={ChakraUi}>
            <CustomComponentsContext.Provider value={customComponents}>
                <JsonForm
                    {...(scheme as IScheme)}
                    ref={jsonFormRef}
                    value={value}
                    onChange={setValue}
                    onError={setErrors}
                >
                    <JsonFormLayout.Form>
                        <JsonFormLayout.Fields except={["allowed_send_news"]} />
                        <JsonFormLayout.Field
                            name="allowed_send_news"
                            texts={["Enabled", "Disabled"]}
                        />
                        <Button variant={"solid"} type="submit">
                            Submit
                        </Button>
                    </JsonFormLayout.Form>
                </JsonForm>
            </CustomComponentsContext.Provider>
        </UiContext.Provider>
    </form>
)
`

const WidgetName = "Login"
const WidgetTitle = "Login"

const LoginScheme: IScheme = {
    id: WidgetName,
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
            name: "allowed_send_news",
            title: "Allow send news?",
            type: "ToggleButton",
            def_value: true,
        },
    ],
    title: WidgetTitle,
}

const Template: ComponentStory<typeof BaseExampleForm> = (args) => {
    return (
        <CustomComponentsContext.Provider value={customComponents}>
            <BaseExampleForm
                {...args}
                code={Code1}
                code2={Code2}
                scheme={LoginScheme}
            >
                <JsonFormLayout.Fields except={["allowed_send_news"]} />
                <JsonFormLayout.Field
                    name="allowed_send_news"
                    texts={["Enabled", "Disabled"]}
                />
            </BaseExampleForm>
        </CustomComponentsContext.Provider>
    )
}

const LoginForm = Template.bind({})

export default LoginForm
