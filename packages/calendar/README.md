# Calendar

## Installation
`npm i @snack-ui/calendar`

[Changelog](./CHANGELOG.md)

## Example

```tsx
import { Calendar } from '@snack-ui/calendar';

<Calendar
  mode={Calendar.modes.Date}
  onChangeValue={(selectedDate: Date) => {
    // do something
  }}
/>

<Calendar
  mode={Calendar.modes.Range}
  onChangeValue={(selectedRabge: [Date, Date]) => {
    // do something
  }}
/>
```

## Props

### Общие props:

####  **`mode?: CalendarMode`**
Режим работы календаря. Доступно два режима:
- `Calendar.modes.Date` - режим выбора даты
- `Calendar.modes.Range` - режим выбора периода

####  **`buildCellProps?: (date: Date, viewMode: 'decade' | 'month' | 'year'): {isDisabled?: boolean; isHoliday?: boolean;}`**
Функция дает возможность задизейблить выбор дня/месяца/года, а также раскрасить выходные дни/праздники

####  **`showHolidays?: boolean`**
Раскрашивает субботу и воскресенье

####  **`className?: string`**
CSS-класс на контейнер.

####  **`style?: React.CSSProperties`**
Объект со стилями на контейнер.

#### **`size?: Size`** - *`[Size.M]`*
Размер типографики элементов календаря. Возможные значения:
 - `Calendar.sizes.M`
 - `Calendar.sizes.S`

По-умолчанию компонент имеет предзаданный размер контейнера, но вы можете переопределить его props-ом `className`, `style` или `fitToContainer`.

#### **`fitToContainer?: boolean`** - *`[true]`*
Отключает предустановленный размер, заставляя компонент подстраиваться к размеру контейнра: (width: 100%, height: 100%).

#### **`today?: Date | number`** - *`[new Date()]`*
Дата текущего дня, выделяемая в компоненте подчеркиванием. По-умолчанию - текущая дата.

#### **`locale?: Intl.Locale`** - *по-умолчанию локаль на основе текущего языка в navigator.language*
Локаль для формирования названий месяцев и дней недели.

#### **`onFocusLeave?: (direction: 'prev'|'next'): void`**
Колбэк потери фокуса. Вызывается со значением `next`, когда фокус покидает компонент, передвигаясь вперед, по клавище `tab`.
Со значением `prev` - по клавише стрелки вверх или `shift + tab`.

---

### Режим выбора даты: `mode = Calendar.modes.Date`

#### **`value?: Date`**
Выбранное значение.

#### **`defaultValue?: Date`**
Выбранное значение по-умолчанию.

#### **`onChangeValue?: (value: Date) => void`**
Обработчик смены значения.

---

### Режим выбора периода: `mode = Calendar.modes.Range`

#### **`value?: [Date, Date]`**
Выбранный период.

#### **`defaultValue?: [Date, Date]`**
Выбранный период по-умолчанию.

#### **`onChangeValue?: (range: [Date, Date]) => void`**
Обработчик смены периода.
