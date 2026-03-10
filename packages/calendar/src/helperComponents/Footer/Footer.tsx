import { useContext } from 'react';

import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { getDefaultItemId } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { CALENDAR_MODE } from '../../constants';
import { getMonthShift } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import { useFooterKeyboardNavigation, useFooterParams } from './hooks';
import { isFooterWithCurrentButton } from './navigation';
import styles from './styles.module.scss';

export function Footer() {
  const {
    size,
    viewMode,
    mode,
    today,
    setValue,
    dateAndTime,
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

  const { isApplyButtonDisabled } = useFooterParams();
  const navigation = useFooterKeyboardNavigation();

  const { t } = useLocale('Calendar');

  if (![CALENDAR_MODE.DateTime, 'time'].includes(mode) || viewMode !== 'month') {
    return null;
  }

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

  const buttonSize = size === 's' ? 'xs' : 's';

  return (
    <div className={styles.footer} data-size={size}>
      <Divider className={styles.divider} />

      <div className={styles.currentWrapper} data-size={size}>
        {isFooterWithCurrentButton(navigation) && (
          <ButtonFunction
            label={t('current')}
            size={buttonSize}
            onClick={handleCurrentClick}
            ref={currentButtonRef}
            onKeyDown={event => navigation.handleCurrentKeyDown(event)}
            data-test-id={getTestId('current-button')}
          />
        )}

        <ButtonFilled
          className={styles.applyButton}
          label={t('apply')}
          size={buttonSize}
          disabled={isApplyButtonDisabled}
          onClick={handleApplySelection}
          ref={applyButtonRef}
          onKeyDown={event => navigation.handleApplyKeyDown(event)}
          data-test-id={getTestId('apply-button')}
        />
      </div>
    </div>
  );
}
