# Dropdown

## Installation
`npm i @snack-uikit/dropdown`

[Changelog](./CHANGELOG.md)

Пакет экспортирует компонент `Dropdown` - компонент выпадающего контейнера общего назначения. Компонент  использует под собой компонент PopoverPrivate.

Чтобы указать оффсет через стили надо в triggerClassName передать css-переменную `--offset`

Например:

```scss
.triggerClassName {
  --offset: #{$some-var};
}
```

Важное уточнение, если переменная передается через  scss-var она должна быть обернута в `#{ }`

Если значение явно передано через prop `offset`, то будет применено значение пропа.


[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## Dropdown
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactNode \| ChildrenFunction` | - | Триггер поповера (подробнее читайте ниже) |
| content* | `ReactNode` | - |  |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | gte | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| triggerRef | `ForwardedRef<ReferenceType \| HTMLElement>` | - | Ref ссылка на триггер |
| outsideClick | `boolean \| OutsideClickHandler` | - | Закрывать ли при клике вне поповера |
| fallbackPlacements | `Placement[]` | - | Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает. |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | click | Условие отображения поповера: <br> - `click` - открывать по клику <br> - `hover` - открывать по ховеру <br> - `focusVisible` - открывать по focus-visible <br> - `focus` - открывать по фокусу <br> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br> - `hoverAndFocus` - открывать по ховеру и фокусу <br> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | bottom-start | Положение поповера относительно своего триггера (children). |


[//]: DOCUMENTATION_SECTION_END