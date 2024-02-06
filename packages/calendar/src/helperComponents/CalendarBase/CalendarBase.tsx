import cn from 'classnames';
import { CSSProperties, RefCallback, useCallback, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { useLocale } from '@snack-uikit/locale';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { AUTOFOCUS, SIZE, VIEW_MODE } from '../../constants';
import { BuildCellPropsFunction, CalendarMode, FocusDirection, Range, Size, ViewMode } from '../../types';
import { getEndOfTheDay, getLocale, getTestIdBuilder, sortDates } from '../../utils';
import { CalendarBody } from '../CalendarBody';
import { CalendarContext } from '../CalendarContext';
import { CalendarNavigation } from '../CalendarNavigation';
import { ColumnLabels } from '../ColumnLabels';
import { useViewDate } from './hooks';
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
  style?: CSSProperties;
  className?: string;
  defaultValue?: Range;
  fitToContainer?: boolean;
  autofocus?: boolean;
  locale?: Intl.Locale;
  navigationStartRef?: RefCallback<HTMLButtonElement>;
}>;

const CONTAINER_SIZE_MAP = {
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
  style,
  locale: localeProp,
  onFocusLeave,
  buildCellProps,
  'data-test-id': testId,
  navigationStartRef,
  ...rest
}: CalendarBaseProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODE.Month);
  const [viewShift, setViewShift] = useState<number>(0);
  const [value, setValueState] = useUncontrolledProp<Range | undefined>(valueProp, defaultValue, onChangeValue);
  const today = typeof todayProp === 'number' ? new Date(todayProp) : todayProp;
  const [referenceDate] = useState(value?.[0] || today);
  const [preselectedRange, setPreselectedRange] = useState<Range | undefined>();
  const viewDate = useViewDate(referenceDate, viewMode, viewShift);
  const [focus, setFocus] = useState<string | undefined>(autofocus ? AUTOFOCUS : undefined);

  const setValue = useCallback(
    (dates: Range) => {
      const [first, last] = sortDates(dates);
      setValueState([first, getEndOfTheDay(last)]);
    },
    [setValueState],
  );

  const startPreselect = useCallback((date: Date) => {
    setPreselectedRange([date, date]);
  }, []);

  const continuePreselect = useCallback((date: Date) => {
    setPreselectedRange(prevState => prevState && [prevState[0], date]);
  }, []);

  const restartPreselect = useCallback(() => {
    setPreselectedRange(prevState => prevState && [prevState[0], prevState[0]]);
  }, []);

  const completePreselect = useCallback(
    (date: Date) => {
      if (preselectedRange) {
        setPreselectedRange(undefined);
        setValue([preselectedRange[0], date]);
      }
    },
    [preselectedRange, setValue],
  );

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const [, ctxLocale] = useLocale();

  const locale = useMemo(() => getLocale({ localeProp, ctxLocale }), [ctxLocale, localeProp]);

  const firstNotDisableCell = useRef<[number, number]>([0, 0]);

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.calendar, className, CONTAINER_SIZE_MAP[size])}
      style={style}
      data-size={size}
      data-fit-to-container={fitToContainer || undefined}
      data-test-id={testId}
    >
      <CalendarContext.Provider
        value={{
          locale,
          size,
          value,
          firstNotDisableCell,
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
        }}
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
      </CalendarContext.Provider>
    </div>
  );
}
