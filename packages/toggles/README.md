# Checkbox, Radio, Switch и Favorite

## Installation
`npm i @snack-uikit/toggles`

[Changelog](../../../CHANGELOG.md)

## Description

- Пакет `@snack-uikit/toggles` предоставляет набор компонентов для реализации различных типов переключателей в интерфейсе.
- Компоненты поддерживают контролируемый и неконтролируемый режимы работы, состояния disabled, различные размеры и интеграцию с формами через стандартные HTML-атрибуты.
- Все компоненты переключателей построены на единой архитектуре и обеспечивают согласованное поведение и визуальный стиль.

## Checkbox

### Description

- `Checkbox` — компонент чекбокса для множественного выбора опций в формах, списках и фильтрах.
- Поддерживает стандартные состояния: выбран (`checked`), не выбран и частично выбран (`indeterminate`), что удобно для иерархических списков, где родительский элемент может быть частично выбран при выборе только части дочерних элементов.
- Работает в контролируемом и неконтролируемом режимах, поддерживает размеры `s` и `m`, состояние `disabled` и все стандартные HTML-атрибуты для интеграции с формами.
- Figma: [`Checkbox`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A4&mode=design).

### Example

```tsx
import { useState } from 'react';
import { Checkbox } from '@snack-uikit/toggles';

function Example() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={setChecked}
        size="m"
      />
      <Checkbox
        indeterminate={indeterminate}
        onChange={() => setIndeterminate(false)}
        size="s"
      />
    </>
  );
}
```

## Radio

### Description

- `Radio` — компонент радиокнопки для выбора одной опции из группы взаимоисключающих вариантов.
- Используется в радиогруппах, где выбор одного элемента автоматически снимает выбор с других элементов группы.
- Поддерживает размеры `s` и `m`, состояние `disabled`, работает в контролируемом и неконтролируемом режимах и интегрируется с нативными HTML-радиогруппами через атрибут `name`.
- Figma: [`Radio`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A4&mode=design).

### Example

```tsx
import { useState } from 'react';
import { Radio } from '@snack-uikit/toggles';

function Example() {
  const [value, setValue] = useState('option1');

  return (
    <>
      <Radio
        name="options"
        value="option1"
        checked={value === 'option1'}
        onChange={() => setValue('option1')}
        size="m"
      />
      <Radio
        name="options"
        value="option2"
        checked={value === 'option2'}
        onChange={() => setValue('option2')}
        size="m"
      />
    </>
  );
}
```

## Switch

### Description

- `Switch` — компонент переключателя для быстрого включения/выключения опций, настроек и функций интерфейса.
- Визуально отличается от чекбокса и радиокнопки: представляет собой ползунок, который перемещается между двумя позициями (включено/выключено).
- Поддерживает опциональное отображение иконок (`showIcon`) в состояниях включено/выключено и состояние загрузки (`loading`) с индикатором спиннера.
- Работает в контролируемом и неконтролируемом режимах, поддерживает размеры `s` и `m`, состояние `disabled`.
- Figma: [`Switch`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A4&mode=design).

### Example

```tsx
import { useState } from 'react';
import { Switch } from '@snack-uikit/toggles';

function Example() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        size="m"
      />
      <Switch
        checked={enabled}
        onChange={setEnabled}
        showIcon
        loading={loading}
        size="m"
      />
    </>
  );
}
```

## Favorite

### Description

- `Favorite` — компонент для добавления элементов в избранное или пометки их как любимых через иконку (звезда или сердце).
- Визуально представляет собой иконку, которая меняет свой вид при переключении состояния: незаполненная иконка для невыбранного состояния и заполненная — для выбранного.
- Поддерживает два типа иконок: `star` (звезда) и `heart` (сердце), которые можно выбрать через проп `icon`.
- Работает в контролируемом и неконтролируемом режимах, поддерживает размеры `s` и `m`, состояние `disabled` и обработчик нажатия клавиш клавиатуры (`onKeyUp`).
- Figma: [`Favorite`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A4&mode=design).

### Example

