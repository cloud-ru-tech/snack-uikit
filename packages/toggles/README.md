# Toggles

## Installation
`npm i @snack-ui/toggles`

[Changelog](./CHANGELOG.md)

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

