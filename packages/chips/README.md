# Chips

## Installation

`npm i @snack-uikit/chips`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/chips` предоставляет набор компонентов для создания интерактивных чипов: простые кнопки-чипы (`ChipAssist`), переключатели с состоянием (`ChipToggle`), чипы с выпадающими списками для выбора значений (`ChipChoice` с различными вариантами) и контейнер для группировки фильтров (`ChipChoiceRow`).
- Компоненты поддерживают различные размеры, состояния загрузки и отключения, работу с иконками и длинными текстами с автоматическим обрезанием.
- Чипы используются для фильтрации, выбора значений, переключения состояний и навигации в интерфейсе.

## ChipAssist

### Description

- `ChipAssist` — простой чип-кнопка с лейблом, предназначенный для выполнения действий или навигации.
- Поддерживает опциональную иконку, состояния загрузки и отключения, а также различные размеры.
- При клике вызывает переданный обработчик `onClick`.
- Figma: [`ChipAssist`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A146809&mode=design).

### Example

```tsx
import { ChipAssist } from '@snack-uikit/chips';
import { PlaceholderSVG } from '@snack-uikit/icons';

function Example() {
  return (
    <ChipAssist
      label='Label'
      icon={<PlaceholderSVG />}
      size='s'
      disabled={false}
      loading={false}
      onClick={() => console.log('Clicked')}
    />
  );
}
```

## ChipToggle

### Description

- `ChipToggle` — чип-переключатель с состоянием выбран/не выбран, работающий как чекбокс.
- Поддерживает контролируемое состояние через проп `checked` и обработчик `onChange`.
- Может отображать иконку, состояние загрузки и работать в отключённом режиме.
- Figma: [`ChipToggle`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A152239&mode=design).

### Example

```tsx
import { useState } from 'react';
import { ChipToggle } from '@snack-uikit/chips';
import { PlaceholderSVG } from '@snack-uikit/icons';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <ChipToggle
      label='Label'
      icon={<PlaceholderSVG />}
      size='s'
      checked={checked}
      onChange={setChecked}
    />
  );
}
```

## ChipChoice

### Description

- `ChipChoice` — семейство чипов с выпадающими списками для выбора значений различных типов: одиночный выбор из списка (`Single`), множественный выбор (`Multiple`), выбор даты (`Date`), выбор диапазона дат (`DateRange`), выбор времени (`Time`) и кастомный вариант с произвольным контентом (`Custom`).
- Все варианты поддерживают лейбл, иконку, состояние загрузки, кнопку очистки значения и настройку позиционирования выпадающего меню.
- Компоненты работают в контролируемом и неконтролируемом режимах, поддерживают виртуализацию для больших списков и кастомизацию отображения значений.

## ChipChoice.Single

### Description

- `ChipChoice.Single` — чип для одиночного выбора значения из списка опций.
- Отображает выбранное значение в чипе и открывает выпадающий список с опциями при клике.
- Поддерживает поиск по опциям, виртуализацию для больших списков, кастомное отображение элементов списка и автоматическое применение выбранного значения.
- Figma: [`ChipChoice.Single`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A148671&mode=design).

### Example

```tsx
import { ChipChoice } from '@snack-uikit/chips';

function Example() {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  return (
    <ChipChoice.Single
      label='Label'
      value='option1'
      options={options}
      onChange={(value) => console.log(value)}
    />
  );
}
```

## ChipChoice.Multiple

### Description

- `ChipChoice.Multiple` — чип для множественного выбора значений из списка опций.
- Позволяет выбрать несколько элементов одновременно, отображая выбранные значения в чипе.
- Поддерживает поиск, виртуализацию, кастомное отображение элементов и автоматическое применение выбранных значений.
- Figma: [`ChipChoice.Multiple`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A147240&mode=design).

### Example

```tsx
import { ChipChoice } from '@snack-uikit/chips';

function Example() {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  return (
    <ChipChoice.Multiple
      label='Label'
      value={['option1', 'option2']}
      options={options}
      onChange={(value) => console.log(value)}
    />
  );
}
```

## ChipChoice.Date

### Description

- `ChipChoice.Date` — чип для выбора даты с встроенным календарём.
- Поддерживает различные режимы выбора: дата (`date`), месяц (`month`), год (`year`) и дата со временем (`date-time`).
- Позволяет настроить отображение выбранной даты через `valueRender` и управлять доступностью ячеек календаря через `buildCalendarCellProps`.
- Figma: [`ChipChoice.Date`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A150102&mode=design).

### Example

```tsx
import { ChipChoice } from '@snack-uikit/chips';

