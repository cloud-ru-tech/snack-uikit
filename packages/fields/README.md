# Fields

## Todo

- сделать режим выбора периода в FieldDate.
- сделать маску ввода серого цвета в FieldDate
- сбрасывать состояние tabIndex-ов при потере фокуса c кнопок

## Installation

`npm i @snack-uikit/fields`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/fields` предоставляет набор унифицированных полей для форм: текстовое и многострочное поле, селект, поля для даты и времени, числовые поля со степпером и слайдером, поле выбора цвета и обёртку-декоратор для произвольного контрола.
- Компоненты оформлены в едином визуальном стиле Snack UI Kit и поддерживают общие возможности: размеры (`size`), состояния `disabled`/`readonly`, подписи (`label`, `caption`, `hint`), отображение статуса валидации (`validationState`) и кнопку копирования значения (там, где это релевантно).
- Поля работают в контролируемом режиме, дружелюбны к e2e‑тестам (для `FieldSelect` дополнительно доступен Snack API для чтения/установки значения) и подходят для построения сложных форм с произвольной валидацией.

## FieldText

### Description

- `FieldText` — однострочное текстовое поле для ввода коротких значений (логин, заголовок, ID и т.п.) с поддержкой ограничений по длине и базовой валидацией.
- Поддерживает иконку‑префикс, произвольный префикс/постфикс и встроенную кнопку (`button`) с выпадающим списком действий и поиском по ним — удобно для быстрых операций над введённым значением.
- Может показывать кнопку очистки и кнопку копирования, работать в режимах `readonly`/`disabled`, а также управляться извне через контролируемые `value`/`onChange`.
- Figma: [`FieldText`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1).

### Example

```tsx
import { useState } from 'react';
import { FieldText } from '@snack-uikit/fields';

export function FieldTextExample() {
  const [value, setValue] = useState('');

  return (
    <FieldText
      id='field-text'
      label='Label text'
      placeholder='Placeholder'
      value={value}
      onChange={setValue}
      showCopyButton
      hint='Hint text'
      validationState='default'
      size='s'
    />
  );
}
```

## FieldTextArea

### Description

- `FieldTextArea` — многострочное поле ввода для длинных текстов (комментарии, описания, адреса) с авто‑изменением высоты или ручным ресайзом.
- Поддерживает управление минимальным и максимальным количеством строк, ограничение по длине, кнопку очистки и копирования, а также слот `footer` для размещения вспомогательных действий (кнопок, тулбаров).
- Подходит для сценариев, где важно сохранить общий паттерн полей формы и при этом дать пользователю достаточно места для ввода.
- Figma: [`FieldTextArea`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=402%3A202402&mode=design).

### Example

```tsx
import { useState } from 'react';
import { FieldTextArea } from '@snack-uikit/fields';

export function FieldTextAreaExample() {
  const [value, setValue] = useState('');

  return (
    <FieldTextArea
      id='field-textarea'
      label='Comment'
      placeholder='Введите комментарий'
      value={value}
      onChange={setValue}
      minRows={3}
      maxRows={8}
      resizable={false}
      showCopyButton
      hint='Подсказка по вводу'
      size='s'
    />
  );
}
```

## FieldSelect

### Description

- `FieldSelect` — поле выбора значения из списка с поддержкой одиночного (`selection="single"`) и множественного (`selection="multiple"`) выбора.
- Позволяет отображать группы, иконки, теги и произвольный контент в опциях, а также использовать поиск (включая нечеткий), виртуализацию большого списка и готовые состояния «нет данных», «нет результатов», «ошибка».
- Компонент работает в контролируемом режиме, поддерживает кнопку очистки, кнопку копирования для `readonly`‑режима и единый набор полевых атрибутов (`label`, `hint`, `validationState`, размеры и т.д.).
- Figma: [`FieldSelect`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1).

### Example

```tsx
import { useState } from 'react';
import { FieldSelect } from '@snack-uikit/fields';

const OPTIONS = [
  { value: 'op1', option: 'Option 1' },
  { value: 'op2', option: 'Option 2' },
];