```tsx
import { useState } from 'react';
import { Favorite } from '@snack-uikit/toggles';

function Example() {
  const [favorited, setFavorited] = useState(false);

  return (
    <>
      <Favorite
        checked={favorited}
        onChange={setFavorited}
        icon="heart"
        size="m"
      />
      <Favorite
        checked={favorited}
        onChange={setFavorited}
        icon="star"
        size="m"
      />
    </>
  );
}
```

## ToggleGroup

### Description

- `ToggleGroup` — компонент-контейнер для управления группами переключателей с единым состоянием выбора.
- Поддерживает два режима выбора: одиночный (`selectionMode="single"`) для выбора одного элемента из группы и множественный (`selectionMode="multiple"`) для выбора нескольких элементов одновременно.
- Работает через контекст React, предоставляя дочерним элементам доступ к состоянию группы через хук `useToggleGroup`.
- Работает в контролируемом и неконтролируемом режимах, позволяя управлять выбранными значениями извне или использовать внутреннее состояние.
- Используется вместе с хуком `useToggleGroup`, который предоставляет дочерним компонентам информацию о том, выбран ли элемент (`isChecked`), обработчик клика (`handleClick`) и режим множественного выбора (`multipleSelection`).

### Example

```tsx
import { ToggleGroup, useToggleGroup } from '@snack-uikit/toggles';
import { useState } from 'react';

function ToggleCard({ id, label }: { id: string; label: string }) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '8px 16px',
        border: isChecked ? '2px solid blue' : '1px solid gray',
        backgroundColor: isChecked ? 'lightblue' : 'white',
      }}
    >
      {label}
    </button>
  );
}

function Example() {
  const [value, setValue] = useState<string | undefined>(undefined);
  const items = [
    { id: '1', label: 'Первый элемент' },
    { id: '2', label: 'Второй элемент' },
    { id: '3', label: 'Третий элемент' },
  ];

  return (
    <ToggleGroup selectionMode="single" value={value} onChange={setValue}>
      {items.map(item => (
        <ToggleCard key={item.id} id={item.id} label={item.label} />
      ))}
    </ToggleGroup>
  );
}
```


[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## Checkbox
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"s"`, `"m"` | m | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
| indeterminate | `boolean` | - | Состояние частичного выбора |
| indeterminateDefault | `boolean` | - | Состояние частичного выбора по-умолчанию |
## Switch
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"s"`, `"m"` | m | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
| showIcon | `boolean` | - | Показывать ли иконку в переключателе |
| loading | `boolean` | - |  |
## Radio
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"s"`, `"m"` | - | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
## Favorite
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| id | `string` | - | HTML-аттрибут id |
| name | `string` | - | HTML-аттрибут name |
| value | `string` | - | HTML-аттрибут value |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| autofocus | `boolean` | - | HTML-аттрибут autofocus |
| checked | `boolean` | - | HTML-аттрибут checked |
| defaultChecked | `boolean` | - | HTML-аттрибут checked по-умолчанию |
| disabled | `boolean` | - | HTML-аттрибут disabled |
| onChange | `(checked: boolean) => void` | - | Колбек смены значения |
| onClick | `MouseEventHandler<HTMLInputElement>` | - | Колбек клика |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек потери фокуса |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек приобретения фокуса |
| className | `string` | - | CSS-класс |
| size | enum Size: `"s"`, `"m"` | m | Размер |
| inputRef | `RefObject<HTMLInputElement>` | - |  |
| icon | enum FavoriteIcon: `"star"`, `"heart"` | heart | Иконка |
| onKeyUp | `KeyboardEventHandler<HTMLDivElement>` | - | Колбек нажатия клавиши клавиатуры |
## ToggleGroup
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| defaultValue | `string \| string[]` | - | Начальное состояние |
| value | `string \| string[]` | - | Controlled состояние |
| onChange | `((value: string) => void) \| ((value: string[]) => void)` | - | Controlled обработчик измения состояния |
| selectionMode | "single" \| "multiple" | single | Режим выбора |
## useToggleGroup
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| value* | `string` | - |  |


[//]: DOCUMENTATION_SECTION_END
