# Toaster

## Installation

`npm i @snack-uikit/toaster`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/toaster` предоставляет систему уведомлений (тостеров) для отображения временных сообщений пользователю: системных событий, результатов действий пользователя и прогресса загрузки файлов.
- Компоненты автоматически управляют жизненным циклом уведомлений (автозакрытие, позиционирование, лимит количества), поддерживают программное создание, обновление и закрытие через объект `toaster`, а также работают с разными визуальными вариантами (appearance) для передачи типа сообщения.
- Каждый тип тостера предназначен для своего сценария: `ToastSystemEvent` — для важных системных уведомлений с заголовком и описанием, `ToastUserAction` — для кратких сообщений о результатах действий пользователя, `ToastUpload` — для отслеживания прогресса загрузки файлов с возможностью управления процессом.

## ToastSystemEvent

### Description

- `ToastSystemEvent` — компонент для отображения системных уведомлений о важных событиях приложения (успешные операции, ошибки, предупреждения, информационные сообщения).
- Поддерживает **разные типы статусов** через проп `appearance` (neutral, success, error, errorCritical, warning) с соответствующей иконкой и цветовой схемой.
- Позволяет задать **заголовок и описание** с автоматическим усечением длинных текстов (заголовок до 2 строк, описание до 4 строк).
- Может отображать **прогресс-бар** (`progressBar`), показывающий оставшееся время до автозакрытия уведомления.
- Поддерживает **кнопку закрытия** (`closable`) с возможностью кастомизации обработчика (`onCloseClick`).
- Позволяет добавить **текстовую ссылку** (`link`) и **кнопки действий в футере** (`action`) для выполнения связанных с уведомлением операций.
- Figma: [`ToastSystemEvent`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A196736&mode=design).

### Example

```tsx
import { toaster } from '@snack-uikit/toaster';

// Создание системного уведомления
const toastId = await toaster.systemEvent.success({
  title: 'Настройки сохранены',
  description: 'Новые параметры будут применены при следующем входе в систему.',
  link: {
    text: 'Изменить ещё раз',
    href: '#',
  },
  action: [
    { label: 'Отменить', onClick: () => console.log('Revert') },
    { label: 'Подробнее', onClick: () => console.log('Details') },
  ],
  progressBar: true,
  closable: true,
});

// Обновление существующего уведомления
toaster.systemEvent.update.error(toastId, {
  title: 'Ошибка сохранения',
  description: 'Не удалось сохранить изменения. Попробуйте ещё раз.',
});

// Закрытие уведомления
toaster.systemEvent.dismiss(toastId);
```

## ToastUserAction

### Description

- `ToastUserAction` — компонент для отображения кратких уведомлений о результатах действий пользователя (успешное выполнение операции, ошибка, предупреждение).
- Поддерживает **разные типы статусов** через проп `appearance` (neutral, success, error, warning) с соответствующей иконкой и цветовой схемой.
- Отображает **краткий текст** (`label`) без описания, что делает уведомление компактным и ненавязчивым.
- Может показывать **состояние загрузки** (`loading`) с анимацией вместо иконки статуса.
- Поддерживает **текстовую ссылку** (`link`) для перехода к связанному контенту или действию.
- Отличается от `ToastSystemEvent` более компактным размером и отсутствием заголовка, описания и кнопок действий, что делает его подходящим для быстрых обратных связей на действия пользователя.
- Figma: [`ToastUserAction`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A197658&mode=design).

### Example

```tsx
import { toaster } from '@snack-uikit/toaster';

// Создание уведомления о действии пользователя
const toastId = await toaster.userAction.success({
  label: 'Файл успешно загружен',
  link: {
    text: 'Открыть',
    href: '#',
  },
});

// Обновление уведомления с состоянием загрузки
toaster.userAction.update.neutral(toastId, {
  label: 'Обработка файла...',
  loading: true,
});

// Закрытие уведомления
toaster.userAction.dismiss(toastId);
```

## ToastUpload

### Description

- `ToastUpload` — компонент для отображения прогресса загрузки одного или нескольких файлов с возможностью управления процессом (пауза, продолжение, повтор при ошибке, отмена).
- Отображает **список файлов** (`files`) с индивидуальным прогрессом каждого файла, его статусом (loading, pause, error, uploaded, errorUploaded) и возможностью управления через действия (`actions`).
- Показывает **общий прогресс загрузки** (`progress`) в виде счётчика (current/total) и процентов, а также прогресс-бар при свёрнутом состоянии.
- Поддерживает **разные статусы загрузки** (`status`) с соответствующим визуальным оформлением и доступными действиями (продолжить, приостановить, повторить).
- Позволяет **сворачивать и разворачивать** список файлов (`collapsed`, `onCollapsed`) для экономии места на экране.
- Может быть **перемещаемым** (`draggable`) с ограничениями области перемещения (`draggableBounds`).
- Поддерживает **кнопку отмены всей загрузки** (`cancelButton`) и **кнопку закрытия** (`closable`).
- Отображает **заголовок** (`title`) и **описание статуса** (`description`) для информирования пользователя о текущем состоянии загрузки.
- Figma: [`ToastUpload`](https://www.figma.com/design/jtGxAPvFJOMir7V0eQFukN/branch/qzePfVaHqZdDKogF2PYKRL/Snack-UI-Kit-5.0.0?node-id=17463-61268&t=O9Jb62r0iZv5zcdY-0).

### Example

```tsx
import { toaster } from '@snack-uikit/toaster';

