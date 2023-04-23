/*SYSTEM IMPORTS*/
import { type PropsWithChildren, useMemo } from "react"
import type { FC } from "react"

// import Editor from "react-quill"

import type {
    FunctionOnChange,
    IFieldWidgetSettings,
    JsonFormErrors,
    TypeSchemeItemSettings,
} from "./types"
import { EnumSchemeItemType } from "./types"

import JsonForm from "./JsonForm"
import { useJsonFormUi } from "./UiContext"
import { noop } from "underscore"
import { useJsonFormApi } from "./ApiContext"

// import * as Tests from 'helpers/ValueTests'
// import * as Objects from 'helpers/Objects'
// import * as Arrays from 'helpers/Arrays'

// class TextEditor extends PureComponent {
//     handleChange = (value) => {
//         this.props.onChange(value)
//         this.props.onTest(value)
//     }

//     handleSelectImage = () => {
//         const { noty, $ } = window

//         const _csrf = $('meta[name="csrf-token"]').attr("content")

//         const quill = this.quillRef.getEditor()

//         const range = quill.getSelection()

//         let pasteTo = quill.getLength()

//         if (range) {
//             pasteTo = range.index
//         }

//         console.log("handleSelectImage")

//         const inputFile = $('<input type="file" name="docfile" />').on(
//             "change",
//             async (e) => {
//                 const file = e.target.file
//                     ? e.target.file
//                     : e.target.files && e.target.files.length > 0
//                     ? e.target.files[0]
//                     : false

//                 console.log("inputFile: ", { e, file })

//                 if (file) {
//                     const response = await window.UploadImage({ file, _csrf })

//                     console.log("UploadImage: ", { response })

//                     if (response && response.status == "OK") {
//                         // quill.clipboard.dangerouslyPasteHTML( pasteTo, `<img src=${} />` )
//                         quill.insertEmbed(pasteTo, "image", response.image.url)
//                     } else {
//                         if (response && response.status == "ERROR") {
//                             noty({
//                                 text: response.error,
//                                 type: "error",
//                                 timeout: 5000,
//                                 progressBar: true,
//                             })

//                             console.error(response.error)
//                         } else {
//                             noty({
//                                 text: "Unknow error with upload file",
//                                 type: "error",
//                                 timeout: 5000,
//                                 progressBar: true,
//                             })

//                             console.error("Unknow error with upload file")
//                         }
//                     }
//                 }
//             }
//         )

//         inputFile.trigger("click")
//     }

//     quillInit = (dom) => {
//         this.quillRef = dom

//         if (this.quillRef) {
//             const toolbar = this.quillRef.getEditor().getModule("toolbar")

//             toolbar.addHandler("image", this.handleSelectImage)
//         }
//     }

//     render() {
//         const { value, settings = {} } = this.props

//         return (
//             <Editor
//                 ref={this.quillInit}
//                 theme={"snow"}
//                 defaultValue=""
//                 value={value}
//                 formats={[
//                     "header",
//                     "bold",
//                     "italic",
//                     "underline",
//                     "strike",
//                     "blockquote",
//                     "list",
//                     "bullet",
//                     "indent",
//                     "align",
//                     "direction",
//                     "link",
//                     "image",
//                 ]}
//                 modules={{
//                     toolbar: {
//                         container: [
//                             [{ header: [1, 2, 3, 4, false] }],
//                             [
//                                 "bold",
//                                 "italic",
//                                 "underline",
//                                 "strike",
//                                 "blockquote",
//                             ],
//                             [{ list: "ordered" }, { list: "bullet" }],
//                             [{ align: "" }],
//                             [{ align: "right" }],
//                             [{ align: "center" }],
//                             [{ align: "justify" }],
//                             ["link"],
//                             ["image"],
//                             ["clean"],
//                         ],
//                         handlers: {
//                             // 'link': (...arg) => console.log( arg )//::this.handleSelectImage
//                         },
//                     },
//                 }}
//                 {...settings}
//                 onChange={this.handleChange}
//             />
//         )
//     }
// }

export interface IInput {
    name?: string
    placeholder?: string
    value?: any
    type: EnumSchemeItemType
    hasError?: boolean
    title: string
    settings: TypeSchemeItemSettings
    onError?: Function
    onChange?: Function
    onFocus?: Function
    onBlur?: Function
}

const InputAsyncSelect: FC<IInput & { apiName: string }> = (props) => {
    const Ui = useJsonFormUi()

    const api = useJsonFormApi(props.apiName)

    const settings = useMemo(() => {
        const _s = props.settings

        return {
            ..._s,
            options: api,
        }
    }, [props.settings, api])

    return <Ui.Controls.Select {...props} settings={settings} />
}

const InputSelect: FC<IInput> = (props) => {
    const Ui = useJsonFormUi()

    if (props?.settings?.useApi) {
        return (
            <InputAsyncSelect
                {...props}
                apiName={props.settings.useApi as string}
            />
        )
    }

    return <Ui.Controls.Select {...props} />
}

const Input: FC<PropsWithChildren & IInput> = (props) => {
    const { value = "", type, title, settings = {}, children } = props

    const { onChange = noop, onError = noop } = props

    const Ui = useJsonFormUi()

    try {
        // if (type == "text-editor") {
        //     return (
        //         <TextEditor
        //             value={value}
        //             settings={settings}
        //             onChange={onChange}
        //             onTest={onTest}
        //         />
        //     )
        // }

        if (type == EnumSchemeItemType.Files) {
            return null
            // return (
            //     <FilesWidget
            //         value={value}
            //         {...settings}
            //         onChange={(value) => {
            //             onChange(value)
            //             onTest(value)
            //         }}
            //     />
            // )
        }

        if (type == EnumSchemeItemType.Widget) {
            const _settings = settings as IFieldWidgetSettings

            const _onError = (e: JsonFormErrors) => {
                onError([e])
            }

            return (
                <JsonForm
                    value={value}
                    title={title}
                    primary={false}
                    {..._settings}
                    onChange={onChange as FunctionOnChange}
                    onError={_onError}
                >
                    {children}
                </JsonForm>
            )
        }

        if (type == EnumSchemeItemType.Select) {
            return <InputSelect {...props} />
        }

        if (type === EnumSchemeItemType.Date) {
            return <Ui.Controls.Date {...props} />
        }

        if (type === EnumSchemeItemType.Checkbox) {
            return <Ui.Controls.CheckBox {...props} />
        }

        if (type == EnumSchemeItemType.TextBlock) {
            return <Ui.Controls.TextBlock {...props} />
        }

        return <Ui.Controls.Input {...props} />
    } catch (e) {
        console.error(`Error <Input {...${JSON.stringify(props)} }>:`)
        console.error(e)

        return <div className="alert alert-danger">{(e as Error).message}</div>
    }
}

export default Input