function Example() {
  return (
    <ChipChoice.Date
      label='Label'
      value={new Date()}
      onChange={(value) => console.log(value)}
      mode='date'
    />
  );
}
```

## ChipChoice.DateRange

### Description

- `ChipChoice.DateRange` — чип для выбора диапазона дат с календарём.
- Позволяет выбрать начальную и конечную дату диапазона, отображая выбранный период в чипе.
- Поддерживает кастомное форматирование диапазона через `valueRender` и управление доступностью ячеек календаря.
- Figma: [`ChipChoice.DateRange`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A151169&mode=design).

### Example

```tsx
import { ChipChoice } from '@snack-uikit/chips';

function Example() {
  return (
    <ChipChoice.DateRange
      label='Label'
      value={[new Date('2022-10-15'), new Date('2023-10-15')]}
      onChange={(value) => console.log(value)}
    />
  );
}
```

## ChipChoice.Time

### Description

- `ChipChoice.Time` — чип для выбора времени (часы, минуты, секунды).
- Отображает выбранное время в чипе и открывает интерфейс выбора времени при клике.
- Поддерживает отображение секунд через проп `showSeconds` и кастомное форматирование времени через `valueRender`.
- Figma: [`ChipChoice.Time`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A150102&mode=design).

### Example

```tsx
import { ChipChoice } from '@snack-uikit/chips';

function Example() {
  return (
    <ChipChoice.Time
      label='Label'
      value={{ hours: 20, minutes: 15, seconds: 30 }}
      onChange={(value) => console.log(value)}
      showSeconds
    />
  );
}
```

## ChipChoice.Custom

### Description

- `ChipChoice.Custom` — чип с произвольным контентом в выпадающем меню.
- Позволяет полностью кастомизировать содержимое выпадающего списка через проп `content`, который может быть React-элементом или функцией, получающей методы управления дроплистом.
- Подходит для создания сложных интерфейсов выбора, не укладывающихся в стандартные варианты `ChipChoice`.
- Figma: [`ChipChoice.Custom`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A148671&mode=design).

### Example

```tsx
import { useState } from 'react';
import { ChipChoice } from '@snack-uikit/chips';

function Example() {
  const [value, setValue] = useState<string>();

  return (
    <ChipChoice.Custom
      label='Label'
      value={value}
      onChange={setValue}
      valueRender={() => value}
      content={({ closeDroplist }) => (
        <button onClick={() => { setValue('custom'); closeDroplist(); }}>
          Select custom value
        </button>
      )}
    />
  );
}
```

## ChipChoiceRow

### Description

- `ChipChoiceRow` — контейнер для группировки нескольких чипов-фильтров в одну строку.
- Управляет состоянием всех фильтров, отображает кнопку очистки всех фильтров и кнопку добавления новых фильтров.
- Поддерживает управление видимостью фильтров через `visibleFilters` и `onVisibleFiltersChange`, позволяя скрывать и показывать отдельные чипы.
- Работает с любыми вариантами `ChipChoice` и другими чипами, переданными в массиве `filters`.
- Figma: [`ChipChoiceRow`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A152236&mode=design).

### Example

```tsx
import { useState } from 'react';
import { ChipChoiceRow, ChipChoice } from '@snack-uikit/chips';

