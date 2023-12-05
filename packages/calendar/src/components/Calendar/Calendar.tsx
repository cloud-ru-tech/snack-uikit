import { CSSProperties, RefCallback, useCallback } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import { CalendarMode, Size, ViewMode } from '../../constants';
import { CalendarBase } from '../../helperComponents/CalendarBase';
import { BuildCellPropsFunction, FocusDirection, Range } from '../../types';
import { getNormalizedDefaultValue, getNormalizedValue } from './utils';

type CommonCalendarProps = {
  /**
   * Размер
   * @default Calendar.sizes.M
   */
  size?: Size;
  /** Дата сегодняшнего дня */
  today?: Date | number;
  /** Раскрашивает субботу и воскресенье */
  showHolidays?: boolean;
  /**
   * Колбек установки свойств ячейка календаря. Вызывается на построение каждой ячейки. Принимает два параметра:
   * <br> `Date` - дата ячейки
   * <br> `ViewMode`:
   * <br>  - `Calendar.viewMode.Month` отображение месяца, каждая ячейка - 1 день
   * <br>  - `Calendar.viewMode.Year` отображение года, каждая ячейка - 1 месяц
   * <br>  - `Calendar.viewMode.Decade` отображение декады, каждая ячейка - 1 год
   * <br><br> Колбек должен возвращать объект с полями, отвечающими за задизаленность и подкраску ячейки.
   * @type (date: Date, viewMode: ViewMode) => { isDisabled?: boolean; isHoliday?: boolean };
   */
  buildCellProps?: BuildCellPropsFunction;
  /** CSS-класс контейнера */
  className?: string;
  /**
   * Отключает предустановленный размер, заставляя компонент подстраиваться к размеру контейнра: (width: 100%, height: 100%).
   * @default true
   */
  fitToContainer?: boolean;
  /** Объект со стилями на контейнер. */
  style?: CSSProperties;
  /** Автофокус */
  autofocus?: boolean;
  /**
   * Локаль, в соответствие с которой выставляется язык названий и первый день недели
   * @default Проставляется в соответствие с языком в настройках браузера
   * @type Intl.Locale
   */
  locale?: Intl.Locale;
  /** Колбек потери фокуса. Вызывается со значением `next`, когда фокус покидает компонент, передвигаясь вперед, по клавише `tab`. Со значением `prev` - по клавише стрелки вверх или `shift + tab`. */
  onFocusLeave?(direction: FocusDirection): void;
  /** Ref-callback на первый доступный интерактивный элемент  */
  navigationStartRef?: RefCallback<HTMLButtonElement>;
};

type DateCalendarProps = CommonCalendarProps & {
  /** Режим работы календаря: <br> - `Calendar.modes.Date` - режим выбора даты */
  mode: CalendarMode.Date;
  /** Выбранное значение.<br> - в режиме date тип `Date` */
  value?: Date;
  /** Значение по-умолчанию для uncontrolled.<br> - в режиме date тип `Date` */
  defaultValue?: Date;
  /** Колбек выбора значения.<br> - в режиме date принимает тип `Date` */
  onChangeValue?(value: Date): void;
};

type RangeCalendarProps = CommonCalendarProps & {
  /** <br> - `Calendar.modes.Date` - режим выбора периода */
  mode: CalendarMode.Range;
  /** <br> - в режиме range тип `Range` (`[Date, Date]`) */
  value?: Range;
  /** <br> - в режиме range тип `Range` (`[Date, Date]`) */
  defaultValue?: Range;
  /** <br> - в режиме range принимает тип `Range` */
  onChangeValue?(value: Range): void;
};

export type CalendarProps = WithSupportProps<DateCalendarProps | RangeCalendarProps>;

export function Calendar(props: CalendarProps) {
  const { className, onChangeValue, buildCellProps, mode, ...rest } = props;

  const changeValueHandler = useCallback(
    (value: Range) => {
      if (mode === CalendarMode.Date) {
        const [date] = value;
        onChangeValue?.(date);
        return;
      }
      onChangeValue?.(value);
    },
    [onChangeValue, mode],
  );

  return (
    <CalendarBase
      {...rest}
      mode={mode}
      className={className}
      value={getNormalizedValue(props)}
      defaultValue={getNormalizedDefaultValue(props)}
      onChangeValue={changeValueHandler}
      buildCellProps={buildCellProps}
    />
  );
}

Calendar.sizes = Size;
Calendar.modes = CalendarMode;
Calendar.viewMode = ViewMode;
