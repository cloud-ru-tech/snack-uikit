# Code Editor

## Installation

`npm i @snack-uikit/code-editor`

[Changelog](./CHANGELOG.md)

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## CodeEditor
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| themeName | `string` | - | Название текущей темы. Значение не важно, важно что смена значения запускает пересчет стилей. |
| hasBackground | `boolean` | true | Включение/отключение псевдобекграунда |
| defaultValue | `string` | - | Default value of the current model |
| defaultLanguage | `string` | - | Default language of the current model |
| defaultPath | `string` | - | Default path of the current model Will be passed as the third argument to `.createModel` method `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))` |
| value | `string` | - | Value of the current model |
| language | `string` | - | Language of the current model |
| path | `string` | - | Path of the current model Will be passed as the third argument to `.createModel` method `monaco.editor.createModel(..., ..., monaco.Uri.parse(defaultPath))` |
| theme | `string` | "light" | The theme for the monaco Available options "vs-dark" \| "light" Define new themes by `monaco.editor.defineTheme` |
| line | `number` | - | The line to jump on it |
| loading | `ReactNode` | "Loading..." | The loading screen before the editor will be mounted |
| options | `IStandaloneEditorConstructionOptions` | - | IStandaloneEditorConstructionOptions |
| overrideServices | `IEditorOverrideServices` | - | IEditorOverrideServices |
| saveViewState | `boolean` | - | Indicator whether to save the models' view states between model changes or not Defaults to true |
| keepCurrentModel | `boolean` | false | Indicator whether to dispose the current model when the Editor is unmounted or not |
| width | `string \| number` | "100%" | Width of the editor wrapper |
| height | `string \| number` | "100%" | Height of the editor wrapper |
| className | `string` | - | Class name for the editor container |
| wrapperProps | `object` | - | Props applied to the wrapper element |
| beforeMount | `BeforeMount` | - | Signature: function(monaco: Monaco) => void An event is emitted before the editor is mounted It gets the monaco instance as a first argument Defaults to "noop" |
| onMount | `OnMount` | - | Signature: function(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void An event is emitted when the editor is mounted It gets the editor instance as a first argument and the monaco instance as a second Defaults to "noop" |
| onChange | `OnChange` | - | Signature: function(value: string \| undefined, ev: monaco.editor.IModelContentChangedEvent) => void An event is emitted when the content of the current model is changed |
| onValidate | `OnValidate` | - | Signature: function(markers: monaco.editor.IMarker[]) => void An event is emitted when the content of the current model is changed and the current model markers are ready Defaults to "noop" |


[//]: DOCUMENTATION_SECTION_END
