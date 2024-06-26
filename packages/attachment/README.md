# Attachment

## Installation

`npm i @snack-uikit/attachment`

[Changelog](./CHANGELOG.md)

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## AttachmentSquare
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| file | `File` | - | Файл |
| onDownload | `(file?: File) => void` | - | Колбек на клик по кнопке скачивания |
| onDelete | `(file?: File) => void` | - | Колбек на клик по кнопке удаления |
| onRetry | `() => void` | - | Колбек на клик по кнопке повторения |
| title | `string` | fileName | Заголовок |
| description | `string` | fileExtension | Описание |
| error | `string` | - | Сообщение об ошибке |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания строки: <br> - `End` - с конца; <br> - `Middle` - по середине |
| loading | `boolean` | - | Управление состоянием загрузки |
| icon | `JSXElementConstructor<{ size?: number; className?: string; }>` | - | Иконка для файла @defaultIcon FileSVG |
| size | enum Size: `"s"`, `"m"` | s | Размер |
| checked | `boolean` | - | Управление состоянием выбран/не выбран |
| disabled | `boolean` | - | Управление состоянием интерактивности |
| onClick | `(e: MouseEvent<HTMLDivElement \| HTMLAnchorElement, MouseEvent>) => void` | - | Колбек на клик по карточке |
| className | `string` | - | CSS-класс для элемента с контентом |
## Attachment
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| file | `File` | - | Файл |
| onDownload | `(file?: File) => void` | - | Колбек на клик по кнопке скачивания |
| onDelete | `(file?: File) => void` | - | Колбек на клик по кнопке удаления |
| onRetry | `() => void` | - | Колбек на клик по кнопке повторения |
| title | `string` | fileName | Заголовок |
| description | `string` | fileExtension | Описание |
| error | `string` | - | Сообщение об ошибке |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания строки: <br> - `End` - с конца; <br> - `Middle` - по середине |
| loading | `boolean` | - | Управление состоянием загрузки |
| icon | `JSXElementConstructor<{ size?: number; className?: string; }>` | - | Иконка для файла @defaultIcon FileSVG |
| size | enum Size: `"s"`, `"m"` | s | Размер |
| checked | `boolean` | - | Управление состоянием выбран/не выбран |
| disabled | `boolean` | - | Управление состоянием интерактивности |
| onClick | `(e: MouseEvent<HTMLDivElement \| HTMLAnchorElement, MouseEvent>) => void` | - | Колбек на клик по карточке |
| className | `string` | - | CSS-класс для элемента с контентом |
| truncate | `{ title?: number; description?: number; error?: number; }` | - |  |


[//]: DOCUMENTATION_SECTION_END
