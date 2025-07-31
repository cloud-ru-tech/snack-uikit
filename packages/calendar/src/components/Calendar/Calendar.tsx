import { CSSProperties, RefObject, useCallback } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import { CALENDAR_MODE } from '../../constants';
import { CalendarBase } from '../../helperComponents/CalendarBase';
import { BuildCellPropsFunction, FocusDirection, Range, Size } from '../../types';
import { getNormalizedValue } from './utils';

type CommonCalendarProps = {
  /**
   * Размер
   * @default m
   */
  size?: Size;
  /** Дата сегодняшнего дня */
  today?: Date | number;
  /** Раскрашивает субботу и воскресенье */
  showHolidays?: boolean;
  /**
   * Колбек установки свойств ячеек календаря. Вызывается на построение каждой ячейки. Принимает два параметра:
   * <br> `Date` - дата ячейки
   * <br> `ViewMode`:
   * <br>  - `month` отображение месяца, каждая ячейка - 1 день
   * <br>  - `year` отображение года, каждая ячейка - 1 месяц
   * <br>  - `decade` отображение декады, каждая ячейка - 1 год
   * <br><br> Колбек должен возвращать объект с полями, отвечающими за отключение и подкраску ячейки.
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
  /** Ссылка на управление первым элементом навигации */
  navigationStartRef?: RefObject<{ focus(): void }>;
};

type DateCalendarProps = CommonCalendarProps & {
  /** Режим работы календаря: <br> - `date` - режим выбора даты */
  mode: typeof CALENDAR_MODE.Date;
  /** Выбранное значение.<br> - в режиме date тип `Date` */
  value?: Date;
  /** Значение по-умолчанию для uncontrolled.<br> - в режиме date тип `Date` */
  defaultValue?: Date;
  /** Колбек выбора значения.<br> - в режиме date принимает тип `Date` */
  onChangeValue?(value: Date): void;
};

type MonthCalendarProps = CommonCalendarProps & {
  /** <br> - `month` - режим выбора месяца */
  mode: typeof CALENDAR_MODE.Month;
  /** <br> - в режиме month тип `Date` */
  value?: Date;
  /** <br> - в режиме month тип `Date` */
  defaultValue?: Date;
  /** <br> - в режиме month принимает тип `Date` */
  onChangeValue?(value: Date): void;
};

type YearCalendarProps = CommonCalendarProps & {
  /** <br> - `year` - режим выбора года */
  mode: typeof CALENDAR_MODE.Year;
  /** <br> - в режиме year тип `Date` */
  value?: Date;
  /** <br> - в режиме year тип `Date` */
  defaultValue?: Date;
  /** <br> - в режиме year принимает тип `Date` */
  onChangeValue?(value: Date): void;
};

type DateTimeCalendarProps = CommonCalendarProps & {
  /** <br> - `date-time` - режим выбора даты и времени */
  mode: typeof CALENDAR_MODE.DateTime;
  /** <br> - в режиме date-time тип `Date` */
  value?: Date;
  /** <br> - в режиме date-time тип `Date` */
  defaultValue?: Date;
  /** <br> - в режиме date-time принимает тип `Date` */
  onChangeValue?(value: Date): void;
  /** Показывать ли секунды (только в режиме date-time) */
  showSeconds?: boolean;
};

type RangeCalendarProps = CommonCalendarProps & {
  /** <br> - `range` - режим выбора периода */
  mode: typeof CALENDAR_MODE.Range;
  /** <br> - в режиме range тип `Range` (`[Date, Date]`) */
  value?: Range;
  /** <br> - в режиме range тип `Range` (`[Date, Date]`) */
  defaultValue?: Range;
  /** <br> - в режиме range принимает тип `Range` */
  onChangeValue?(value: Range): void;
};

export type CalendarProps = WithSupportProps<
  DateCalendarProps | RangeCalendarProps | MonthCalendarProps | DateTimeCalendarProps | YearCalendarProps
>;

export function Calendar(props: CalendarProps) {
  const { className, onChangeValue, buildCellProps, mode, ...rest } = props;

  const changeValueHandler = useCallback(
    (value: Range) => {
      if (
        mode === CALENDAR_MODE.Date ||
        mode === CALENDAR_MODE.Month ||
        mode === CALENDAR_MODE.Year ||
        mode === CALENDAR_MODE.DateTime
      ) {
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
      value={getNormalizedValue(props.value)}
      defaultValue={getNormalizedValue(props.defaultValue)}
      onChangeValue={changeValueHandler}
      buildCellProps={buildCellProps}
    />
  );
}
