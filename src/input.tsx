/*SYSTEM IMPORTS*/
import React, { FC } from "react"

// import Editor from "react-quill"
import Select from "react-select"

import "react-datepicker/dist/react-datepicker.css"
import GeoSelect from "./Inputs/GeoSelect"
// import DateSelect from "./Inputs/DateSelect"

import { isArray } from "underscore"

import {
    EnumSchemeItemType,
    FunctionOnChange,
    TypeSchemeItemSettings,
} from "./types"
import { IFieldWidgetSettings } from "./Widget"
import { CheckBox, DateInput, TextArea, TextInput } from "grommet"
import WidgetBuilder from "./WidgetBuilder"

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

interface TypeSelectValue {
    label: string
    value: number
}

interface IInput {
    name: string
    value: any
    type: EnumSchemeItemType
    title: string
    settings: TypeSchemeItemSettings
    onChange: Function
    onTest: Function
}

const Input: FC<IInput> = (props) => {
    const { name, value, type, title, settings = {} } = props

    const { onChange, onTest } = props

    try {
        if (type == EnumSchemeItemType.Widget) {
            const _settings = settings as IFieldWidgetSettings

            return (
                <WidgetBuilder
                    value={value}
                    title={title}
                    {..._settings}
                    onChange={onChange as FunctionOnChange}
                />
            )
        }

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

        if (type == EnumSchemeItemType.Select) {
            const list: number[] = isArray(value) ? (value as number[]) : []

            return (
                <Select
                    isMulti={settings.multiple ? true : false}
                    name={name}
                    value={
                        settings.multiple
                            ? list.map((_val) => ({
                                  label:
                                      settings.options.find(
                                          (_i: TypeSelectValue) =>
                                              _i.value == _val
                                      )?.label || "(Not found)",
                                  value: _val,
                              }))
                            : value
                    }
                    options={settings.options}
                    onBlur={() => onTest}
                    onChange={(_value: any) => {
                        if (settings.multiple) {
                            const _list: TypeSelectValue[] = isArray(_value)
                                ? (_value as TypeSelectValue[])
                                : []

                            onChange(_list.map((_val) => _val.value))
                        } else {
                            onChange(_value)
                        }
                    }}
                />
            )
        }
        if (type === EnumSchemeItemType.Checkbox) {
            return (
                <CheckBox
                    checked={Boolean(value)}
                    name={name}
                    label={title}
                    onChange={(event) => onChange(event.target.checked)}
                    onMouseLeave={(e) => onTest(e.currentTarget.checked)}
                />
            )
        }

        if (type === EnumSchemeItemType.Date) {
            return (
                <DateInput
                    format="dd.mm.yyyy"
                    value={value ? value : undefined}
                    onChange={({ value }) => onChange(value)}
                />
            )
        }

        if (type == "geo") {
            return (
                <GeoSelect
                    name={name}
                    value={value}
                    onChange={onChange}
                    onTest={onTest}
                />
            )
        }

        if (type == EnumSchemeItemType.TextBlock) {
            return (
                <TextArea
                    value={value}
                    className="form-control"
                    {...settings}
                    onBlur={(e) => onTest(e.currentTarget.value)}
                    onChange={(event) => onChange(event.currentTarget.value)}
                />
            )
        }

        return (
            <TextInput
                placeholder={name}
                name={name}
                type={type || "text"}
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
                onBlur={(e) => onTest(e.currentTarget.value)}
            />
        )
    } catch (e) {
        console.error(`Error <Input {...${JSON.stringify(props)} }>:`)
        console.error(e)

        return <div className="alert alert-danger">{(e as Error).message}</div>
    }
}

export default Input
