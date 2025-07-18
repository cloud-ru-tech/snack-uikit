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
| jsonSchema* | `JsonSchema` | - | Схема для валидации |
| themeName | `string` | - | Название текущей темы. Значение не важно, важно что смена значения запускает пересчет стилей. |
| hasBackground | `boolean` | true | Включение/отключение псевдобекграунда |
| hasHeader | `boolean` | - | Включение/отключение шапки |
| onCopyClick | `() => void` | - | Клик по кнопке копирования |
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

### Поддержка YAML

Для обеспечения полноценной работы YAML Monaco Editor необходимо подключить `yaml.worker`. Это можно сделать следующими способами: с использованием [`window.MonacoEnvironment`](https://www.npmjs.com/package/monaco-yaml#usage) или с помощью плагина [`MonacoWebpackPlugin`](https://www.npmjs.com/package/monaco-yaml#using-monaco-webpack-loader-plugin) . Подробнее с `monaco-yaml` можно ознакомиться [тут](<(https://www.npmjs.com/package/monaco-yaml)>)

### Как редактор загружает worker?

Плагин создает новые точки входа каждого build-in воркера и для каждого дабавленного отдельно. Плагин создат глобальную переменную, используя которую редкатор будет загружать нужный воркер на основе текущего `language`.

Чтобы управлять конфигурацией загрузчика Monaco Editor, добавьте

```typescript
import * as monaco from 'monaco-editor';
import { loader } from '@snack-uikit/code-editor';
loader.config({ monaco });
```

Это позволяет динамически настраивать пути и другие параметры при инициализации редактора.

Для загрузки `monaco-editor` асинхронно можно воспользоваться следующим способом:

```typescript
// import * as monaco from 'monaco-editor'; // ~3Mb
import { lazy, Suspense } from 'react';
import { loader, CodeEditor } from '@snack-uikit/code-editor';

const Editor = lazy(async () => {
  const monaco = await import('monaco-editor').then(module => module.default);
  loader.config({ monaco });
  return { default: CodeEditor };
});

const MyComponent = () => {
  return <Suspense fallback={<Loader height={height} />}>
   <Editor />
  </Suspense>
}
```