# Fields

## Todo
- сделать режим выбора периода в FieldDate.

## Installation
`npm i @snack-ui/fields`

[Changelog](./CHANGELOG.md)

Поля для форм

## Example

```tsx
import { useState } from 'react';
import { FieldDate, FieldSecure, FieldSelect, FieldText, FieldTextArea } from '@snack-ui/fields';
import { PlaceholderSVG } from '@snack-ui/icons';

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
  size={FieldDate.sizes.S}
  validationState={FieldDate.validationStates.Default}
/>

...

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
  size={FieldSecure.sizes.S}
  validationState={FieldSecure.validationStates.Error}
  prefixIcon={<PlaceholderSVG/>}
/>

...

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
  size={FieldText.sizes.S}
  validationState={FieldText.validationStates.Error}
  prefixIcon={<PlaceholderSVG/>}
/>

...

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
  size={FieldTextArea.sizes.S}
  validationState={FieldTextArea.validationStates.Error}
/>

...

const [value, setValue] = useState('1234');
const [isOpen, setIsOpen] = useState(false);

<FieldSelect
  mode={FieldSelect.selectionModes.Single}
  value={value}
  onChange={setValue}
  options={[{value: 'op1', label: 'Option 1'}, {value: 'op2', label: 'Option 2'}]}
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
  size={FieldSelect.sizes.S}
  validationState={FieldSelect.validationStates.Error}
  prefixIcon={<PlaceholderSVG/>}
/>
```

## Props

### Общие props

####  **`id?: string`**
id-атрибут поля.

####  **`name?: string`**
name-атрибут поля.

####  **`disabled?: booelan`** - *`[false]`*
Деактивировано ли поле.

####  **`readonly?: booelan`** - *`[false]`*
Находится ли поле в режиме "Только для чтения".

####  **`showCopyButton?: booelan`** - *`[false]`*
Показывать ли кнопку Копировать для поля (актуально только для `readonly = true`)

####  **`required?: booelan`** - *`[false]`*
Является ли поле обязательным

#### **`label?: string`**
Лэйбл поля

#### **`labelTooltip?: string`**
Сообщение для подсказки внутри лейбла

#### **`hint?: string`**
Сообщение с подсказкой для всего поля (может использоваться для вывода сообщений в рамках валидации)

####  **`showHintIcon?: booelan`** - `[дефолтное значение зависит от состояния валидации]`
Показывать ли иконку внутри подсказки всего поля

#### **`size?: Size`** - *`[Size.S]`*
Размер поля. Возможные значения:
- `Field***.sizes.S`
- `Field***.sizes.M`
- `Field***.sizes.L`

#### **`validationState?: ValidationState`** - *`[ValidationState.Default]`*
Состояние валидации поля. Возможные значения:
- `Field***.validationStates.Default`
- `Field***.validationStates.Error`
- `Field***.validationStates.Warning`
- `Field***.validationStates.Success`

#### **`onBlur?: FocusEventHandler<HTMLInputElement>`**
Колбэк потери фокуса

#### **`onFocus?: FocusEventHandler<HTMLInputElement>`**
Колбэк получения фокуса

#### **`className?: string`**
css-класс контейнера.

### FieldDate

####  **`value?: string`**
Значение поля.

####  **`onChange?: (value: string) => void`**
Колбэк смены значения поля

####  **`open?: boolean`**
Открыт ли календарь

####  **`onOpenChange?: (value: boolean) => void`**
Колбэк, вызывающийся на изменение состояния открытия календаря

### FieldSecure

####  **`value?: string`**
Значение поля.

####  **`onChange?: (value: string, e?: ChangeEvent<HTMLInputElement>) => void`**
Колбэк смены значения поля

####  **`hidden?: boolean`**
Скрывать ли значение поля

####  **`onHiddenChange?: (value: boolean) => void`**
Колбэк, вызывающийся на изменение состояния скрытия значения поля

####  **`placeholder?: string`**
Плейсхолдер для поля.

####  **`maxLength?: number`**
Максимальное кол-во введённых символов

####  **`allowMoreThanMaxLength?: boolean`** - *`[false]`*
Можно ли вводить больше разрешённого кол-ва символов

####  **`prefixIcon?: ReactElement`**
Иконка-префикс для поля

### FieldText

####  **`value?: string`**
Значение поля.

####  **`onChange?: (value: string, e?: ChangeEvent<HTMLInputElement>) => void`**
Колбэк смены значения поля

####  **`placeholder?: string`**
Плейсхолдер для поля.

####  **`maxLength?: number`**
Максимальное кол-во введённых символов

####  **`allowMoreThanMaxLength?: boolean`** - *`[false]`*
Можно ли вводить больше разрешённого кол-ва символов

####  **`prefixIcon?: ReactElement`**
Иконка-префикс для поля

### FieldTextArea

####  **`value?: string`**
Значение поля.

####  **`onChange?: (value: string, e: ChangeEvent<HTMLTextAreaElement>) => void`**
Колбэк смены значения поля

####  **`placeholder?: string`**
Плейсхолдер для поля.

####  **`maxLength?: number`**
Максимальное кол-во введённых символов

####  **`allowMoreThanMaxLength?: boolean`** - *`[true]`*
Можно ли вводить больше разрешённого кол-ва символов

####  **`resizable?: boolean`**- *`[false]`*
Может ли ли пользователь изменять размеры поля
(если св-во не включено, поле автоматически меняет свой размер)

####  **`maxRows?: number`**
Максимальное кол-во строк, до которого размер поля может быть увеличен

### FieldSelect

#### **`selectionMode?: SelectionMode`** - *`[SelectionMode.Single]`*
Режим выбора элементов
- `FieldSelect.selectionModes.Single`
- `FieldSelect.selectionModes.Multi`

####  **`options: Option[]`**
Список опций для селекта

####  **`open?: boolean`**
Открыт ли список опций

####  **`onOpenChange?: (value: boolean) => void`**
Колбэк, вызывающийся на изменение состояния открытия списка опций

####  **`searchable?: boolean`** - *`[true]`*
Можно ли искать опции внутри списка

####  **`placeholder?: string`**
Плейсхолдер для поля.

####  **`prefixIcon?: ReactElement`**
Иконка-префикс для поля

####  **`noDataText?: string`**
Текст для сообщения об отсутсвии опций при поиске

### FieldSelect в режиме Single

####  **`value?: Option['value']`**
Значение поля.

####  **`onChange?: (value: Option['value']) => void`**
Колбэк смены значения поля

### FieldSelect в режиме Multi

####  **`value?: Option['value'][]`**
Значение поля.

####  **`onChange?: (value: Option['value'][]) => void`**
Колбэк смены значения поля

####  **`getSelectedItemsText?: (amount: number) => string`**
Колбэк смены значения поля

