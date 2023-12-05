# Droplist

## Installation
`npm i @snack-uikit/droplist`

[Changelog](./CHANGELOG.md)

Пакет экспортирует 4 компонента:
- `Dropdown` - компонент выпадающего контейнера общего назначения
- `Droplist` - компонент выпадащего вложенного меню
- `ItemSingle` - айтем списка меню с единичным выбором
- `ItemMultiple` - айтем списка меню с множественным выбором


Чтобы указать оффсет через стили надо в triggerClassName передать css-переменную `--offset`

Например:

```scss
.triggerClassName {
  --offset: #{$some-var};
}
```

Важное уточнение, если переменная передается через  scss-var она должна быть обернута в `#{ }`

Если значение явно передано через prop `offset`, то будет применено значение пропа.


### Управление с клавиатуры

Для настройки управления/переключения между айметами и триггером с клавиатуры можно воспользоваться хуком `Droplist.useKeyboardNavigation<T>({setDroplistOpen})`

Пример использования: 

```typescript
  const MyComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {
      firstElementRefCallback,
      handleDroplistFocusLeave,
      handleTriggerKeyDown,
      handleDroplistItemKeyDown,
      triggerElementRef,
    } = Droplist.useKeyboardNavigation<HTMLButtonElement>({ setDroplistOpen: setIsOpen });

    const options =  Array.from({ length: 10 }).map((_, i) => ({
        option: `Option ${i + 1}`,
        onKeyDown: handleDroplistItemKeyDown, 
        onClick: () => {}
      }));


    return (
      <Droplist
        open={isOpen}
        onOpenChange={setIsOpen}
        firstElementRefCallback={firstElementRefCallback}
        onFocusLeave={handleDroplistFocusLeave}
        triggerElement={
          <button
            onKeyDown={handleTriggerKeyDown}
            ref={triggerElementRef}
          > 
            Click
          </button>
        }
      >
        {oprions.map(option => 
          <Droplist.ItemSingle {...option} />
        )}
      </Droplist>
    )
  }
```

### Общие пропсы для `ItemSingle` и `ItemMultiple`

#### **`option: string`**
Заголовок айтема

#### **`caption?: string`**
Вторичный заголовок

#### **`description?: string`**
Описание айтема

#### **`tagLabel?: string`**
Текст тэга

#### **`size?: Size`** - **`[Size.S]`**
Размер айтема, возможные значения:
- `sizes.S`
- `sizes.M`
- `sizes.L`

#### **`disabled?: boolean`**
Флаг, задизейблен ли айтем

#### **`icon?: ReactElement`**
Иконка (из пакета icons)

#### **`avatar?: Omit<AvatarProps, 'size'>`**
Пропсы для аватара (`@nack-ui/avatar`), исключая размер.

#### **`className?: string`**
CSS-класс контейнера

#### **`tabIndex?: number`**
Значение аттрибута tabIndex

#### **`checked: boolean`**
Флаг, выбран ли айтем

#### **`hasChecked: boolean`**
Флаг, есть ли в подменю выбранные айтемы. (подсвечивает айтем)

#### **`onChange: (checked: boolean): void`**
Колбэк выбора айтема

### ItemMultiple

#### **`indeterminate?: boolean`**
Флаг неопределенного состояния (полувыбранный чекбокс)

### Dropdown

Компонент `Container` использует под собой компонент PopoverPrivate (readme ниже);

#### **`content: ReactNode`**
содержимое дроплиста

#### **`open?: boolean`** - *`[undefined]`*
управляет состоянием показан/не показан.

#### **`onOpenChange?: (isOpen: boolean) => void`** - *`[undefined]`*
колбек отображения компонента. Срабатывает при изменении состояния open.

#### **`placement?: Placement`** - *`[Top]`*
положение дроплиста относительно своего таргета (children).
Возможные значения: `Left, LeftStart, LeftEnd, Right, RightStart, RightEnd, Top, TopStart, TopEnd, Bottom, BottomStart, BottomEnd`

#### **`trigger?: Trigger`** - *`[Click]`*
триггер открытия/закрытия дроплиста.
- `Click` - открывать по клику
- `Hover` - открывать по ховеру
- `FocusVisible` - открывать по focus-visible
- `Focus` - открывать по фокусу
- `HoverAndFocusVisible` - открывать по ховеру и focus-visible
- `HoverAndFocus` - открывать по ховеру и фокусу
- `ClickAndFocusVisible` - открывать по клику и focus-visible

#### **`hoverDelayOpen?: number`**
задержка отображения при ховере в мс

#### **`hoverDelayClose?: number`**
задержка закрытия при ховере в мс

