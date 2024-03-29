# List

## Installation

`npm i @snack-uikit/list`

[Changelog](./CHANGELOG.md)

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## useFuzzySearch
Нечеткий поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label'
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## extractChildIds
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `ItemProps[]` | - |  |
## flattenItems
`flattenItems` 

Функция разворачивает массив айтемов в плоский список
## isAccordionItemProps
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isBaseItemProps
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isGroupItemProps
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isNextListItemProps
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## useGroupItemSelection
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `ItemProps[]` | - |  |
| id | `string \| number` | - |  |
| disabled | `boolean` | - |  |
## isSelectionSingleProps
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isSelectionMultipleProps
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## Droplist
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `ItemProps[]` | - | Основные элементы списка |
| children* | `ReactNode \| ({onKeyDown}) => ReactNode * Рендер функция принимает аргументы `onKeyDown` - хендлер ввода, для поддержки управления с клавиатуры` | - | Триггер для дроплиста |
| triggerElemRef | `RefObject<HTMLElement>` | - | Ссылка на элемент-триггер для дроплиста |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | auto | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | - | Условие отображения поповера: <br> - `click` - открывать по клику <br> - `hover` - открывать по ховеру <br> - `focusVisible` - открывать по focus-visible <br> - `focus` - открывать по фокусу <br> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br> - `hoverAndFocus` - открывать по ховеру и фокусу <br> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Положение поповера относительно своего триггера (children). |
| className | `string` | - | CSS-класс |
| size | "s" \| "m" \| "l" | - | Размер списка |
| pinTop | `ItemProps[]` | - | Элементы списка, закрепленные сверху |
| pinBottom | `ItemProps[]` | - | Элементы списка, закрепленные снизу |
| footer | `ReactNode ;` | - | Кастомизируемый элемент в конце списка |
| footerActiveElementsRefs | `RefObject<HTMLElement>[]` | - | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| search | `SearchState` | - | Настройки поисковой строки |
| collapse | `CollapseState` | {} | Настройки раскрытия элементов |
| loading | `boolean` | - | Флаг, отвещающий за состояние загрузки списка |
| selection | `SelectionSingleState \| SelectionMultipleState` | - |  |
| marker | `boolean` | - | Отображать ли маркер у выбранного жлемента списка |
| scroll | `boolean` | - | Включить ли скролл для основной части списка |
| scrollRef | `RefObject<HTMLElement>` | - | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| scrollContainerRef | `RefObject<HTMLElement>` | - | Ссылка на контейнер, который скроллится |
| dataFiltered | `boolean` | - |  |
| dataError | `boolean` | - |  |
| noDataState | `EmptyStateProps` | - | Экран при отстутствии данных |
| noResultsState | `EmptyStateProps` | - | Экран при отстутствии результатов поиска или фильтров |
| errorDataState | `EmptyStateProps` | - | Экран при ошибке запроса |
## List
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `ItemProps[]` | - | Основные элементы списка |
| pinTop | `ItemProps[]` | - | Элементы списка, закрепленные сверху |
| pinBottom | `ItemProps[]` | - | Элементы списка, закрепленные снизу |
| footer | `ReactNode ;` | - | Кастомизируемый элемент в конце списка |
| footerActiveElementsRefs | `RefObject<HTMLElement>[]` | - | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| search | `SearchState` | - | Настройки поисковой строки |
| tabIndex | `number` | - | Tab Index |
| collapse | `CollapseState` | {} | Настройки раскрытия элементов |
| className | `string` | - | CSS-класс |
| onKeyDown | `(e: KeyboardEvent<HTMLElement>) => void` | - |  |
| loading | `boolean` | - | Флаг, отвещающий за состояние загрузки списка |
| selection | `SelectionSingleState \| SelectionMultipleState` | - |  |
| size | "s" \| "m" \| "l" | - | Размер списка |
| marker | `boolean` | - | Отображать ли маркер у выбранного жлемента списка |
| scroll | `boolean` | - | Включить ли скролл для основной части списка |
| scrollRef | `RefObject<HTMLElement>` | - | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| scrollContainerRef | `RefObject<HTMLElement>` | - | Ссылка на контейнер, который скроллится |
| dataFiltered | `boolean` | - |  |
| dataError | `boolean` | - |  |
| noDataState | `EmptyStateProps` | - | Экран при отстутствии данных |
| noResultsState | `EmptyStateProps` | - | Экран при отстутствии результатов поиска или фильтров |
| errorDataState | `EmptyStateProps` | - | Экран при ошибке запроса |
| ref | `Ref<HTMLElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom |
| key | `Key` | - |  |


[//]: DOCUMENTATION_SECTION_END
