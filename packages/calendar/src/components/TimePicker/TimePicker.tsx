import cn from 'classnames';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { ListProps } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { useEventHandler, WithSupportProps } from '@snack-uikit/utils';

import { DEFAULT_LOCALE, SIZE } from '../../constants';
import { CalendarContext } from '../../helperComponents/CalendarContext';
import { Footer } from '../../helperComponents/Footer';
import { TimePickerBase } from '../../helperComponents/TimePickerBase';
import { useDateAndTime } from '../../hooks';
import { FocusDirection, Range, Size, TimeValue } from '../../types';
import { getLocale, getTestIdBuilder } from '../../utils';
import styles from './styles.module.scss';

const stubDate = new Date();
const stubFunc = () => {};

export type TimePickerProps = WithSupportProps<{
  /** Выбранное значение.*/
  value?: TimeValue;
  /** Дата сегодняшнего дня */
  today?: Date | number;
  /** Значение по-умолчанию для uncontrolled. */
  defaultValue?: TimeValue;
  /** Колбек выбора значения */
  onChangeValue?(value?: TimeValue): void;
  /** Показывать ли секунды */
  showSeconds?: boolean;

  /**
   * Размер
   * @default m
   */
  size?: Size;
  /** CSS-класс контейнера */
  className?: string;
  /**
   * Отключает предустановленный размер, заставляя компонент подстраиваться к размеру контейнра: (width: 100%, height: 100%).
   * @default true
   */
  fitToContainer?: boolean;

  /** Колбек потери фокуса. Вызывается со значением `next`, когда фокус покидает компонент, передвигаясь вперед, по клавише `tab`. Со значением `prev` - по клавише стрелки вверх или `shift + tab`. */
  onFocusLeave?(direction: FocusDirection): void;
  /** Ссылка на управление первым элементом навигации */
  navigationStartRef?: RefObject<{ focus(): void }>;
}>;

export function TimePicker({
  className,
  size = SIZE.M,
  fitToContainer = true,
  value: valueProp,
  defaultValue,
  onChangeValue,
  onFocusLeave,
  'data-test-id': testId,
  navigationStartRef,
  showSeconds = true,
  today: todayProp,
}: TimePickerProps) {
  const [value, setValueState] = useUncontrolledProp<TimeValue | undefined>(valueProp, defaultValue, onChangeValue);
  const setValueEventHandler = useEventHandler(setValueState);
  const [internalValue, setInternalValue] = useState<Range | undefined>();
  const [focus, setFocus] = useState<string | undefined>(undefined);
  const today = typeof todayProp === 'number' ? new Date(todayProp) : todayProp;

  useEffect(() => {
    if (!internalValue?.[0]) {
      return;
    }

    const hours = internalValue[0].getHours() ?? 0;
    const minutes = internalValue[0].getMinutes() ?? 0;
    const seconds = internalValue[0].getSeconds() ?? 0;

    setValueEventHandler({ hours, minutes, seconds });
  }, [internalValue, setValueEventHandler]);

  const setValue = useCallback((dates: Range) => {
    const newDate = dates[0];
    setInternalValue([newDate, newDate]);
  }, []);

  const {
    dateAndTime,
    onTimeChange,
    onDateChange,
    onDateAndTimeChange,
    isDateFilled,
    isTimeFilled,
    isDateAndTimeFilled,
  } = useDateAndTime({ showSeconds, value });

  const applyButtonRef = useRef<HTMLButtonElement>(null);
  const currentButtonRef = useRef<HTMLButtonElement>(null);
  const hoursKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const minutesKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });
  const secondsKeyboardNavigationRef: ListProps['keyboardNavigationRef'] = useRef({ focusItem: () => {} });

  const getTestId = useMemo(() => getTestIdBuilder(testId), [testId]);

  const { lang: ctxLang } = useLocale();

  const locale = useMemo(() => getLocale({ localeProp: DEFAULT_LOCALE, ctxLang }), [ctxLang]);

  return (
    <div
      className={cn(styles.timePickerWrapper, className)}
      data-fit-to-container={fitToContainer || undefined}
      data-test-id={testId}
    >
      <CalendarContext.Provider
        value={{
          mode: 'time',
          locale,
          size,
          value: internalValue,
          fitToContainer,
          focus,
          setValue,
          setFocus,
          getTestId,
          onFocusLeave,
          navigationStartRef,
          showSeconds,
          dateAndTime,
          onTimeChange,
          onDateAndTimeChange,
          isTimeFilled,
          applyButtonRef,
          currentButtonRef,
          hoursKeyboardNavigationRef,
          minutesKeyboardNavigationRef,
          secondsKeyboardNavigationRef,
          today,

          // Stub props
          viewMode: 'month',
          showHolidays: false,
          viewDate: stubDate,
          referenceDate: stubDate,
          preselectedRange: undefined,
          viewShift: 0,
          setViewMode: stubFunc,
          setViewShift: stubFunc,
          startPreselect: stubFunc,
          continuePreselect: stubFunc,
          completePreselect: stubFunc,
          restartPreselect: stubFunc,
          buildCellProps: () => ({ isDisabled: false, isHoliday: false }),
          onDateChange,
          isDateAndTimeFilled,
          isDateFilled,
        }}
      >
        <TimePickerBase showDivider={false} />

        <Footer />
      </CalendarContext.Provider>
    </div>
  );
}