export function FieldSelectExample() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <FieldSelect
      id='field-select'
      label='Select option'
      placeholder='Выберите значение'
      selection='single'
      options={OPTIONS}
      value={value}
      onChange={setValue}
      searchable
      showCopyButton
      size='s'
    />
  );
}
```

## FieldSecure

### Description

- `FieldSecure` — поле для ввода чувствительных данных (пароли, токены, ключи), в котором значение может быть замаскировано и раскрыто по требованию.
- Поддерживает кнопку копирования, ограничение по длине, асинхронную подгрузку значения по требованию (`asyncValueGetter`) и стандартные для полей состояния (`validationState`, `disabled`, `readonly`).
- Подходит для сценариев, где важно не показывать секреты постоянно, но при этом дать пользователю возможность временно посмотреть или загрузить значение.
- Figma: [`FieldSecure`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1).

### Example

```tsx
import { useState } from 'react';
import { FieldSecure } from '@snack-uikit/fields';

export function FieldSecureExample() {
  const [value, setValue] = useState('');
  const [hidden, setHidden] = useState(true);

  return (
    <FieldSecure
      id='field-secure'
      label='Password'
      placeholder='Введите пароль'
      value={value}
      onChange={setValue}
      hidden={hidden}
      onHiddenChange={setHidden}
      showCopyButton
      size='s'
    />
  );
}
```

## FieldDate

### Description

- `FieldDate` — поле ввода даты или даты‑времени с выпадающим календарём и поддержкой различных режимов (`mode="date"` или `mode="date-time"`).
- Позволяет кастомизировать доступность и оформление дней через `buildCellProps`, подсвечивать невалидные даты и управлять подсказками/ошибками в зависимости от выбранного значения.
- Удобно для выбора дат в формах фильтрации, создания/редактирования сущностей и любых сценариев, где требуется компактный date‑picker, встроенный в поле.
- Figma: [`FieldDate`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=402%3A202402&mode=design).

### Example

```tsx
import { useState } from 'react';
import { FieldDate } from '@snack-uikit/fields';

export function FieldDateExample() {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <FieldDate
      id='field-date'
      label='Дата'
      mode='date'
      value={value}
      onChange={setValue}
      showCopyButton
      showClearButton
      hint='Выберите подходящую дату'
      size='s'
    />
  );
}
```

## FieldTime

### Description

- `FieldTime` — поле для ввода времени с выпадающим time‑picker’ом и возможностью управлять показом секунд.
- Поддерживает копирование значения, очистку, контроль состояний `disabled`/`readonly`, а также стандартные полевые подписи и размеры.
- Используется там, где нужно задать время отдельно от даты или в дополнение к полю `FieldDate`.
- Figma: [`FieldTime`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=402%3A202402&mode=design).

### Example

```tsx
import { useState } from 'react';
import { FieldTime } from '@snack-uikit/fields';

export function FieldTimeExample() {
  const [value, setValue] = useState<FieldTime['props']['value']>();

  return (
    <FieldTime
      id='field-time'
      label='Время'
      value={value}
      onChange={setValue}
      showSeconds
      showCopyButton
      showClearButton
      size='s'
    />
  );
}
```

## FieldSlider

### Description

- `FieldSlider` — числовое поле с линейкой и ползунком, позволяющее выбирать значение или диапазон значений внутри заданных границ.
- Поддерживает линейные и нелинейные метки (`marks`), работу в режимах одиночного и диапазонного значения (`range`), форматирование отображаемого значения и настройку шагов.
- Подходит для выбора диапазонов и настроек (например, объём ресурса или проценты), при этом остаётся единым полем формы со всеми стандартными атрибутами (`label`, `hint`, `validationState`).
- Figma: [`FieldSlider`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1).

### Example

```tsx
import { useState } from 'react';
import { FieldSlider } from '@snack-uikit/fields';

export function FieldSliderExample() {
  const [value, setValue] = useState(10);

  return (
    <FieldSlider
      id='field-slider'
      label='Диапазон'
      value={value}
      onChange={setValue}
      min={10}
      max={50}
      step={1}
      showScaleBar
      size='s'
    />
  );
}
```

## FieldStepper

### Description

- `FieldStepper` — числовое поле со стрелками увеличения/уменьшения значения, удобно для небольших целых чисел (количество, шаги, приоритеты).
- Компонент поддерживает задание минимального/максимального значения, шага, отображение подсказок над кнопками и режим, разрешающий выходить за пределы мин/макс при вводе с клавиатуры (`allowMoreThanLimits`).
- Позволяет использовать префикс/постфикс и стандартные текстовые подписи, сохраняя привычный для поля UX.
- Figma: [`FieldStepper`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1).

### Example

```tsx
import { useState } from 'react';
import { FieldStepper } from '@snack-uikit/fields';

