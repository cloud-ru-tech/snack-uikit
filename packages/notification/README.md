# Notification

## Installation
`npm i @snack-uikit/notification`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/notification` предоставляет компоненты для отображения уведомлений: карточки отдельных уведомлений и панель для их группировки и управления.
- Компоненты поддерживают различные типы уведомлений через проп `appearance` (neutral, error, errorCritical, warning, success), состояния прочитано/не прочитано, фильтрацию, действия и интеграцию с системой прокрутки.
- Карточки уведомлений могут содержать заголовок, контент, ссылки, кнопки действий и дополнительные действия через выпадающий список, а также отслеживать видимость для автоматической пометки как прочитанных.
- Панель уведомлений предоставляет контейнер с заголовком, фильтрацией по сегментам, кнопкой "Отметить все как прочитанные", настройками и поддержкой состояния загрузки со скелетонами.

## NotificationCard

### Description

- `NotificationCard` — компонент карточки отдельного уведомления, отображающий информацию о событии или сообщении.
- Поддерживает **разные типы статусов** через проп `appearance` (neutral, error, errorCritical, warning, success) с соответствующей иконкой и цветовой схемой.
- Позволяет задать **лейбл категории**, **заголовок** (с обрезкой до двух строк) и **произвольный контент** уведомления.
- Отображает **дату уведомления** и **текстовую ссылку** для перехода к детальной информации.
- Поддерживает **состояние прочитано/не прочитано** (`unread`) с визуальным индикатором и автоматическим отслеживанием видимости через `onVisible` при попадании карточки в область видимости на 80%.
- Может содержать **кнопки действий** (`primaryButton`, `secondaryButton`) и **дополнительные действия** через выпадающий список (`actions`), который появляется при наведении на карточку.
- Поддерживает **обработчик клика** по всей карточке для перехода к деталям уведомления.
- Figma: [`NotificationCard`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A209668&mode=design).

### Example

```tsx
import { NotificationCard } from '@snack-uikit/notification';

function NotificationCardExample() {
  return (
    <NotificationCard
      id="notification-1"
      appearance="errorCritical"
      label="Category・Subcategory"
      title="Title truncate two line"
      content="Demo content."
      date="DD.MM.YYYY HH:MM"
      unread
      link={{
        text: 'Link to detailed information',
        href: '#',
      }}
      primaryButton={{
        label: 'Primary Button',
        onClick: () => console.log('Primary action'),
      }}
      secondaryButton={{
        label: 'Secondary Button',
        onClick: () => console.log('Secondary action'),
      }}
      actions={[
        {
          content: { option: 'action 1' },
          onClick: () => console.log('Action 1'),
        },
        {
          content: { option: 'action 2' },
          onClick: () => console.log('Action 2'),
        },
      ]}
      onVisible={(cardId) => console.log(`Card ${cardId} is visible`)}
      onClick={() => console.log('Card clicked')}
    />
  );
}
```

## NotificationPanel

### Description

- `NotificationPanel` — компонент панели для группировки и управления уведомлениями, предоставляющий контейнер с инструментами фильтрации и управления.
- Содержит **заголовок панели** и **сегментированный контроль** для фильтрации уведомлений (например, "Все" и "Непрочитанные").
- Поддерживает **кнопку "Отметить все как прочитанные"** (`readAllButton`) с возможностью добавления тултипа.
- Включает **кнопку настроек** (`settings`) с выпадающим списком для дополнительных действий.
- Отображает **произвольный контент** (`content`), обычно список `NotificationCard` или компонент `NotificationPanel.Blank` для пустого состояния.
- Поддерживает **состояние загрузки** (`loading`) с отображением скелетонов карточек уведомлений (количество настраивается через `skeletonsAmount`).
- Предоставляет **кнопку в футере** (`footerButton`) для дополнительных действий, например, перехода ко всем событиям.
- Включает **встроенную прокрутку** с поддержкой ссылок на контейнер (`scrollContainerRef`) и конец списка (`scrollEndRef`) для реализации бесконечной прокрутки или подгрузки данных.
- Содержит вспомогательные компоненты: `NotificationPanel.Blank` для пустого состояния и `NotificationPanel.Divider` для разделения групп уведомлений.
- Figma: [`NotificationPanel`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A209587&mode=design).

### Example

```tsx
import { NotificationCard, NotificationPanel } from '@snack-uikit/notification';
import { PlaceholderSVG } from '@snack-uikit/icons';

