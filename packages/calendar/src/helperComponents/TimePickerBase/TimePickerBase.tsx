import { KeyboardEventHandler, useContext } from 'react';

import { Divider } from '@snack-uikit/divider';
import { getDefaultItemId } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { AUTOFOCUS, HOURS, MINUTES, SECONDS } from '../../constants';
import { TimeValue } from '../../types';
import { CalendarContext } from '../CalendarContext';
import { TimeList } from '../TimeList';
import styles from './styles.module.scss';

export function TimePickerBase() {
  const { t } = useLocale('Calendar');
  const {
    size,
    viewMode,
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
  } = useContext(CalendarContext);

  const hours = dateAndTime?.hours;
  const minutes = dateAndTime?.minutes;
  const seconds = dateAndTime?.seconds;

  const handleTimeChange = (props: TimeValue) => {
    onTimeChange({
      hours: props.hours ?? hours ?? 0,
      minutes: props.minutes ?? minutes ?? 0,
      seconds: props.seconds ?? seconds ?? 0,
    });
  };

  const handleHourKeyDown: KeyboardEventHandler = event => {
    switch (event.key) {
      case 'Tab':
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
      default:
        break;
    }
  };

  const handleMinutesKeyDown: KeyboardEventHandler = event => {
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
  };

  const handleSecondKeyDown: KeyboardEventHandler = event => {
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
  };

  if (!(mode === 'date-time' && viewMode === 'month')) {
    return null;
  }

  return (
    <>
      <Divider orientation='vertical' className={styles.divider} />

      <div className={styles.timePicker} data-size={size} data-fit-to-container={fitToContainer || undefined}>
        <div className={styles.header} data-size={size}>
          <span className={styles.title}>{t('time')}</span>
        </div>

        <div className={styles.timeListsWrapper} data-size={size} data-show-seconds={showSeconds || undefined}>
          <TimeList
            value={hours}
            onChange={hours => handleTimeChange({ hours })}
            data-test-id={getTestId('hours')}
            numberOfItems={HOURS}
            onKeyDown={handleHourKeyDown}
            keyboardNavigationRef={hoursKeyboardNavigationRef}
          />

          <Divider className={styles.divider} orientation='vertical' />

          <TimeList
            value={minutes}
            onChange={minutes => handleTimeChange({ minutes })}
            data-test-id={getTestId('minutes')}
            numberOfItems={MINUTES}
            onKeyDown={handleMinutesKeyDown}
            keyboardNavigationRef={minutesKeyboardNavigationRef}
          />

          {showSeconds && (
            <>
              <Divider className={styles.divider} orientation='vertical' />

              <TimeList
                value={seconds}
                onChange={seconds => handleTimeChange({ seconds })}
                data-test-id={getTestId('seconds')}
                numberOfItems={SECONDS}
                onKeyDown={handleSecondKeyDown}
                keyboardNavigationRef={secondsKeyboardNavigationRef}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