export function FieldStepperExample() {
  const [value, setValue] = useState(1);

  return (
    <FieldStepper
      id='field-stepper'
      label='Количество'
      value={value}
      onChange={setValue}
      min={0}
      max={10}
      step={1}
      size='s'
    />
  );
}
```

## FieldColor

### Description

- `FieldColor` — поле выбора цвета с интегрированным color‑picker’ом, в котором значение отображается и редактируется в текстовом виде.
- Поддерживает выбор цвета с альфаканалом (`withAlpha`), авто‑применение изменений или применение по кнопке, а также кнопку копирования, очистку и стандартные полевые подписи.
- Используется для настройки цветовых параметров (брендинг, темы, маркеры) в тех же формах, где применяются остальные поля пакета.
- Figma: [`FieldColor`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1).

### Example

```tsx
import { useState } from 'react';
import { FieldColor } from '@snack-uikit/fields';

export function FieldColorExample() {
  const [value, setValue] = useState('#794ed3');

  return (
    <FieldColor
      id='field-color'
      label='Цвет'
      placeholder='#f5f5f5'
      value={value}
      onChange={setValue}
      withAlpha
      showCopyButton
      showClearButton
      size='s'
    />
  );
}
```

## FieldDecorator

### Description

- `FieldDecorator` — обёртка‑декоратор для произвольного контрола, которая добавляет к нему общий для всех полей визуальный каркас: label, caption, hint, индикацию ошибки и состояния `disabled`/`readonly`.
- Позволяет показывать счётчик длины (`length`), размещать всплывающую подсказку у лейбла и управлять размером компонента, не навязывая конкретный тип поля ввода.
- Удобен, когда в форме используется нестандартный или составной контрол, который всё равно должен выглядеть и вести себя как поле ввода из дизайн‑системы.
- Figma: [`FieldDecorator`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1).

### Example

```tsx
import { FieldDecorator } from '@snack-uikit/fields';

export function FieldDecoratorExample() {
  return (
    <FieldDecorator
      label='Custom control'
      caption='Дополнительная подпись'
      hint='Подсказка по полю'
      size='s'
    >
      {/* Любой пользовательский контент, который должен выглядеть как поле формы */}
      <div>Custom content</div>
    </FieldDecorator>
  );
}
```

## Snack API для работы с внутренним стейтом

Иногда требуется достучаться до внутреннего состояния поля извне (например, в e2e-тестах).

При текущей реализации селекторов получить значение какого-либо HTML-инпута не получится.

В связи с чем было добавлено специальное апи, позволяющее получить и установить значение для компонента FieldSelect:

```tsx

<FieldSelect data-test-id='select' ... />
...
const select = document.querySelector('[data-test-id="select"]');
const value = select.__snackApi.getSelectValue();
select.__snackApi.setSelectValue(newValue);
```


## Example

```tsx
import { useState } from 'react';
import { FieldDate, FieldSecure, FieldSelect, FieldText, FieldTextArea } from '@snack-uikit/fields';
import { PlaceholderSVG } from '@snack-uikit/icons';

const [value, setValue] = useState('11.11.1111');
const [isOpen, setIsOpen] = useState(false);

<FieldDate
  value={value}
  onChange={setValue}
  open={isOpen}
  onOpenChange={setIsOpen}
  id='field-1'
  name='field-1'
  disabled={false}
  readonly={false}
  showCopyButton={true}
  onFocus={() => {}}
  onBlur={() => {}}
  label='Select date'
  labelTooltip='You can choose any date'
  required={true}
  hint='You have entered wrong date'
  size='s'
  validationState='default'
/>;

// ...

const [value, setValue] = useState('1234');
const [isHidden, setIsHidden] = useState(false);

