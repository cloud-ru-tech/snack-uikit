import { KeyboardEventHandler, useContext } from 'react';

import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { CheckSVG } from '@snack-uikit/icons';
import { getDefaultItemId } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { getMonthShift } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import styles from './styles.module.scss';

export function Footer() {
  const {
    size,
    viewMode,
    mode,
    today,
    setValue,
    dateAndTime,
    isDateAndTimeFilled,
    onDateAndTimeChange,
    applyButtonRef,
    currentButtonRef,
    hoursKeyboardNavigationRef,
    minutesKeyboardNavigationRef,
    secondsKeyboardNavigationRef,
    showSeconds,
    getTestId,
    referenceDate,
    setViewShift,
  } = useContext(CalendarContext);

  const { t } = useLocale('Calendar');

  if (!(mode === 'date-time' && viewMode === 'month')) {
    return null;
  }

  const handleCurrentKeyDown: KeyboardEventHandler = event => {
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();

      if (showSeconds) {
        secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.seconds ?? 0));
      } else {
        minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.minutes ?? 0));
      }
    }
  };

  const handleCurrentClick = () => {
    onDateAndTimeChange(today);
    setViewShift(getMonthShift(referenceDate, today));

    hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(today.getHours() ?? 0));
    minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(today.getMinutes() ?? 0));
    secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(today.getSeconds() ?? 0));
  };

  const handleApplySelection = () => {
    if (!dateAndTime) {
      return;
    }

    const { year = today.getFullYear(), month = today.getMonth(), day, hours, minutes, seconds } = dateAndTime;
    const newDate = new Date(year, month, day, hours, minutes, seconds);

    setValue([newDate, newDate]);
    onDateAndTimeChange(newDate);
  };

  return (
    <div className={styles.footer} data-size={size}>
      <Divider className={styles.divider} />

      <div className={styles.currentWrapper} data-size={size}>
        <ButtonFunction
          label={t('current')}
          size={size === 's' ? 'xs' : 's'}
          onClick={handleCurrentClick}
          ref={currentButtonRef}
          onKeyDown={handleCurrentKeyDown}
          data-test-id={getTestId('current-button')}
        />

        <ButtonFilled
          icon={<CheckSVG />}
          size={size === 's' ? 'xs' : 's'}
          disabled={!isDateAndTimeFilled()}
          onClick={handleApplySelection}
          ref={applyButtonRef}
          data-test-id={getTestId('apply-button')}
        />
      </div>
    </div>
  );
}