function Example() {
  const [filters, setFilters] = useState({});

  const filterConfig = [
    {
      id: 'status',
      label: 'Status',
      component: ChipChoice.Single,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ];

  return (
    <ChipChoiceRow
      filters={filterConfig}
      value={filters}
      onChange={setFilters}
      size='s'
    />
  );
}
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## ChipAssist
Чип с лейблом
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| onClick* | `MouseEventHandler<HTMLButtonElement>` | - | Колбек обработки клика |
| label* | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | middle | Вариант обрезания лейбла |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
## ChipToggle
Чип с состоянием выбран/не выбран
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| onChange* | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| checked* | `boolean` | - | Отмечен ли компонент |
| label* | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | middle | Вариант обрезания лейбла |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
## ChipChoice.Custom
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| label | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания лейбла Вариант обрезания значения |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | - | Размер |
| onClick | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | - | Колбек обработки клика |
| disableFuzzySearch | `boolean` | false | Отключает Fuzzy Search. Иногда в дроплисте могут быть различные айдишники - нам важно искать их без Fuzzy Search |
| onClearButtonClick | `MouseEventHandler<HTMLButtonElement>` | - | Колбек для клика по кнопке очистки |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | - | Расположение выпадающего меню |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | gte | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| dropDownClassName | `string` | - |  |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| valueRender | `(value: any) => ReactNode` | - | Отображаемое значение |
| value | `any` | - | Фактическое значение. Используется для отображения кнопки очистки, если свойство <strong>showClearButton=true</strong> |
| onChange | `(value: any) => void` | - |  |
| content | `(props: CustomContentRenderProps<any>) => ReactNode` | - | Контент выпадающего меню <br> <br> Принимает <strong>ReactNode</strong> <br> Или функцию с аргументами: <br> <strong>handleDroplistItemKeyDown</strong>: Обработчик нажатия клавиши на элемент выпадающего меню <br> <strong>closeDroplist</strong>: Метод для закрытия выпадающего меню |
## ChipChoice.Single
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| options* | `FilterOption<T>[]` | - | Массив опций |
| label | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки Флаг, отвещающий за состояние загрузки списка |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания лейбла Вариант обрезания значения |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | - | Размер |
| onClick | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | - | Колбек обработки клика |
| disableFuzzySearch | `boolean` | false | Отключает Fuzzy Search. Иногда в дроплисте могут быть различные айдишники - нам важно искать их без Fuzzy Search |
| onClearButtonClick | `MouseEventHandler<HTMLButtonElement>` | - | Колбек для клика по кнопке очистки |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | - | Расположение выпадающего меню |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | gte | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| dropDownClassName | `string` | - |  |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| contentRender | `(option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => ReactNode` | - |  |
| filterFn | `(option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => boolean` | - |  |
| searchable | `boolean` | - |  |
| autoApply | `boolean` | - | Флаг, отвечающий за применение выбранного значения по умолчанию |
| onApprove | `() => void` | - | Колбек основной кнопки |
| onCancel | `() => void` | - | Колбек кнопки отмены |
| footer | `ReactNode ;` | - | Кастомизируемый элемент в конце списка |
| footerActiveElementsRefs | `RefObject<HTMLElement>[]` | - | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| scrollToSelectedItem | `boolean` | - | Флаг, отвещающий за прокручивание до выбранного элемента |
| virtualized | `boolean` | - | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| selection | `SelectionSingleState \| SelectionMultipleState` | - |  |
| scrollRef | `RefObject<HTMLElement>` | - | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| scrollContainerRef | `RefObject<HTMLElement>` | - | Ссылка на контейнер, который скроллится |
| dataFiltered | `boolean` | - |  |
| dataError | `boolean` | - |  |
| noDataState | `EmptyStateProps` | - | Экран при отстутствии данных |
| noResultsState | `EmptyStateProps` | - | Экран при отстутствии результатов поиска или фильтров |
| errorDataState | `EmptyStateProps` | - | Экран при ошибке запроса |
| onChange | `OnChangeHandler<any>` | - | Controlled обработчик измения состояния |
| value | `ItemId` | - | Controlled состояние |
| defaultValue | `ItemId` | - | Начальное состояние |
| valueRender | `(option?: BaseOption<T>) => ReactNode` | - | Колбек формирующий отображение выбранного значения. Принимает выбранное значение. По умолчанию для отображения используется FilterOption.label |
## ChipChoice.Multiple
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| options* | `FilterOption<T>[]` | - | Массив опций |
| label | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки Флаг, отвещающий за состояние загрузки списка |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания лейбла Вариант обрезания значения |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | - | Размер |
| onClick | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | - | Колбек обработки клика |
| disableFuzzySearch | `boolean` | false | Отключает Fuzzy Search. Иногда в дроплисте могут быть различные айдишники - нам важно искать их без Fuzzy Search |
| onClearButtonClick | `MouseEventHandler<HTMLButtonElement>` | - | Колбек для клика по кнопке очистки |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | - | Расположение выпадающего меню |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | gte | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| dropDownClassName | `string` | - |  |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| contentRender | `(option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => ReactNode` | - |  |
| filterFn | `(option: { label: ItemId; value?: ItemId; contentRenderProps?: T; }) => boolean` | - |  |
| searchable | `boolean` | - |  |
| autoApply | `boolean` | - | Флаг, отвечающий за применение выбранного значения по умолчанию |
| onApprove | `() => void` | - | Колбек основной кнопки |
| onCancel | `() => void` | - | Колбек кнопки отмены |
| footer | `ReactNode ;` | - | Кастомизируемый элемент в конце списка |
| footerActiveElementsRefs | `RefObject<HTMLElement>[]` | - | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| scrollToSelectedItem | `boolean` | - | Флаг, отвещающий за прокручивание до выбранного элемента |
| virtualized | `boolean` | - | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| selection | `SelectionSingleState \| SelectionMultipleState` | - |  |
| scrollRef | `RefObject<HTMLElement>` | - | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| scrollContainerRef | `RefObject<HTMLElement>` | - | Ссылка на контейнер, который скроллится |
| dataFiltered | `boolean` | - |  |
| dataError | `boolean` | - |  |
| noDataState | `EmptyStateProps` | - | Экран при отстутствии данных |
| noResultsState | `EmptyStateProps` | - | Экран при отстутствии результатов поиска или фильтров |
| errorDataState | `EmptyStateProps` | - | Экран при ошибке запроса |
| onChange | `OnChangeHandler<any>` | - | Controlled обработчик измения состояния |
| value | `ItemId[]` | - | Controlled состояние |
| defaultValue | `ItemId[]` | - | Начальное состояние |
| valueRender | `(option?: BaseOption<T>[]) => ReactNode` | - | Колбек формирующий отображение выбранного значения. Принимает выбранное значение. По умолчанию для отображения используется FilterOption.label |
## ChipChoice.Date
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| label | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания лейбла Вариант обрезания значения |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | - | Размер |
| onClick | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | - | Колбек обработки клика |
| disableFuzzySearch | `boolean` | false | Отключает Fuzzy Search. Иногда в дроплисте могут быть различные айдишники - нам важно искать их без Fuzzy Search |
| onClearButtonClick | `MouseEventHandler<HTMLButtonElement>` | - | Колбек для клика по кнопке очистки |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | - | Расположение выпадающего меню |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | gte | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| dropDownClassName | `string` | - |  |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| value | `Date` | - | Значение компонента |
| defaultValue | `Date` | - | Значение компонента по-умолчанию |
| onChange | `(value: Date) => void` | - | Колбек смены значения |
| valueRender | `(value?: Date) => ReactNode` | - | Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение |
| mode | "date" \| "month" \| "date-time" \| "year" | - |  |
| buildCalendarCellProps | `BuildCellPropsFunction` | - | Колбек свойств для управления ячейками календаря |
| showSeconds | `boolean` | - |  |
## ChipChoice.DateRange
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| label | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания лейбла Вариант обрезания значения |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | - | Размер |
| onClick | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | - | Колбек обработки клика |
| disableFuzzySearch | `boolean` | false | Отключает Fuzzy Search. Иногда в дроплисте могут быть различные айдишники - нам важно искать их без Fuzzy Search |
| onClearButtonClick | `MouseEventHandler<HTMLButtonElement>` | - | Колбек для клика по кнопке очистки |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | - | Расположение выпадающего меню |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | gte | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| dropDownClassName | `string` | - |  |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| value | `Range` | - | Значение компонента |
| defaultValue | `Range` | - | Значение компонента по умолчанию |
| onChange | `(value: Range) => void` | - | Колбек смены значения |
| valueRender | `(value?: Range) => ReactNode` | - | Колбек формирующий строковое представление выбранного значения. Принимает массив выбранных значений |
| buildCalendarCellProps | `BuildCellPropsFunction` | - | Колбек свойств для управления ячейками календаря |
## ChipChoice.Time
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| label | `string` | - | Лейбл |
| disabled | `boolean` | - | Деактивирован ли компонент |
| loading | `boolean` | - | Состояние загрузки |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Иконка |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - | HTML tab index |
| truncateVariant | "end" \| "middle" | - | Вариант обрезания лейбла Вариант обрезания значения |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | - | Размер |
| onClick | `MouseEventHandler<HTMLButtonElement \| HTMLDivElement>` | - | Колбек обработки клика |
| disableFuzzySearch | `boolean` | false | Отключает Fuzzy Search. Иногда в дроплисте могут быть различные айдишники - нам важно искать их без Fuzzy Search |
| onClearButtonClick | `MouseEventHandler<HTMLButtonElement>` | - | Колбек для клика по кнопке очистки |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | - | Расположение выпадающего меню |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| dropDownClassName | `string` | - |  |
| value | `TimeValue` | - | Выбранное значение. |
| defaultValue | `TimeValue` | - | Значение по-умолчанию для uncontrolled. |
| showSeconds | `boolean` | - | Показывать ли секунды |
| onChange | `(value: TimeValue) => void` | - | Колбек смены значения |
| valueRender | `(value?: TimeValue) => ReactNode` | - | Колбек формирующий строковое представление выбранного значения. Принимает выбранное значение |
## isAccordionOption
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isBaseOption
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isGroupOption
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isGroupSelectOption
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isNextListOption
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## ChipChoiceRow
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| filters* | `ChipChoiceRowFilter[]` | - | Массив чипов |
| value | `FiltersState` | - | Состояние фильтров |
| defaultValue | `Partial<TState>` | - | Начальное состояние фильтров |
| onChange | `(filters: TState) => void` | - | Колбек изменения состояния фильтров |
| size | enum ChipChoiceRowSize: `"xs"`, `"s"`, `"m"` | s | Размер |
| className | `string` | - | CSS-класс |
| showClearButton | `boolean` | true | Скрыть/показать кнопку очиски фильтров |
| showAddButton | `boolean` | true | Скрыть/показать кнопку добавления фильров |
| visibleFilters | `string[]` | - | Состояние для видимых фильтров |
| onVisibleFiltersChange | `(value: string[]) => void` | - | Коллбек на изменение видимых фильтров |
## hasFilterBeenApplied
`hasFilterBeenApplied` 

функция проверки заполненности фильтра


[//]: DOCUMENTATION_SECTION_END