#### **`widthStrategy?: PopoverWidthStrategy`**
стратегия управления шириной контейнера дроплиста
- `Auto` - соответствует ширине контента,
- `Gte` - Great Then or Equal, равен ширине таргета или больше ее, если контент в дроплисте шире,
- `Eq` - Equal, строго равен ширине таргета.

#### **`className?: string`**
CSS-класс на контейнере дроплиста.

#### **`triggerClassName?: string`**
CSS-класс на обёртке триггера поповера.

#### **`offset?: number`**
Отступ дроплиста от его target-элемента (в пикселях).

#### **`closeOnEscapeKey?: boolean`** - *`[true]`*
Закрывается ли поповер по нажатию клавиши Escape

#### **`triggerClickByKeys?: boolean`** - *`[true]`*
Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `Click`)

### Droplist
Повторяет пропсы компонента `dropdown` за исключением

#### **`triggerElement: ReactNode`**
триггер-элемент, относительно которого открывается `Droplist`

#### **`children: ReactNode`**
содержимое дроплиста


[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## Droplist
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| triggerElement* | `ReactNode \| ChildrenFunction` | - |  |
| className | `string` | - | CSS-класс |
| triggerClassName | `string` | - | CSS-класс триггера |
| open | `boolean` | - | Управляет состоянием показан/не показан. |
| onOpenChange | `(isOpen: boolean) => void` | - | Колбек отображения компонента. Срабатывает при изменении состояния open. |
| hoverDelayOpen | `number` | - | Задержка открытия по ховеру |
| hoverDelayClose | `number` | - | Задержка закрытия по ховеру |
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"GreatThanOrEqual"`, `"Equal"` | PopoverWidthStrategy.Auto | Стратегия управления шириной контейнера поповера <br> - `Auto` - соответствует ширине контента, <br> - `Gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `Eq` - Equal, строго равен ширине таргета. |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `Click`) |
| triggerRef | `ForwardedRef<HTMLElement \| ReferenceType>` | - | Ref ссылка на триггер |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | - | Условие отображения поповера: <br> - `Click` - открывать по клику <br> - `Hover` - открывать по ховеру <br> - `FocusVisible` - открывать по focus-visible <br> - `Focus` - открывать по фокусу <br> - `HoverAndFocusVisible` - открывать по ховеру и focus-visible <br> - `HoverAndFocus` - открывать по ховеру и фокусу <br> - `ClickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | Placement.Top | Положение поповера относительно своего триггера (children). |
| firstElementRefCallback | `(instance: HTMLElement) => void` | - |  |
| onFocusLeave | `(direction: "common" \| "top" \| "bottom" \| "left") => void` | - |  |
| size | enum Size: `"s"`, `"m"`, `"l"` | - |  |
| scrollRef | `RefObject<HTMLElement>` | - |  |
| useScroll | `boolean` | - |  |
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
| widthStrategy | enum PopoverWidthStrategy: `"auto"`, `"GreatThanOrEqual"`, `"Equal"` | PopoverPrivate.widthStrategies.Gte | Стратегия управления шириной контейнера поповера <br> - `Auto` - соответствует ширине контента, <br> - `Gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире, <br> - `Eq` - Equal, строго равен ширине таргета. |
| offset | `number` | 0 | Отступ поповера от его триггер-элемента (в пикселях). |
| closeOnEscapeKey | `boolean` | true | Закрывать ли по нажатию на кнопку `Esc` |
| triggerClickByKeys | `boolean` | true | Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `Click`) |
| triggerRef | `ForwardedRef<HTMLElement \| ReferenceType>` | - | Ref ссылка на триггер |
| trigger | enum Trigger: `"click"`, `"hover"`, `"focusVisible"`, `"focus"`, `"hoverAndFocusVisible"`, `"hoverAndFocus"`, `"clickAndFocusVisible"` | PopoverPrivate.triggers.Click | Условие отображения поповера: <br> - `Click` - открывать по клику <br> - `Hover` - открывать по ховеру <br> - `FocusVisible` - открывать по focus-visible <br> - `Focus` - открывать по фокусу <br> - `HoverAndFocusVisible` - открывать по ховеру и focus-visible <br> - `HoverAndFocus` - открывать по ховеру и фокусу <br> - `ClickAndFocusVisible` - открывать по клику и focus-visible |
| placement | enum Placement: `"left"`, `"left-start"`, `"left-end"`, `"right"`, `"right-start"`, `"right-end"`, `"top"`, `"top-start"`, `"top-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"` | PopoverPrivate.placements.BottomStart | Положение поповера относительно своего триггера (children). |


[//]: DOCUMENTATION_SECTION_END