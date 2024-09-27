import cn from 'classnames';
import { CSSProperties, RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { ListProps } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { AUTOFOCUS, CALENDAR_MODE, SIZE, VIEW_MODE } from '../../constants';
import { BuildCellPropsFunction, CalendarMode, FocusDirection, Range, Size, ViewMode } from '../../types';
import { getEndOfTheDay, getLocale, getTestIdBuilder, sortDates } from '../../utils';
import { CalendarBody } from '../CalendarBody';
import { CalendarContext } from '../CalendarContext';
import { CalendarNavigation } from '../CalendarNavigation';
import { ColumnLabels } from '../ColumnLabels';
import { Footer } from '../Footer';
import { TimePickerBase } from '../TimePickerBase';
import { useDateAndTime, useRange, useViewDate } from './hooks';
import styles from './styles.module.scss';

export type CalendarBaseProps = WithSupportProps<{
  mode: CalendarMode;
  onChangeValue(value: Range): void;
  onFocusLeave?(direction: FocusDirection): void;
  size?: Size;
  value?: Range;
  today?: Date | number;
  buildCellProps?: BuildCellPropsFunction;
  showHolidays?: boolean;
  showSeconds?: boolean;
  style?: CSSProperties;
  className?: string;
  defaultValue?: Range;
  fitToContainer?: boolean;
  autofocus?: boolean;
  locale?: Intl.Locale;
  navigationStartRef?: RefObject<HTMLButtonElement>;
}>;

const DATE_WRAPPER_SIZE_MAP = {
  [SIZE.S]: styles.dateWrapperSizeS,
  [SIZE.M]: styles.dateWrapperSizeM,
  [SIZE.L]: styles.dateWrapperSizeL,
};

const CALENDAR_SIZE_MAP = {
  [SIZE.S]: styles.calendarSizeS,
  [SIZE.M]: styles.calendarSizeM,
  [SIZE.L]: styles.calendarSizeL,
};

export function CalendarBase({
  className,
  mode,
  size = SIZE.M,
  autofocus,
  fitToContainer = true,
  value: valueProp,
  defaultValue,
  onChangeValue,
  today: todayProp = new Date(),
  showHolidays = false,
  showSeconds = true,
  style,
  locale: localeProp,
  onFocusLeave,
  buildCellProps,
  'data-test-id': testId,
  navigationStartRef,
  ...rest
}: CalendarBaseProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(mode === CALENDAR_MODE.Month ? VIEW_MODE.Year : VIEW_MODE.Month);
  const [viewShift, setViewShift] = useState<number>(0);
  const [value, setValueState] = useUncontrolledProp<Range | undefined>(valueProp, defaultValue, onChangeValue);
  const today = typeof todayProp === 'number' ? new Date(todayProp) : todayProp;
  const [referenceDate] = useState(value?.[0] || today);
  const viewDate = useViewDate(referenceDate, viewMode, viewShift);
  const [focus, setFocus] = useState<string | undefined>(autofocus ? AUTOFOCUS : undefined);

  const {
    dateAndTime,
    onTimeChange,
    onDateChange,
    onDateAndTimeChange,
    isDateFilled,
    isTimeFilled,
    isDateAndTimeFilled,
  } = useDateAndTime({ initialDate: mode === 'date-time' ? value?.[0] : undefined });

  const applyButtonRef = useRef<HTMLButtonElement>(null);
  const currentButtonRef = useRef<HTMLButtonElement>(null);
  const hoursKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const minutesKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const secondsKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });

  const setValue = useCallback(
    (dates: Range) => {
      const [first, last] = sortDates(dates);
      setValueState([first, getEndOfTheDay(last)]);
    },
    [setValueState],
  );

  const { preselectedRange, continuePreselect, completePreselect, restartPreselect, startPreselect } = useRange({
    setValue,
  });

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const { lang: ctxLang } = useLocale();

  const locale = useMemo(() => getLocale({ localeProp, ctxLang }), [ctxLang, localeProp]);

  const firstNotDisableCell = useRef<[number, number]>([0, 0]);

  return (
    <div className={cn(styles.calendarWrapper, className)} data-fit-to-container={fitToContainer || undefined}>
      <CalendarContext.Provider
        value={{
          locale,
          size,
          value,
          firstNotDisableCell,
          fitToContainer,
          today,
          showHolidays,
          viewDate,
          referenceDate,
          preselectedRange,
          mode,
          viewMode,
          viewShift,
          focus,
          setValue,
          setViewMode,
          setViewShift,
          startPreselect,
          continuePreselect,
          completePreselect,
          restartPreselect,
          setFocus,
          getTestId,
          onFocusLeave,
          buildCellProps,
          navigationStartRef,
          showSeconds,
          dateAndTime,
          onTimeChange,
          onDateChange,
          onDateAndTimeChange,
          isDateAndTimeFilled,
          isDateFilled,
          isTimeFilled,
          applyButtonRef,
          currentButtonRef,
          hoursKeyboardNavigationRef,
          minutesKeyboardNavigationRef,
          secondsKeyboardNavigationRef,
        }}
      >
        <div
          className={cn(styles.dateWrapper, DATE_WRAPPER_SIZE_MAP[size])}
          data-size={size}
          data-show-footer={(mode === 'date-time' && viewMode === 'month') || undefined}
        >
          <div
            {...extractSupportProps(rest)}
            className={cn(styles.calendar, CALENDAR_SIZE_MAP[size])}
            style={style}
            data-size={size}
            data-fit-to-container={fitToContainer || undefined}
            data-test-id={testId}
          >
            <div className={styles.header} data-size={size}>
              <CalendarNavigation />
              <ColumnLabels />
            </div>
            <div className={styles.body}>
              <div className={styles.rows} data-size={size}>
                <CalendarBody />
              </div>
            </div>
          </div>

          <TimePickerBase />
        </div>

        <Footer />
      </CalendarContext.Provider>
    </div>
  );
}
