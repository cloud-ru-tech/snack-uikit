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
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldDate
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldDecorator
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLDivElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldSecure
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldSelect
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## FieldSlider
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldStepper
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldText
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldTextArea
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLTextAreaElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## FieldTime
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## withCharacterCount
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| __@metadata@800* | `DecoratorMetadataObject` | - |  |
| __@hasInstance@798* | `(value: any) => boolean` | - | Determines whether the given value inherits from this function if this function was used as a constructor function.  A constructor function can control which objects are recognized as its instances by 'instanceof' by overriding this method. |
| name* | `string` | - | Returns the name of the function. Function names are read-only and can not be changed. |
| caller* | `Function` | - |  |
| arguments* | `any` | - |  |
| length* | `number` | - |  |
| prototype* | `any` | - |  |
| bind* | `(this: Function, thisArg: any, ...argArray: any[]) => any` | - | For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters. @param thisArg An object to which the this keyword can refer inside the new function. @param argArray A list of arguments to be passed to the new function. |
| call* | `(this: Function, thisArg: any, ...argArray: any[]) => any` | - | Calls a method of an object, substituting another object for the current object. @param thisArg The object to be used as the current object. @param argArray A list of arguments to be passed to the method. |
| apply* | `(this: Function, thisArg: any, argArray?: any) => any` | - | Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function. @param thisArg The object to be used as the this object. @param argArray A set of arguments to be passed to the function. |
| propTypes | `WeakValidationMap<TProps>` | - | Used to declare the types of the props accepted by the component. These types will be checked during rendering and in development only.  We recommend using TypeScript instead of checking prop types at runtime. @see {@link https://react.dev/reference/react/Component#static-proptypes React Docs} @see {@link https://react.dev/reference/react/Component#static-proptypes React Docs} |
| contextType | `Context<any>` | - |  |
| contextTypes | `ValidationMap<any>` | - | @deprecated use {@link ComponentClass.contextType } instead  Lets you specify which legacy context is consumed by this component. @see {@link https://legacy.reactjs.org/docs/legacy-context.html Legacy React Docs} @deprecated Lets you specify which legacy context is consumed by this component. @see {@link https://legacy.reactjs.org/docs/legacy-context.html Legacy React Docs} |
| childContextTypes | `ValidationMap<any>` | - | @deprecated @see {@link https://legacy.reactjs.org/docs/legacy-context.html#how-to-use-context Legacy React Docs} |
| defaultProps | `Partial<TProps>` | - | Used to define default values for the props accepted by the component. @see {@link https://react.dev/reference/react/Component#static-defaultprops React Docs} @see {@link https://react.dev/reference/react/Component#static-defaultprops React Docs} @example ```tsx type Props = { name?: string }  const MyComponent: FC<Props> = (props) => {   return <div>{props.name}</div> }  MyComponent.defaultProps = {   name: 'John Doe' } ``` |
| displayName | `string` | - | Used in debugging messages. You might want to set it explicitly if you want to display a different name for debugging purposes. @see {@link https://legacy.reactjs.org/docs/react-component.html#displayname Legacy React Docs} @see {@link https://legacy.reactjs.org/docs/react-component.html#displayname Legacy React Docs} @example ```tsx  const MyComponent: FC = () => {   return <div>Hello!</div> }  MyComponent.displayName = 'MyAwesomeComponent' ``` |
| getDerivedStateFromProps | `GetDerivedStateFromProps<TProps, any>` | - |  |
| getDerivedStateFromError | `GetDerivedStateFromError<TProps, any>` | - |  |
| toString | `() => string` | function toString() { [native code] } | Returns a string representation of a function. |


[//]: DOCUMENTATION_SECTION_END
