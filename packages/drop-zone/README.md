# Drop Zone

## Installation

`npm i @snack-uikit/drop-zone`

[Changelog](./CHANGELOG.md)

## Description

Компоненты пакета `@snack-uikit/drop-zone` помогают организовать загрузку файлов в интерфейсе:

- **DropZone**: видимая зона для drag-n-drop‑загрузки файлов с заголовком и описанием.
- **HiddenDropZone**: «невидимая» дропзона, которая накрывает произвольный контент и появляется только при перетаскивании файлов.
- **FileUpload**: обертка над произвольной кнопкой/элементом, открывающая системный диалог выбора файла по клику.
- **Режимы загрузки**: все компоненты поддерживают одиночную и множественную загрузку файлов через проп `mode`.
- **Фильтрация типов файлов**: с помощью пропа `accept` можно ограничить доступные для выбора типы файлов.
- **Колбэк загрузки**: во всех сценариях результатом является массив выбранных/перетащенных файлов, передаваемый через `onFilesUpload`.
- **Состояние disabled**: блокирует возможность перетаскивания и выбора файлов, сохраняя отображение интерфейса.
- **Figma**: [Drop Zone](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A146267&mode=design)

## DropZone

### Description

- **Что это**: базовая, всегда видимая область для drag-n-drop‑загрузки файлов.
- **Информирование пользователя**: отображает заголовок `title` и дополнительное описание `description`, подсказывая, какие файлы и как можно загрузить.
- **Drag‑состояния**: реагирует на наведение/перетаскивание файлов (`isOver`), визуально подсвечивая активное состояние дропа.
- **Режимы**: поддерживает одиночную и множественную загрузку (`mode='single' | 'multiple'`), регулируя количество выбираемых файлов.
- **Ограничения типов**: через `accept` управляет тем, какие типы файлов доступны пользователю в системном диалоге.
- **Деактивация**: при `disabled` запрещает дроп и выбор файлов, оставляя зону статичной.
- **Колбэк**: по завершении выбора или дропа передает массив файлов в `onFilesUpload(files: File[])`.
- **Figma**: [Drop Zone](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A146267&mode=design)

### Example

```tsx
import { DropZone } from '@snack-uikit/drop-zone';

function Example() {
  const handleUpload = (files: File[]) => {
    console.log(files);
  };

  return (
    <DropZone
      title='Загрузите файл'
      description='Перетащите файл сюда или кликните по области, чтобы выбрать на устройстве'
      mode='multiple'
      accept='image/*'
      onFilesUpload={handleUpload}
      data-test-id='drop-zone'
    />
  );
}
```

## HiddenDropZone

### Description

- **Что это**: скрытая дропзона, накрывающая произвольный контент (формы, карточки и т.п.) и отображающая область дропа только в момент перетаскивания файлов.
- **Встраивание в макет**: оборачивает дочерний контент (`children`), не изменяя его структуру и позволяя добавить drag‑загрузку «поверх» существующего интерфейса.
- **Поведение при дропе**: при наведении файлов поверх контейнера отображает полупрозрачную дропзону, при этом контент может временно скрываться, но его состояние (например, значения полей формы) сохраняется.
- **Режимы и фильтрация**: так же, как `DropZone`, поддерживает `mode` и `accept` для управления количеством и типами файлов.
- **Состояние disabled**: отключает drag‑сценарий, не влияя на работу вложенного контента.
- **Колбэк**: передает загруженные файлы в `onFilesUpload(files: File[])`.
- **Figma**: [Hidden Drop Zone](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A146267&mode=design)

### Example

```tsx
import { HiddenDropZone } from '@snack-uikit/drop-zone';

function Example() {
  const handleUpload = (files: File[]) => {
    console.log(files);
  };

  return (
    <HiddenDropZone
      title='Загрузите вложения'
      description='Перетащите файлы на форму, чтобы прикрепить их'
      mode='multiple'
      accept='.pdf,.docx'
      onFilesUpload={handleUpload}
      data-test-id='hidden-drop-zone'
    >
      <div id='form'>
        {/* Любая форма или произвольный контент */}
      </div>
    </HiddenDropZone>
  );
}
```

## FileUpload

### Description

- **Что это**: компонент, превращающий произвольный дочерний элемент (чаще всего кнопку) в триггер системного диалога выбора файлов.
- **Универсальность**: позволяет сохранить любой внешний вид и поведение кнопки/контрола, добавляя к нему функциональность выбора файлов.
- **Режимы**: через `mode` управляет возможностью выбора одного или нескольких файлов.
- **Фильтрация типов**: через `accept` ограничивает список файлов в диалоге выбора.
- **Колбэк**: после выбора файлов вызывает `onFilesUpload(files: File[])` с массивом выбранных файлов.
- **Поддерживающие пропы**: пробрасывает служебные атрибуты (например, `data-test-id`) непосредственно во внутренний `<input type='file' />`.
- **Figma**: [File Upload](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A146267&mode=design)

### Example

```tsx
import { ButtonOutline } from '@snack-uikit/button';
import { FileSVG } from '@snack-uikit/icons';
import { FileUpload } from '@snack-uikit/drop-zone';

function Example() {
  const handleUpload = (files: File[]) => {
    console.log(files);
  };

  return (
    <FileUpload
      mode='multiple'
      accept='image/*'
      onFilesUpload={handleUpload}
      data-test-id='file-upload'
    >
      <ButtonOutline label='Загрузить' icon={<FileSVG />} />
    </FileUpload>
  );
}
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## DropZone
Компонент - дропзона
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| onFilesUpload* | `(files: File[]) => void` | - | Колбек загрузки файла |
| title | `string` | - | Заголовок |
| description | `ReactNode` | - | Описание |
| disabled | `boolean` | - | Деактивирован ли компонент |
| mode | enum UploadMode: `"single"`, `"multiple"` | multiple | Режим |
| accept | `string` | - | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| className | `string` | - | CSS-класс |
## HiddenDropZone
Компонент - скрытая дропзона
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| onFilesUpload* | `(files: File[]) => void` | - | Колбек загрузки файла |
| title | `string` | - | Заголовок |
| description | `ReactNode` | - | Описание |
| disabled | `boolean` | - | Деактивирован ли компонент |
| mode | enum UploadMode: `"single"`, `"multiple"` | multiple | Режим |
| accept | `string` | - | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |
| className | `string` | - | CSS-класс |
## FileUpload
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| onFilesUpload* | `(files: File[]) => void` | - | Колбек загрузки файла |
| mode | enum UploadMode: `"single"`, `"multiple"` | multiple | Режим |
| accept | `string` | - | Показывает пользователю в открывшемся диалоговом окне файлы типов, которые вы указываете в значении атрибута |


[//]: DOCUMENTATION_SECTION_END