import { KeyboardEventHandler, useContext } from 'react';

import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { CheckSVG } from '@snack-uikit/icons';
import { getDefaultItemId } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { CALENDAR_MODE } from '../../constants';
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
    isTimeFilled,
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
    onFocusLeave,
  } = useContext(CalendarContext);

  const { t } = useLocale('Calendar');

  if (![CALENDAR_MODE.DateTime, 'time'].includes(mode) || viewMode !== 'month') {
    return null;
  }

  const isApplyButtonDisabled = mode === 'time' ? !isTimeFilled() : !isDateAndTimeFilled();

  const handleCurrentKeyDown: KeyboardEventHandler = event => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        event.preventDefault();

        if (showSeconds) {
          secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.seconds ?? 0));
        } else {
          minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.minutes ?? 0));
        }
      } else {
        if (isApplyButtonDisabled) {
          onFocusLeave?.('next');
        }
      }
    }
  };

  const handleApplyKeyDown: KeyboardEventHandler = event => {
    if (event.key === 'Tab' && !event.shiftKey) {
      onFocusLeave?.('next');
    }
  };

  const handleCurrentClick = () => {
    const todayDate = today || new Date();

    onDateAndTimeChange(todayDate);
    setViewShift(getMonthShift(referenceDate, todayDate));

    hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(todayDate.getHours() ?? 0));
    minutesKeyboardNavigationRef.current?.focusItem(getDefaultItemId(todayDate.getMinutes() ?? 0));
    secondsKeyboardNavigationRef.current?.focusItem(getDefaultItemId(todayDate.getSeconds() ?? 0));

    applyButtonRef.current?.focus();
  };

  const handleApplySelection = () => {
    if (!dateAndTime) {
      return;
    }

    const todayDate = today || new Date();

    const {
      year = todayDate.getFullYear(),
      month = todayDate.getMonth(),
      day = todayDate.getMonth(),
      hours,
      minutes,
      seconds,
    } = dateAndTime;

    const newDate = new Date(year, month, day, hours, minutes, showSeconds ? seconds : 0);

    setValue([newDate, newDate]);
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
          disabled={isApplyButtonDisabled}
          onClick={handleApplySelection}
          ref={applyButtonRef}
          onKeyDown={handleApplyKeyDown}
          data-test-id={getTestId('apply-button')}
        />
      </div>
    </div>
  );
}