function NotificationPanelExample() {
  const cards = [
    {
      id: 'card-1',
      label: 'Category・Subcategory',
      appearance: 'errorCritical',
      title: 'Title truncate two line',
      content: 'Demo content.',
      link: {
        text: 'Link to detailed information',
        href: '#',
      },
      date: 'DD.MM.YYYY HH:MM',
      unread: true,
    },
  ];

  return (
    <NotificationPanel
      title="Notifications"
      readAllButton={{
        label: 'Mark all as read',
        onClick: () => console.log('Mark all as read'),
        tooltip: {
          tip: 'Your tip could be here',
        },
      }}
      segments={{
        items: [
          {
            value: 'All',
            label: 'All',
            counter: { value: 10 },
          },
          {
            value: 'Unread',
            label: 'Unread',
            counter: { value: 5 },
          },
        ],
        value: 'All',
        onChange: (value) => console.log('Filter changed:', value),
      }}
      settings={{
        button: {
          onClick: () => console.log('Settings clicked'),
        },
        actions: [
          {
            content: { option: 'setting 1' },
            onClick: () => console.log('Setting 1'),
          },
          {
            content: { option: 'setting 2' },
            onClick: () => console.log('Setting 2'),
          },
        ],
      }}
      footerButton={{
        label: 'All events',
        onClick: () => console.log('View all events'),
      }}
      content={
        !cards.length ? (
          <NotificationPanel.Blank
            icon={{
              icon: PlaceholderSVG,
            }}
            title="No notifications"
            description="Here you will see new event notifications\nwhen something happens"
          />
        ) : (
          cards.map(card => <NotificationCard {...card} key={card.id} />)
        )
      }
    />
  );
}
```

## NotificationPanel.Stack

### Description

- `NotificationPanel.Stack` — вспомогательный компонент для отображения группы уведомлений в виде **стека карточек** внутри `NotificationPanel`.
- Используется для **компактного отображения набора уведомлений**, которые можно свернуть/развернуть по заголовку.
- Принимает **заголовок стека** (`title`), **состояние открытия по умолчанию** (`defaultOpen`) и колбэк изменения состояния (`onOpenChanged`).
- Поддерживает **дополнительные действия** (`actions`) в виде выпадающего списка, аналогично действиям настроек панели.
- Внутри стека отрисовываются карточки `NotificationCard`.

### Example

```tsx
import { NotificationCard, NotificationPanel } from '@snack-uikit/notification';