// Создание или обновление уведомления о загрузке
const toastId = toaster.upload.startOrUpdate({
  title: 'Загрузка файлов',
  description: '3 минуты осталось',
  status: 'loading',
  progress: {
    current: 4,
    total: 10,
  },
  files: [
    {
      id: '1',
      title: 'document.pdf',
      formattedSize: '45 MB',
      progress: 50,
      status: 'loading',
      statusLabel: 'Загрузка...',
      actions: {
        onPause: () => console.log('Pause file 1'),
        onRetry: () => console.log('Retry file 1'),
      },
    },
    {
      id: '2',
      title: 'image.jpg',
      formattedSize: '12 MB',
      progress: 100,
      status: 'uploaded',
      statusLabel: 'Загружено',
      link: { href: '#', text: 'Открыть' },
    },
  ],
  generalActions: {
    onContinue: () => console.log('Continue all'),
    onPause: () => console.log('Pause all'),
    onRetry: () => console.log('Retry all'),
  },
  cancelButton: {
    label: 'Отменить все',
    onClick: () => console.log('Cancel all'),
  },
  closable: true,
  collapsed: false,
  draggable: true,
});

// Закрытие уведомления
toaster.upload.dismiss(toastId);
```

## Usage

```typescript
import { toaster } from '@snack-uikit/toaster';

// create userAction toast
const userActionId = await toaster.userAction.success({ label, id });

// create systemEvent toast
const systemEventId = await toaster.systemEvent.success({ title, description, id });

// update userAction toast
toaster.userAction.update.error(userActionId, { label: 'new text' });

// update systemEvent toast
toaster.systemEvent.update.error(systemEventId, {
  title: 'new text',
  description: 'new description',
});

// dismiss userAction toast
toaster.userAction.dismiss(userActionId);

// dismiss systemEvent toast
toaster.systemEvent.dismiss(systemEventId);

// create or update upload toast
const uploadToastId = toaster.upload.startOrUpdate(options);

// dismiss upload toast
toaster.upload.dismiss(uploadToastId);
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## dismissToast
`` 

Закрытие тостера
## ToastSystemEvent
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| title* | `string` | - |  |
| closeToast | `() => void` | - |  |
| toastProps | `ToastProps` | - |  |
| data | `unknown` | - |  |
| description | `string` | - |  |
| appearance | enum ToastSystemEventAppearance: `"neutral"`, `"error"`, `"errorCritical"`, `"warning"`, `"success"` | neutral |  |
| link | `ToastSystemEventLink` | - |  |
| progressBar | `boolean` | true |  |
| closable | `boolean` | true |  |
| className | `string` | - | CSS-класс |
| onCloseClick | `(e: MouseEvent<HTMLButtonElement, MouseEvent>, close?: () => void) => void` | - |  |
| action | `ButtonActionProps[]` | - |  |
| loading | `never` | - |  |
## ToastUserAction
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| label* | `string` | - |  |
| closeToast | `() => void` | - |  |
| toastProps | `ToastProps` | - |  |
| data | `unknown` | - |  |
| appearance | enum ToastUserActionAppearance: `"neutral"`, `"error"`, `"warning"`, `"success"` | neutral |  |
| link | `ToastUserActionLink` | - |  |
| className | `string` | - | CSS-класс |
| loading | `boolean` | - |  |
## ToasterContainer
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| position | enum ToastPosition: `"top-right"`, `"top-center"`, `"top-left"`, `"bottom-right"`, `"bottom-center"`, `"bottom-left"` | bottom-right |  |
| limit | `number` | 5 |  |
| containerId | `Id` | - |  |
| displayCloseAllButton | `boolean` | - |  |
| type | enum ToasterType: `"system-event"`, `"user-action"`, `"upload"` | system-event |  |
## ToastUpload
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| generalActions* | `Omit<UploadActions, "onCancel">` | - | Экшены для управления загрузкой |
| files* | `UploadItem[]` | - | Загружаемые элементы |
| progress* | `{ current: number; total: number; }` | - | Общий прогресс загрузки |
| description* | `string` | - | Описание статуса загрузки |
| status* | enum ToastUploadStatus: `"error"`, `"loading"`, `"pause"`, `"uploaded"`, `"errorUploaded"` | - | Общий статус загрузки |
| closeToast | `() => void` | - |  |
| toastProps | `ToastProps` | - |  |
| data | `unknown` | - |  |
| title | `string` | - | Заголовок тостера |
| onCloseClick | `(e: MouseEvent<HTMLButtonElement, MouseEvent>, close?: () => void) => void` | - | Закрыть тостер |
| closable | `boolean` | - | Показывать кнопку закрытия тостера |
| className | `string` | - | CSS-класс контейнера |
| collapsed | `boolean` | - | Тостер свернут/развернут |
| onCollapsed | `(collapsed: boolean) => void` | - | Развернуть/свернуть тостер |
| cancelButton | `ButtonTextNeutralProps` | - | Отмена всей загрузки |
| draggable | `boolean` | - | Перемещение тостера |
| draggableBounds | `string \| false \| DraggableBounds` | - | Ограничения перемещения тостера |


[//]: DOCUMENTATION_SECTION_END

### TODO

- Translations
