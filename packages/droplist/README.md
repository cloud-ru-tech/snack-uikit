# Droplist

## Installation
`npm i @snack-ui/droplist`

[Changelog](./CHANGELOG.md)

Пакет экспортирует 3 компонента:
- `Container` - компонент выпадающего контейнера
- `ItemSingle` - айтем списка меню с единичным выбором
- `ItemMultiple` - айтем списка меню с множественным выбором

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

#### **`onChange: (checked: boolean): void`**
Колбэк выбора айтема

### Container

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
