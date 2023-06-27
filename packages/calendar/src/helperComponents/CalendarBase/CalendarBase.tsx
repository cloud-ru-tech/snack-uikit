import cn from 'classnames';
import { CSSProperties, RefCallback, useCallback, useMemo, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { AUTOFOCUS, CalendarMode, Size, ViewLevel } from '../../constants';
import { FocusDirection, Range } from '../../types';
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
  style?: CSSProperties;
  className?: string;
  defaultValue?: Range;
  fitToContainer?: boolean;
  autofocus?: boolean;
  locale?: Intl.Locale;
  navigationStartRef?: RefCallback<HTMLButtonElement>;
}>;

const CONTAINER_SIZE_MAP = {
  [Size.S]: styles.calendarSizeS,
  [Size.M]: styles.calendarSizeM,
};

export function CalendarBase({
  className,
  mode,
  size = Size.M,
  autofocus,
  fitToContainer = true,
  value: valueProp,
  defaultValue,
  onChangeValue,
  today: todayProp = new Date(),
  style,
  locale: localeProp,
  onFocusLeave,
  'data-test-id': testId,
  navigationStartRef,
  ...rest
}: CalendarBaseProps) {
  const [viewLevel, setViewLevel] = useState(ViewLevel.Month);
  const [viewShift, setViewShift] = useState<number>(0);
  const [value, setValueState] = useUncontrolledProp<Range | undefined>(valueProp, defaultValue, onChangeValue);
  const today = typeof todayProp === 'number' ? new Date(todayProp) : todayProp;
  const [referenceDate] = useState(value?.[0] || today);
  const [preselectedRange, setPreselectedRange] = useState<Range | undefined>();
  const viewDate = useViewDate(referenceDate, viewLevel, viewShift);
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

  const locale = useMemo(() => getLocale(localeProp), [localeProp]);

  return (
    <div
      data-size={size}
      data-fit-to-container={fitToContainer || undefined}
      className={cn(styles.calendar, className, CONTAINER_SIZE_MAP[size])}
      style={style}
      data-test-id={testId}
      {...extractSupportProps(rest)}
    >
      <CalendarContext.Provider
        value={{
          locale,
          size,
          value,
          today,
          viewDate,
          referenceDate,
          preselectedRange,
          mode,
          viewLevel,
          viewShift,
          focus,
          setValue,
          setViewLevel,
          setViewShift,
          startPreselect,
          continuePreselect,
          completePreselect,
          restartPreselect,
          setFocus,
          getTestId,
          onFocusLeave,
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
