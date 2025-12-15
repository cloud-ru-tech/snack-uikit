# List

## Installation

`npm i @snack-uikit/list`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/list` предоставляет компоненты для отображения структурированных списков с поддержкой выбора элементов, поиска, группировки и вложенных структур.
- Компоненты поддерживают различные типы элементов: базовые элементы, группы, аккордеоны и вложенные списки, а также режимы выбора (одиночный, множественный, без выбора).
- Списки поддерживают закрепление элементов сверху и снизу, кастомный футер, поисковую строку, виртуализацию для больших объёмов данных и полноценную навигацию с клавиатуры.
- Компоненты работают в контролируемом и неконтролируемом режимах, поддерживают состояния загрузки и пустых данных, а также настраиваемые экраны для различных сценариев (нет данных, нет результатов поиска, ошибка).

## List

### Description

- `List` — компонент для отображения структурированного списка элементов, встраиваемого непосредственно в контент страницы.
- Поддерживает **режимы выбора** элементов: одиночный (`selection.mode="single"`), множественный (`selection.mode="multiple"`) и без выбора (`selection` не передан).
- Позволяет **закреплять элементы** сверху (`pinTop`) и снизу (`pinBottom`), которые остаются видимыми при прокрутке основного списка.
- Включает **поисковую строку** (`search`) для фильтрации элементов по содержимому.
- Поддерживает **различные типы элементов**: базовые элементы, группы с заголовками, аккордеоны с раскрывающимся контентом и вложенные списки (`next-list`).
- Может отображать **кастомный футер** (`footer`) с дополнительными элементами управления.
- Поддерживает **виртуализацию** (`virtualized`) для оптимизации рендеринга больших списков (от 1000 элементов).
- Обеспечивает **навигацию с клавиатуры** с поддержкой стрелок, Enter, Space и других клавиш для перемещения и выбора элементов.
- Позволяет настраивать **состояния пустых данных** (`noDataState`, `noResultsState`, `errorDataState`) для различных сценариев.
- Figma: [`List`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.0.0?node-id=41%3A7631&mode=design).

### Example

```tsx
import { List } from '@snack-uikit/list';

function Example() {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <List
      items={[
        {
          id: '1',
          content: { option: 'Первый элемент', description: 'Описание первого элемента' },
        },
        {
          id: '2',
          content: { option: 'Второй элемент', description: 'Описание второго элемента' },
        },
      ]}
      selection={{
        mode: 'single',
        value: selected,
        onChange: setSelected,
      }}
      search={{
        value: '',
        onChange: (value) => console.log('Search:', value),
        placeholder: 'Поиск...',
      }}
      pinTop={[
        {
          id: 'pinned-top',
          content: { option: 'Закреплённый элемент сверху' },
        },
      ]}
      footer={<button>Дополнительное действие</button>}
    />
  );
}
```

## Droplist

### Description

- `Droplist` — компонент выпадающего списка, который отображается в поповере при взаимодействии с триггером (кнопкой, ссылкой или другим элементом).
- Объединяет функциональность `List` с возможностями выпадающего меню: появляется по клику, ховеру, фокусу или другим триггерам и автоматически позиционируется относительно элемента-триггера.
- Поддерживает **различные триггеры открытия** (`trigger`): `click`, `hover`, `focus`, `focusVisible` и их комбинации.
- Позволяет настраивать **позиционирование** (`placement`) относительно триггера: сверху, снизу, слева, справа и их вариации.
- Может **автоматически закрываться** после выбора элемента (`closeDroplistOnItemClick`) в режимах без выбора или одиночного выбора.
- Поддерживает **управление шириной** поповера (`widthStrategy`): автоматическая, равная триггеру или больше триггера.
- Включает все возможности `List`: выбор элементов, поиск, группировка, закрепление элементов, виртуализация и навигация с клавиатуры.
- Триггер может быть передан как React-элемент или функция-рендер, которая получает обработчик `onKeyDown` для поддержки навигации с клавиатуры.
- Figma: [`Droplist`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.0.0?node-id=41%3A7631&mode=design).

### Example

```tsx
import { Droplist } from '@snack-uikit/list';
import { ButtonFilled } from '@snack-uikit/button';