<FieldSecure
  value={value}
  onChange={setValue}
  hidden={isHidden}
  onHiddenChange={setIsHidden}
  id='field-1'
  name='field-1'
  placeholder='Enter password'
  maxLength={20}
  allowMoreThanMaxLength={false}
  disabled={false}
  readonly={false}
  showCopyButton={true}
  onFocus={() => {}}
  onBlur={() => {}}
  label='Enter password'
  labelTooltip='You can enter password here'
  required={true}
  hint='You have entered wrong password'
  size='s'
  validationState='error'
  prefixIcon={<PlaceholderSVG />}
/>;

// ...

const [value, setValue] = useState('abc');

<FieldText
  value={value}
  onChange={setValue}
  id='field-1'
  name='field-1'
  placeholder='Enter text'
  maxLength={20}
  allowMoreThanMaxLength={false}
  disabled={false}
  readonly={false}
  showCopyButton={true}
  onFocus={() => {}}
  onBlur={() => {}}
  label='Enter text'
  labelTooltip='You can input any text'
  required={true}
  hint='You have entered wrong answer'
  size='s'
  validationState='error'
  prefixIcon={<PlaceholderSVG />}
/>;

// ...

const [value, setValue] = useState('abc');

<FieldTextArea
  value={value}
  onChange={setValue}
  id='field-1'
  name='field-1'
  placeholder='Enter text'
  maxLength={20}
  maxRows={8}
  resizable={true}
  allowMoreThanMaxLength={true}
  disabled={false}
  readonly={false}
  showCopyButton={true}
  onFocus={() => {}}
  onBlur={() => {}}
  label='Enter text'
  labelTooltip='You can input any text'
  required={true}
  hint='You have entered wrong answer'
  size='s'
  validationState='error'
/>;

// ...

const [value, setValue] = useState('1234');
const [isOpen, setIsOpen] = useState(false);

<FieldSelect
  mode='single'
  value={value}
  onChange={setValue}
  options={[
    { value: 'op1', option: 'Option 1' },
    { value: 'op2', option: 'Option 2' },
  ]}
  open={isHidden}
  onOpenChange={setIsOpen}
  id='field-1'
  name='field-1'
  placeholder='Select an item'
  noDataText={'No data'}
  searchable={true}
  disabled={false}
  readonly={false}
  showCopyButton={true}
  onFocus={() => {}}
  onBlur={() => {}}
  label='Select an item'
  labelTooltip='You can choose any option'
  required={true}
  hint='You have chosen wrong item'
  size='s'
  validationState='error'
  prefixIcon={<PlaceholderSVG />}
  enableFuzzySearch={true}
