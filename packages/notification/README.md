# Notification

## Installation
`npm i @snack-uikit/notification`

[Changelog](./CHANGELOG.md)

## TODO:
  - remove custom hook for droplist keyboard handles

## Example

```typescript jsx
import { NotificationCard, NotificationPanel } from '@snack-uikit/notification';

const cards = [
  {
    id: 'cardId',
    label: ['Category', 'Subcategory'].join('・'),
    appearance: 'errorCritical',
    title: 'Title truncate two line',
    content: `Demo content.`,
    link: {
      text: 'Link to detailed information',
      href: '#',
    },
    date: 'DD.MM.YYYY HH:MM',
    actions: [
      {
        option: 'action 1',
        onClick: handleActionClick,
      },
      {
        option: 'action 2',
        onClick: handleActionClick,
      },
    ],
  }
];

// ...

<NotificationPanel
  title='Notifications'
  triggerElement={<ButtonTonal label='open' />}
  readAllButton={{
    label: 'Mark all as read',
    onClick() {},
  }}
  chips={[
    {
      label: 'all',
      checked: true,
      onChange() { /* */ },
    },
    {
      label: 'unread',
      checked: false,
      onChange() { /* */ },
    },
  ]}
  content={
    !cards.length ? (
      <NotificationPanel.Blank
        icon={PlaceholderSVG}
        title='No notifications'
        description={'Here you will see new event notifications\nwhen something happens'}
      />
    ) : (
      cards.map(card => <NotificationCard {...card} key={card.id} />)
    )
  }
/>
```


[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## NotificationCard
Компонент карточки уведомления
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| date* | `string` | - | Дата уведомления |
| content* | `ReactNode` | - | Контент уведомления |
| title* | `string` | - | Заголовок уведомления |
| id* | `string` | - | Идентификатор уведомления |
| appearance | enum Appearance: `"neutral"`, `"error"`, `"errorCritical"`, `"warning"`, `"success"` | neutral | Тип уведомления |
| label | `string` | - | Лейбл перед заголовком |
| unread | `boolean` | - | Управление состоянием прочитано/не прочитано |
| link | `Omit<LinkProps, "data-test-id" \| "appearance" \| "size" \| "textMode">` | - | Ссылка |
| onClick | `MouseEventHandler<HTMLDivElement>` | - | Колбэк клика по карточке |
| onVisible | `(cardId: string) => void` | - | Колбэк при попадании карточки в область видимости на 80% |
| actions | `Pick<DroplistItemSingleProps, "onClick" \| "option" \| "caption" \| "description" \| "tagLabel" \| "disabled" \| "icon">[]` | - | Дополнительные действия у карточки |
| className | `string` | - | CSS-класс |
## NotificationPanel
Компонент панели для уведомлений
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| triggerElement* | `ReactNode \| ChildrenFunction` | - | Элемент для открытия панели |
| title* | `string` | - | Заголовок панели |
| settings | `NotificationPanelSettingsProps` | - | Кнопка настроек и выпадающий список |
| chips | `Omit<ChipToggleProps, "data-test-id" \| "size">[]` | - | Чипы для фильтрации |
| readAllButton | `Omit<ButtonFunctionProps, "data-test-id"> & { onClick: MouseEventHandler<HTMLElement>; }` | - | Кнопка в "шапке" панели |
| footerButton | `{ label: string; onClick: MouseEventHandler<HTMLButtonElement>; }` | - | Кнопка внизу панели |
| loading | `boolean` | - | Состояние загрузки |
| content | `ReactNode` | - | Контент для отрисовки (e.g NotificationCard \| NotificationPanel.Blank) |
| skeletonsAmount | `number` | 2 | Количество скелетонов карточек для отображения при загрузке |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| triggerRef | `ForwardedRef<HTMLElement \| ReferenceType>` | - | Ref ссылка на триггер |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | - | Условие отображения поповера: <br> - `click` - открывать по клику <br> - `hover` - открывать по ховеру <br> - `focusVisible` - открывать по focus-visible <br> - `focus` - открывать по фокусу <br> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br> - `hoverAndFocus` - открывать по ховеру и фокусу <br> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Положение поповера относительно своего триггера (children). |
| contentClassName | `string` | - | CSS-класс для элемента содержащего контент |
## NotificationPanel.Blank
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| title* | `ReactNode` | - | Заголовок |
| description | `ReactNode` | - | Описание |
| icon | `JSXElementConstructor<{ size?: number; className?: string; }>` | - | Иконка |
| iconAppearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | - | Цвет обводки для иконки |
| className | `string` | - | CSS-класс |


[//]: DOCUMENTATION_SECTION_END
