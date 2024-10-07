import { KeyboardEventHandler, useCallback, useContext, useMemo } from 'react';

import { Divider } from '@snack-uikit/divider';
import { getDefaultItemId } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { AUTOFOCUS, HOURS, MINUTES, SECONDS } from '../../constants';
import { CalendarContext } from '../CalendarContext';
import { TimeList } from '../TimeList';
import styles from './styles.module.scss';

export function TimePickerBase({ showDivider = true }: { showDivider?: boolean }) {
  const { t } = useLocale('Calendar');
  const {
    size,
    mode,
    fitToContainer,
    showSeconds,
    dateAndTime,
    onTimeChange,
    applyButtonRef,
    currentButtonRef,
    hoursKeyboardNavigationRef,
    minutesKeyboardNavigationRef,
    secondsKeyboardNavigationRef,
    setFocus,
    getTestId,
    navigationStartRef,
    onFocusLeave,
  } = useContext(CalendarContext);

  const hours = dateAndTime?.hours;
  const minutes = dateAndTime?.minutes;
  const seconds = dateAndTime?.seconds;

  const getTimeChangeHandler = useCallback(
    (propName: 'hours' | 'minutes' | 'seconds') => (value: number) => {
      const timeValues = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        ...dateAndTime,
      };

      onTimeChange({
        ...timeValues,
        [propName]: value ?? dateAndTime?.[propName] ?? 0,
      });
    },
    [dateAndTime, onTimeChange],
  );

  const onHoursChange = useMemo(() => getTimeChangeHandler('hours'), [getTimeChangeHandler]);
  const onMinutesChange = useMemo(() => getTimeChangeHandler('minutes'), [getTimeChangeHandler]);
  const onSecondsChange = useMemo(() => getTimeChangeHandler('seconds'), [getTimeChangeHandler]);

  const onHourKeyDownGetter: (id: number) => KeyboardEventHandler = useCallback(
    id => event => {
      switch (event.key) {
        case 'Tab':
          if (mode === 'time' && event.shiftKey) {
            onFocusLeave?.('prev');
            break;
          }

          event.stopPropagation();
          event.preventDefault();

          if (event.shiftKey) {
            setFocus(AUTOFOCUS);
          } else {
            minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(minutes ?? 0));
          }
          break;
        case 'Enter':
          minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(minutes ?? 0));
          break;
        case 'ArrowUp':
          if (mode === 'time' && id === 0) {
            onFocusLeave?.('prev');
            break;
          }
          break;
        default:
          break;
      }
    },
    [minutes, minutesKeyboardNavigationRef, mode, onFocusLeave, setFocus],
  );

  const onMinuteKeyDownGetter: (id: number) => KeyboardEventHandler = useCallback(
    () => event => {
      switch (event.key) {
        case 'Tab':
          event.stopPropagation();
          event.preventDefault();

          if (event.shiftKey) {
            hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(hours ?? 0));
          } else {
            if (showSeconds) {
              secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(seconds ?? 0));
            } else {
              currentButtonRef.current?.focus();
            }
          }
          break;
        case 'Enter':
          if (showSeconds) {
            secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(seconds ?? 0));
          } else {
            applyButtonRef.current?.focus();
          }
          break;
        default:
          break;
      }
    },
    [
      applyButtonRef,
      currentButtonRef,
      hours,
      hoursKeyboardNavigationRef,
      seconds,
      secondsKeyboardNavigationRef,
      showSeconds,
    ],
  );

  const onSecondKeyDownGetter: (id: number) => KeyboardEventHandler = useCallback(
    () => event => {
      switch (event.key) {
        case 'Tab':
          event.stopPropagation();
          event.preventDefault();

          if (event.shiftKey) {
            minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(minutes ?? 0));
          } else {
            currentButtonRef.current?.focus();
          }
          break;
        case 'Enter':
          applyButtonRef.current?.focus();
          break;
        default:
          break;
      }
    },
    [applyButtonRef, currentButtonRef, minutes, minutesKeyboardNavigationRef],
  );

  return (
    <>
      {showDivider && <Divider orientation='vertical' className={styles.divider} />}

      <div className={styles.timePicker} data-size={size} data-fit-to-container={fitToContainer || undefined}>
        <div className={styles.header} data-size={size}>
          <span className={styles.title}>{t('time')}</span>
        </div>

        <div className={styles.timeListsWrapper} data-size={size} data-show-seconds={showSeconds || undefined}>
          <TimeList
            value={hours}
            onChange={onHoursChange}
            data-test-id={getTestId('hours')}
            numberOfItems={HOURS}
            onKeyDownGetter={onHourKeyDownGetter}
            keyboardNavigationRef={hoursKeyboardNavigationRef}
            navigationStartRef={mode === 'time' ? navigationStartRef : undefined}
          />

          <Divider className={styles.divider} orientation='vertical' />

          <TimeList
            value={minutes}
            onChange={onMinutesChange}
            data-test-id={getTestId('minutes')}
            numberOfItems={MINUTES}
            onKeyDownGetter={onMinuteKeyDownGetter}
            keyboardNavigationRef={minutesKeyboardNavigationRef}
          />

          {showSeconds && (
            <>
              <Divider className={styles.divider} orientation='vertical' />

              <TimeList
                value={seconds}
                onChange={onSecondsChange}
                data-test-id={getTestId('seconds')}
                numberOfItems={SECONDS}
                onKeyDownGetter={onSecondKeyDownGetter}
                keyboardNavigationRef={secondsKeyboardNavigationRef}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