function Example() {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <Droplist
      items={[
        {
          id: '1',
          content: { option: 'Первый элемент', description: 'Описание первого элемента' },
        },
        {
          id: '2',
          content: { option: 'Второй элемент', description: 'Описание второго элемента' },
        },
      ]}
      selection={{
        mode: 'single',
        value: selected,
        onChange: setSelected,
      }}
      trigger="click"
      placement="bottom-start"
      closeDroplistOnItemClick
    >
      <ButtonFilled label="Выбрать элемент" />
    </Droplist>
  );
}
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## kindFlattenItems
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `Item[]` | - |  |
| prefix | `ItemId` | - |  |
| parentId | `ItemId` | - |  |
## isAccordionItem
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isBaseItem
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isGroupItem
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isNextListItem
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## isGroupSelectItem
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
## useGroupItemSelection
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| id* | `ItemId` | - |  |
| items* | `ItemId[]` | - |  |
| allChildIds* | `ItemId[]` | - |  |
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
| items* | `Item[]` | - | Основные элементы списка |
| children* | `ReactNode \| ({onKeyDown}) => ReactNode * Рендер функция принимает аргументы `onKeyDown` - хендлер ввода, для поддержки управления с клавиатуры` | - | Триггер для дроплиста |
| triggerElemRef | `RefObject<HTMLElement>` | - | Ссылка на элемент-триггер для дроплиста |
| listRef | `RefObject<HTMLElement>` | - | Ссылка на элемент выпадающего списка |
| closeDroplistOnItemClick | `boolean` | - | Закрывать выпадающий список после клика на базовый айтем.  Работает в режимах selection: 'none' \| 'single' |
| virtualized | `boolean` | - | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| triggerClassName | `string` | - | CSS-класс триггера |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"gte"`, `"eq"` | auto | Стратегия управления шириной контейнера поповера <br> - `auto` - соответствует ширине контента, <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `eq` - Equal, строго равен ширине таргета. |
| closeOnPopstate | `boolean` | - | Закрывать ли поповер при пекреходе по истории браузера |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | - | Условие отображения поповера: <br> - `click` - открывать по клику <br> - `hover` - открывать по ховеру <br> - `focusVisible` - открывать по focus-visible <br> - `focus` - открывать по фокусу <br> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible <br> - `hoverAndFocus` - открывать по ховеру и фокусу <br> - `clickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | top | Положение поповера относительно своего триггера (children). |
| className | `string` | - | CSS-класс |
| pinTop | `Item[]` | - | Элементы списка, закрепленные сверху |
| pinBottom | `Item[]` | - | Элементы списка, закрепленные снизу |
| footer | `ReactNode ;` | - | Кастомизируемый элемент в конце списка |
| footerActiveElementsRefs | `RefObject<HTMLElement>[]` | - | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| search | `SearchState` | - | Настройки поисковой строки |
| collapse | `CollapseState` | {} | Настройки раскрытия элементов |
| loading | `boolean` | - | Флаг, отвещающий за состояние загрузки списка |
| scrollToSelectedItem | `boolean` | - | Флаг, отвещающий за прокручивание до выбранного элемента |
| scrollContainerClassName | `string` | - | CSS-класс для scroll обертки основного списка айтемов |
| selection | `SelectionSingleState \| SelectionMultipleState` | - |  |
| size | "s" \| "m" \| "l" | s | Размер списка |
| marker | `boolean` | true | Отображать ли маркер у выбранного жлемента списка |
| contentRender | `(props: ContentRenderProps) => ReactNode` | - | Рендер функция основного контента айтема |
| scroll | `boolean` | - | Включить ли скролл для основной части списка |
| scrollRef | `RefObject<HTMLElement>` | - | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| scrollContainerRef | `RefObject<HTMLElement>` | - | Ссылка на контейнер, который скроллится |
| untouchableScrollbars | `boolean` | - | Отключает возможность взаимодействовать со скролбарами мышью. |
| barHideStrategy | enum BarHideStrategy: `"scroll"`, `"move"`, `"never"`, `"leave"` | - | Управление скрытием скролл баров: <br> - `Never` - показывать всегда <br> - `Leave` - скрывать когда курсор покидает компонент <br> - `Scroll` - показывать только когда происходит скроллинг <br> - `Move` - показывать при движении курсора над компонентом |
| onScroll | `(event?: Event) => void` | - | Колбек на скролл прокручиваемого списка |
| dataFiltered | `boolean` | - |  |
| dataError | `boolean` | - |  |
| noDataState | `EmptyStateProps` | - | Экран при отстутствии данных |
| noResultsState | `EmptyStateProps` | - | Экран при отстутствии результатов поиска или фильтров |
| errorDataState | `EmptyStateProps` | - | Экран при ошибке запроса |
## List
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| items* | `Item[]` | - | Основные элементы списка |
| pinTop | `Item[]` | - | Элементы списка, закрепленные сверху |
| pinBottom | `Item[]` | - | Элементы списка, закрепленные снизу |
| footer | `ReactNode ;` | - | Кастомизируемый элемент в конце списка |
| footerActiveElementsRefs | `RefObject<HTMLElement>[]` | - | Список ссылок на кастомные элементы, помещенные в специальную секцию внизу списка |
| keyboardNavigationRef | `RefObject<{ focusItem(id: ItemId): void; }>` | - | Ссылка на управление навигацией листа с клавиатуры |
| search | `SearchState` | - | Настройки поисковой строки |
| tabIndex | `number` | - | Tab Index |
| collapse | `CollapseState` | {} | Настройки раскрытия элементов |
| className | `string` | - | CSS-класс |
| loading | `boolean` | - | Флаг, отвещающий за состояние загрузки списка |
| onKeyDown | `(e: KeyboardEvent<HTMLElement>) => void` | - | Обработчик события по нажатию клавиш |
| hasListInFocusChain | `boolean` | true | Флаг, отвещающий за включение самого родительского контейнера листа в цепочку фокусирующихся элементов |
| scrollToSelectedItem | `boolean` | - | Флаг, отвещающий за прокручивание до выбранного элемента |
| scrollContainerClassName | `string` | - | CSS-класс для scroll обертки основного списка айтемов |
| virtualized | `boolean` | - | Включить виртуализацию на компоненты списка. Рекомендуется если у вас от 1к элементов списка |
| selection | `SelectionSingleState \| SelectionMultipleState` | - |  |
| size | "s" \| "m" \| "l" | s | Размер списка |
| marker | `boolean` | true | Отображать ли маркер у выбранного жлемента списка |
| contentRender | `(props: ContentRenderProps) => ReactNode` | - | Рендер функция основного контента айтема |
| scroll | `boolean` | - | Включить ли скролл для основной части списка |
| scrollRef | `RefObject<HTMLElement>` | - | Ссылка на элемент, обозначающий самый конец прокручиваемого списка |
| scrollContainerRef | `RefObject<HTMLElement>` | - | Ссылка на контейнер, который скроллится |
| untouchableScrollbars | `boolean` | - | Отключает возможность взаимодействовать со скролбарами мышью. |
| barHideStrategy | enum BarHideStrategy: `"scroll"`, `"move"`, `"never"`, `"leave"` | - | Управление скрытием скролл баров: <br> - `Never` - показывать всегда <br> - `Leave` - скрывать когда курсор покидает компонент <br> - `Scroll` - показывать только когда происходит скроллинг <br> - `Move` - показывать при движении курсора над компонентом |
| onScroll | `(event?: Event) => void` | - | Колбек на скролл прокручиваемого списка |
| dataFiltered | `boolean` | - |  |
| dataError | `boolean` | - |  |
| noDataState | `EmptyStateProps` | - | Экран при отстутствии данных |
| noResultsState | `EmptyStateProps` | - | Экран при отстутствии результатов поиска или фильтров |
| errorDataState | `EmptyStateProps` | - | Экран при ошибке запроса |
| ref | `LegacyRef<HTMLElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## ItemContent
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| option* | `string \| number` | - |  |
| caption | `string` | - |  |
| description | `string` | - |  |
| truncate | `TruncateProps` | - |  |
| disabled | `boolean` | - |  |
| className | `string` | - | CSS-класс |
## getFooterItemId
`helper` 

Возвращает id для элемента футера
## getItemAutoId
`helper` 

Возвращает id для элемента, подставляя перфикс
## getDefaultItemId
`helper` 

Возвращает id для дефолтного элемента


[//]: DOCUMENTATION_SECTION_END
