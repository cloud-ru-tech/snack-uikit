# Scroll

## Installation
`npm i @snack-ui/scroll`

[Changelog](./CHANGELOG.md)

## Props

#### **`className?: string`**
css-класс контейнера.

#### **`size?: Size`** - *`[Size.M]`*
Размер скролбаров: `s` или `m`.

#### **`clickScrolling?: boolean`** - *`[true]`*
Скролить ли по клику в скроллбар.

#### **`autoscrollTo?: AutoscrollTo`** - *`[undefined]`*
Включает автоскрол при маунте и изменении размера контента:
- `bottom` - автоскрол вниз,
- `right` - автоскрол вправо.

#### **`resize?: Resize`** - *`[Resize.None]`*
Настройка возможности ресайзить Scroll контейнер:
- `None` - нельзя ресайзить
- `Horizontal` - можно ресайзить только по горизонтали
- `Vertical` - можно ресайзить только по вертикали
- `Both` - можно ресайзить в обеих координатах

#### **`barHideStrategy?: BarHideStrategy`** - *`[BarHideStrategy.Leave]`*
Управление скрытием скролл баров:
- `Never` - показывать всегда
- `Leave` - скрывать когда курсор покидает компонент
- `Scroll` - показывать только когда происходит скроллинг
- `Move` - показывать при движении курсора над компонентом

#### **`onScroll?: (e: Event) => void`** - *`[undefined]`*
Обработчик события скрола.

#### **`untouchableScrollbars?: boolean`** - *`[false]`*
Отключает возможность взаимодествовать со скролбарами мышью.


