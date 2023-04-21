# Popover

## Installation
`npm i @snack-ui/popover`

[Changelog](./CHANGELOG.md)

Компонент Popover использует под собой компонент PopoverPrivate (readme ниже);

## Props

#### **`tip?: ReactNode`**
  содержимое поповера

#### **`open?: boolean`** - *`[undefined]`*
  управляет состоянием показан/не показан.

#### **`onOpenChange?: (isOpen: boolean) => void`** - *`[undefined]`*
  колбек отображения компонента. Срабатывает при изменении состояния open.

#### **`placement?: Placement`** - *`[Top]`*
  положение поповера относительно своего таргета (children).
  Возможные значения: `Left, LeftStart, LeftEnd, Right, RightStart, RightEnd, Top, TopStart, TopEnd, Bottom, BottomStart, BottomEnd`

#### **`trigger?: Trigger`** - *`[Click]`*
  триггер открытия/закрытия поповера.
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
