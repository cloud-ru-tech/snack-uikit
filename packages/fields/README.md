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
import { FieldDate, FieldSecure } from '@snack-ui/fields';
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
  label='Select date'
  labelTooltip='You can choose any date'
  required={true}
  hint='You have entered wrong date'
  size={FieldSecure.sizes.S}
  validationState={FieldSecure.validationStates.Default}
  prefixIcon={<PlaceholderSVG />}
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

####  **`allowMoreThanMaxLength?: number`** - *`[false]`*
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

####  **`allowMoreThanMaxLength?: number`** - *`[false]`*
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

####  **`allowMoreThanMaxLength?: number`** - *`[true]`*
Можно ли вводить больше разрешённого кол-ва символов

####  **`resizable?: boolean`**- *`[false]`*
Может ли ли пользователь изменять размеры поля 
(если св-во не включено, поле автоматически меняет свой размер)

####  **`maxRows?: number`**
Максимальное кол-во строк, до которого размер поля может быть увеличен