/>;
```
## Особенности работы FieldSlider-a

Для корректной работы компонента, свойство `marks` должно быть либо **константой**, либо **мемоизировано**, 
т.к. это на этой свойство завязана логика обновления ui.

## Особенности работы FieldStepper-a

FieldStepper в основном предназначен для работы с небольшими числами, 
которые изменяются с помощью кнопок увеличения и уменьшения значения. 
Для обеспечения консистентности в компонент была добавлена возможность ввода значений с клавиатуры, 
однако это требует валидации пользовательского ввода.

Существует два способа ограничения ввода:
1. Исправление значения после завершения ввода пользователем:
   * Такой способ есть, он активируется с помощью пропсы `allowMoreThanLimits = false`. 
   Однако, это плохой UX-паттерн, так как пользователь может не заметить, 
   что значение было изменено.
   
2. Запрет ввода чисел, превышающих максимальное или минимальное значение:
   * Такой способ можно было бы реализовать либо исправлением значения на max/min,
   либо просто не изменяя значение в поле. Однако, это ещё более плохой UX-паттерн, 
   так как может быть воспринят пользователем как неисправность.

Правильным подходом будет позволить пользователю ввести желаемое значение и, при необходимости,
подсветить его некорректность с помощью свойств validationState и hint. 
Это можно сделать по событию blur или при отправке формы.


[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## FieldColor
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| open | `boolean` | - | Открыт color-picker |
| onOpenChange | `(value: boolean) => void` | - | Колбек открытия пикера |
| showCopyButton | `boolean` | - | Отображение кнопки копирования |
| onCopyButtonClick | `() => void` | - | Колбек клика по кнопке Копировать для поля |
| showClearButton | `boolean` | true | Отображение кнопки Очистки поля |
| value | `string` | - | Значение input |
| onChange | `(value: string) => void` | - |  |
| withAlpha | `boolean` | - | Значение с альфаканалом |
| autoApply | `boolean` | - | Применять изменения автоматически, если значение false - то изменения происходят по кнопке |
| className | `string` | - | Класснейм |
| colorMode | `{ hex?: boolean; rgb?: boolean; hsv?: boolean; }` | - |  |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| placeholder | `string` | - | Значение плейсхолдера |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldDate
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| mode* | "date" \| "date-time" | - |  |
| open | `boolean` | - | Открыт date-picker |
| onOpenChange | `(value: boolean) => void` | - | Колбек открытия пикера |
| value | `Date` | - | Значение поля |
| onChange | `(value: Date) => void` | - | Колбек смены значения |
| showCopyButton | `boolean` | - | Отображение кнопки копирования |
| onCopyButtonClick | `() => void` | - | Колбек клика по кнопке Копировать для поля |
| showClearButton | `boolean` | true | Отображение кнопки Очистки поля |
| buildCellProps | `(date: Date, viewMode: ViewMode) => { isDisabled?: boolean; isHoliday?: boolean } ;` | - | Колбек установки свойств ячеек календаря. Вызывается на построение каждой ячейки. Принимает два параметра: <br> `Date` - дата ячейки <br> `ViewMode`: <br>  - `month` отображение месяца, каждая ячейка - 1 день <br>  - `year` отображение года, каждая ячейка - 1 месяц <br>  - `decade` отображение декады, каждая ячейка - 1 год <br><br> Колбек должен возвращать объект с полями, отвечающими за отключение и подкраску ячейки. |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
| showSeconds | `boolean` | - |  |
## FieldDecorator
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactNode` | - | Контент |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Деактивирован ли элемент Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только на чтение Доступно ли поле только на чтение |
| error | `string` | - |  |
| label | `string` | - | Лейбл |
| caption | `string` | - | Подпись справа от лейбла |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| labelFor | `string` | - | Аттрибут for |
| required | `boolean` | - | Является ли поле обязательным |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| length | `{ current: number; max?: number; }` | - | Допустимая длинна текста |
| hint | `string` | - | Подсказка внизу |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| ref | `LegacyRef<HTMLDivElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldSecure
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| hidden | `boolean` | - | Замаскированно ли значение поля |
| onHiddenChange | `(value: boolean) => void` | - | Колбек смены маскирования |
| showCopyButton | `boolean` | - | Отображение кнопки копирования |
| onCopyButtonClick | `() => void` | - | Колбек клика по кнопке Копировать для поля |
| allowMoreThanMaxLength | `boolean` | - | Можно ли вводить больше разрешённого кол-ва символов |
| prefixIcon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка-префикс для поля |
| asyncValueGetter | `() => Promise<string>` | - | Свойство позволяет грузить данные в поле по требованию |
| onChange | `(value: string, e?: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| value | `string` | - | Значение input |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| placeholder | `string` | - | Значение плейсхолдера |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| maxLength | `number` | - | Максимальная длина вводимого значения |
| autoComplete | `string \| boolean` | false | Включен ли автокомплит для поля |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldSelect
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| options* | `OptionProps[]` | - |  |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | false | Является ли поле деактивированным |
| readonly | `boolean` | false false | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| placeholder | `string` | - | Значение плейсхолдера |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| onKeyDown | `KeyboardEventHandler<HTMLInputElement>` | - | Колбек обработки начала нажатия клавиши клавиатуры |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | - | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | - | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| loading | `boolean` | - |  |
| prefix | `ReactNode` | - | Произвольный префикс для поля |
| postfix | `ReactNode` | - | Произвольный постфикс для поля |
| onChange | `OnChangeHandler<any>` | - | Controlled обработчик измения состояния |
| value | `ItemId \| ItemId[]` | - | Controlled состояние |
| defaultValue | `ItemId \| ItemId[]` | - | Начальное состояние |
| pinTop | `OptionProps[]` | - |  |
| pinBottom | `OptionProps[]` | - |  |
| searchable | `boolean` | - |  |
| showCopyButton | `boolean` | - | Отображение кнопки Копировать для поля (актуально только для `readonly = true`) |
| onCopyButtonClick | `() => void` | - | Колбек клика по кнопке Копировать для поля |
| showClearButton | `boolean` | true | Отображение кнопки очистки поля |
| prefixIcon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка-префикс для поля |
| footer | `ReactNode` | - |  |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | - |  |
| search | `SearchState` | - |  |
| autocomplete | `boolean` | - |  |
| addOptionByEnter | `boolean` | - |  |
| open | `boolean` | - |  |
| enableFuzzySearch | `boolean` | - | Включить нечеткий поиск |
| resetSearchOnOptionSelection | `boolean` | true | Поведение строки поиска при выборе опции из списка, false необходимо при асинхронной подгрузке значений с бэка, в случае если надо поиск оставить как значение при отсутствии данных |
| onOpenChange | `(open: boolean) => void` | - |  |
| selectedOptionFormatter | `SelectedOptionFormatter` | - |  |
| scrollToSelectedItem | `boolean` | - | Флаг, отвещающий за прокручивание до выбранного элемента |
| virtualized | `boolean` | - | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| untouchableScrollbars | `boolean` | - | Отключает возможность взаимодействовать со скролбарами мышью. |
| dataFiltered | `boolean` | - |  |
| dataError | `boolean` | - |  |
| noDataState | `EmptyStateProps` | - | Экран при отстутствии данных |
| noResultsState | `EmptyStateProps` | - | Экран при отстутствии результатов поиска или фильтров |
| errorDataState | `EmptyStateProps` | - | Экран при ошибке запроса |
| selection | "single" \| "multiple" | - |  |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
| removeByBackspace | `boolean` | - |  |
## FieldSlider
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| postfixIcon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка-постфикс для поля |
| showScaleBar | `boolean` | true | Отображение линейки |
| textInputFormatter | `TextInputFormatter` | - | Функция для форматирования значений в текстовом поле |
| unbindInputFromMarks | `boolean` | - | Отвязать текстовое поле от значений на линейке |
| prefix | `ReactNode` | - | Произвольный префикс для поля |
| postfix | `ReactNode` | - | Произвольный постфикс для поля |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| onChange | `(value: number \| number[]) => void` | - |  |
| value | `number \| number[]` | - |  |
| range | `boolean` | - |  |
| tipFormatter | `(value: string \| number) => ReactNode` | - |  |
| step | `number` | - |  |
| min | `number` | - |  |
| max | `number` | - |  |
| marks | `Record<string \| number, ReactNode \| MarkObj>` | - |  |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldStepper
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| value | `number` | - | Значение поля |
| onChange | `(value: number, e?: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| step | `number` | 1 | Шаг поля |
| allowMoreThanLimits | `boolean` | true | Можно ли вводить c клавиатуры числа, выходящие за пределы min/max |
| prefix | `ReactNode` | - | Произвольный префикс для поля |
| postfix | `ReactNode` | - | Произвольный постфикс для поля |
| plusButtonTooltip | `TooltipProps` | - | Тултип над кнопкой увеличения значения |
| minusButtonTooltip | `TooltipProps` | - | Тултип над кнопкой уменьшения значения |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| min | `number` | Number.NEGATIVE_INFINITY | Минимальное значение поля |
| max | `number` | Number.POSITIVE_INFINITY | Максимальное значение поля |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldText
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| showCopyButton | `boolean` | - | Отображение кнопки Копировать для поля (актуально только для `readonly = true`) |
| onCopyButtonClick | `() => void` | - | Колбек клика по кнопке Копировать для поля |
| showClearButton | `boolean` | true | Отображение кнопки очистки поля |
| onClearButtonClick | `() => void` | - | Колбек клика по кнопке очистки поля |
| allowMoreThanMaxLength | `boolean` | - | Можно ли вводить больше разрешённого кол-ва символов |
| prefixIcon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка-префикс для поля |
| prefix | `ReactNode` | - | Произвольный префикс для поля |
| postfix | `ReactNode` | - | Произвольный постфикс для поля |
| button | `Button` | - | Кнопка действия внутри поля |
| type | "text" \| "tel" \| "email" | text |  |
| onChange | `(value: string, e?: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| value | `string` | - | Значение input |
| inputMode | enum InputMode: `"none"`, `"text"`, `"search"`, `"tel"`, `"email"`, `"decimal"`, `"numeric"`, `"url"` | - | Режим работы экранной клавиатуры |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| placeholder | `string` | - | Значение плейсхолдера |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| maxLength | `number` | - | Максимальная длина вводимого значения |
| autoComplete | `string \| boolean` | false | Включен ли автокомплит для поля |
| spellCheck | `boolean` | true | Значение атрибута spellcheck (проверка орфографии) |
| pattern | `string` | - | Регулярное выражение валидного инпута |
| onKeyDown | `KeyboardEventHandler<HTMLInputElement>` | - | Колбек обработки начала нажатия клавиши клавиатуры |
| onPaste | `ClipboardEventHandler<HTMLInputElement>` | - | Колбек обработки вставки значения |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldTextArea
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| minRows | `number` | 3 | Минимальное кол-во строк, до которого размер поля может быть увеличен |
| maxRows | `number` | 1000 | Максимальное кол-во строк, до которого размер поля может быть увеличен |
| resizable | `boolean` | - | Может ли ли пользователь изменять размеры поля (если св-во не включено, поле автоматически меняет свой размер) |
| onChange | `(value: string, e?: ChangeEvent<HTMLTextAreaElement>) => void` | - | Колбек смены значения |
| showCopyButton | `boolean` | - | Отображение кнопки Копировать для поля (актуально только для `readonly = true`) |
| onCopyButtonClick | `() => void` | - | Колбек клика по кнопке Копировать для поля |
| showClearButton | `boolean` | true | Отображение кнопки очистки поля |
| allowMoreThanMaxLength | `boolean` | true | Можно ли вводить больше разрешённого кол-ва символов |
| footer | `ReactNode` | - | Нода под футер |
| value | `string` | - | HTML-аттрибут value |
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только на чтение |
| onFocus | `FocusEventHandler<HTMLTextAreaElement>` | - | Колбек получения фокуса |
| onBlur | `FocusEventHandler<HTMLTextAreaElement>` | - | Колбек потери фокуса |
| placeholder | `string` | - | Плейсхолдер |
| autoFocus | `boolean` | - | Включен ли авто-фокус |
| maxLength | `number` | - | Максимальное кол-во символов |
| inputMode | enum InputMode: `"none"`, `"text"`, `"search"`, `"tel"`, `"email"`, `"decimal"`, `"numeric"`, `"url"` | - | Режим работы экранной клавиатуры |
| spellCheck | `boolean` | true | Включение проверки орфографии |
| onKeyDown | `KeyboardEventHandler<HTMLTextAreaElement>` | - | Колбек нажатия клавиши клавиатуры |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| ref | `LegacyRef<HTMLTextAreaElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldTime
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| open | `boolean` | - | Открыт time-picker |
| onOpenChange | `(value: boolean) => void` | - | Колбек открытия пикера |
| value | `TimeValue` | - | Значение поля |
| onChange | `(value?: TimeValue) => void` | - | Колбек смены значения |
| showCopyButton | `boolean` | - | Отображение кнопки копирования |
| onCopyButtonClick | `() => void` | - | Колбек клика по кнопке Копировать для поля |
| showSeconds | `boolean` | true | Показывать ли секунды |
| showClearButton | `boolean` | true | Отображение кнопки Очистки поля |
| id | `string` | - | Значение html-атрибута id |
| name | `string` | - | Значение html-атрибута name |
| disabled | `boolean` | - | Является ли поле деактивированным |
| readonly | `boolean` | - | Является ли поле доступным только для чтения |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| autoFocus | `boolean` | false | Включен ли авто-фокус для поля |
| className | `string` | - | CSS-класс |
| label | `string` | - | Лейбл |
| labelTooltip | `ReactNode` | - | Всплывающая подсказка лейбла |
| required | `boolean` | - | Является ли поле обязательным |
| caption | `string` | - | Подпись справа от лейбла |
| hint | `string` | - | Подсказка внизу |
| showHintIcon | `boolean` | - | Отображать иконку подсказки |
| size | enum Size: `"s"`, `"m"`, `"l"` | SIZE.S | Размер |
| validationState | enum ValidationState: `"error"`, `"default"`, `"warning"`, `"success"` | default | Состояние валидации |
| labelTooltipPlacement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Расположение подсказки лейбла |
| error | `string` | - |  |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |


[//]: DOCUMENTATION_SECTION_END