function NotificationPanelStackExample() {
  const cards = [
    {
      id: 'card-1',
      label: 'Category・Subcategory',
      appearance: 'neutral' as const,
      title: 'First notification in stack',
      content: 'Demo content.',
      date: 'DD.MM.YYYY HH:MM',
    },
    {
      id: 'card-2',
      label: 'Category・Subcategory',
      appearance: 'neutral' as const,
      title: 'Second notification in stack',
      content: 'Another demo content.',
      date: 'DD.MM.YYYY HH:MM',
    },
  ];

  return (
    <NotificationPanel
      title="Notifications"
      content={
        <NotificationPanel.Stack
          title="Previous notifications"
          actions={[
            {
              content: { option: 'Move to archive' },
              onClick: () => console.log('Move to archive'),
            },
            {
              content: { option: 'Delete all' },
              onClick: () => console.log('Delete all'),
            },
          ]}
        >
          {cards.map(card => (
            <NotificationCard {...card} key={card.id} />
          ))}
        </NotificationPanel.Stack>
      }
    />
  );
}
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
| link | `PickLinkProps<LinkElement, "text" \| "insideText" \| "truncateVariant">` | - | Ссылка |
| onClick | `MouseEventHandler<HTMLDivElement>` | - | Колбэк клика по карточке |
| onVisible | `(cardId: string) => void` | - | Колбэк при попадании карточки в область видимости на 80% |
| primaryButton | `Omit<ButtonTonalProps, "data-test-id" \| "appearance" \| "size">` | - | Кнопка главного действия у карточки |
| secondaryButton | `Omit<ButtonSimpleProps, "data-test-id" \| "appearance" \| "size">` | - | Кнопка второстепенного действия у карточки |
| actions | `Action[]` | - | Дополнительные действия у карточки |
| className | `string` | - | CSS-класс |
## NotificationPanel
Компонент панели для уведомлений
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| title* | `string` | - | Заголовок панели |
| settings | `NotificationPanelSettingsProps` | - | Кнопка настроек и выпадающий список |
| segments | `Omit<SegmentedControlProps, "data-test-id" \| "size">` | - | Сегменты для фильтрации |
| readAllButton | `Omit<ButtonFunctionProps, "data-test-id"> & { tooltip?: TooltipProps; }` | - | Кнопка в "шапке" панели |
| footerButton | `{ label: string; onClick: MouseEventHandler<HTMLButtonElement>; }` | - | Кнопка внизу панели |
| className | `string` | - | CSS-класс |
| loading | `boolean` | - | Состояние загрузки |
| content | `ReactNode` | - | Контент для отрисовки (e.g NotificationCard \| NotificationPanel.Blank) |
| skeletonsAmount | `number` | 2 | Количество скелетонов карточек для отображения при загрузке |
| scrollEndRef | `RefObject<HTMLDivElement>` | - | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| scrollContainerRef | `RefObject<HTMLElement>` | - | Ссылка на контейнер, который скроллится |
## NotificationPanel.Blank
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| title | `string` | - | Заголовок |
| className | `string` | - | CSS-класс |
| icon | `Pick<IconPredefinedProps, "appearance" \| "icon" \| "decor">` | - | Иконка |
| description | `ReactNode` | - | Подзаголовок |
## NotificationPanel.Divider
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| text* | `string` | - | Текст разделителя |
| className | `string` | - | CSS-класс |
## NotificationPanel.Stack
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `Iterable<ReactNode>` | - | Карточки в стопке, видна первая карточка, остальные схлопываются под нее. |
| title* | `string` | - | Заголовок стопки карточек |
| defaultOpen | `boolean` | false | Состояние открыт/закрыт по умолчанию |
| onOpenChanged | `(open: boolean) => void` | - | Колбек смены состояния открыт/закрыт |
| actions | `Action[]` | - | Список действий в выпадающем меню |
## NotificationPanelPopover
Компонент-обёртка для NotificationPanel для использования как выпадающий элемент
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactElement<NotificationPanelProps, typeof NotificationPanel>` | - |  |
| contentClassName | `string` | - | CSS-класс для элемента содержащего контент |
| className | `string` | - | CSS-класс |
| children | `ReactNode \| ChildrenFunction` | - | Триггер поповера (подробнее читайте ниже) |
| triggerClassName | `string` | - | CSS-класс триггера |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| triggerRef | `ForwardedRef<HTMLElement \| ReferenceType>` | - | Ref ссылка на триггер |
| closeOnPopstate | `boolean` | - | Закрывать ли поповер при пекреходе по истории браузера |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`) |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | click | Условие отображения поповера: <br> - `click` - открывать по клику <br> - `hover` - открывать по ховеру <br> - `focusVisible` - открывать по focus-visible <br> - `focus` - открывать по фокусу <br> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br> - `hoverAndFocus` - открывать по ховеру и фокусу <br> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | bottom-end | Положение поповера относительно своего триггера (children). |


[//]: DOCUMENTATION_SECTION_END
