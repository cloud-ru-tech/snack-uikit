# Checkbox, Radio, Switch и Favorite
Компоненты, реализующие переключатели.

## Installation
`npm i @snack-ui/toggles`

[Changelog](../../../CHANGELOG.md)

## Общие пропсы:

#### **`checked?: boolean`**
  отмечен ли чекбокс

#### **`defaultChecked?: boolean`**
  дефолтное состояние выбранности чекбокса

#### **`disabled?: boolean`**
  деактивирован ли чекбокс

#### **`label?: string`**
  Лейбл чекбокса

#### **`labelPosition?: LabelPositions`** - *`[right]`*
  Позиция лейбла относительно чекбокса:
    `right` - справа
    `left` - слева

#### **`width?: Width`** - *`[auto]`*
  поведение ширины компонента:
    `auto` - автоматическое
    `full` - все доступное место по ширине (игнорируется когда не передан проп `label`)

#### **`size?: Size`** - *`[m]`*
  размер компонента: `s` или `m`

#### **`className?: string`**
  CSS-класс контейнера
#### **`inputRef?: RefObject<HTMLInputElement>`**
  ссылка на оригинальный HTML элемент чекбокса

#### **`id?: string`**
  id аттрибут чекбокса
#### **`name?: string`**
  name аттрибут чекбокса

#### **`tabIndex?: number`**
  tabIndex аттрибут чекбокса

#### **`autofocus?: boolean`**
  autofocus аттрибут чекбокса

#### **`onChange?: (checked: boolean) => void`**
  колбэк смены значения чекбокса

#### **`onClick?: MouseEventHandler<HTMLInputElement>`**
  колбэк клика в чекбокс

#### **`onBlur?: FocusEventHandler<HTMLInputElement>`**
  колбэк потери фокуса

#### **`onFocus?: FocusEventHandler<HTMLInputElement>`**
  колбэк получения фокуса

## Switch

#### **`showIcon?: boolean`** - *`[false]`*
  Отображать ли дополнительную иконку отражающую состояние компонента.

#### **`indeterminate?: boolean`** - *`[undefined]`*
  Флаг находится ли чекбокс в состоянии неопределенности.

#### **`indeterminateDefault?: boolean`** - *`[undefined]`*
  Флаг находится ли чекбокс в состоянии неопределенности для uncontrolled mode. При клике в чекбокс состояние неопределенности сбрасывается и чекбокс переходит состояние отмечен/не отмечен.

## Favorite

#### **`icon?: Icon`** - *`[heart]`*
  Возможные варианты: `star`, `heart`.

#### **`disabled: отсутствует в компоненте Favorite`**

## хук useToggleGroup
Хук управления группой переключателей.

### Аргументы

#### **`mode: checkbox | radio`**
  Режим работы. `checkbox` - можно выбрать несколько айтемов. `radio` - можно выбрать один айтем.

#### **`items: Array<{checked: boolean, data: DataType}>`**
  Начальное состояние переключателей. Поле `data` может хранить любой объект с данными. Тип этого поля можно передать в дженерик компонента: `<ToggleContext<DataType>>`

```tsx
const items = useToggleGroup(mode, [
  { checked: true, data: { id: '1', label: 'item1' }},
  { checked: false, data: { id: '2', label: 'item2' }},
  { checked: false, data: { id: '3', label: 'item3' }},
]);

console.log(items);
/*
  [
    { 
      checked: true,
      setChecked: (checked: boolean) => void },
      data: ...,
    },
    { checked: ... },
    { checked: ... },
  ]
*/
```

### Примеры:

#### Radio
```typescript jsx
const items = useToggleGroup(mode /* = radio */, data)

return (
  <>
    {items.map(({ checked, setChecked, data }) =>
      <CustomRadioButton
        // повторяет нативное поведение радиогруппы: по клику можно выбрать, но нельзя снять выбор
        onClick={() => setChecked(true)}
        checked={checked}
        data={data}
      />
    )}
  </>
);
```

#### Checkbox
```typescript jsx
const items = useToggleGroup(mode /* = checkbox */, data)
const checkedCount = items.filter(({ checked }) => checked).length;

return (
  <>
    {items.map(({ checked, setChecked, data }) =>
      <CustomCheckbox
        // реализует логику: снять выбор можно у любого, кроме последнего выбранного
        onClick={() => setChecked(!checked || checkedCount <= 1);}
        checked={checked}
        data={data}
      />
    )}
  </>
);
```

