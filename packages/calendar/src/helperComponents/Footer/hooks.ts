import { useContext, useMemo } from 'react';

import { CalendarContext } from '../CalendarContext';
import { createFooterKeyboardNavigation, FooterFocusController } from './navigation';

export function useFooterParams() {
  const {
    footerMode = 'current-time-and-apply',
    mode,
    isTimeFilled,
    isDateAndTimeFilled,
  } = useContext(CalendarContext);

  const isApplyOnlyFooter = footerMode === 'apply-only';
  const isApplyButtonDisabled = mode === 'time' ? !isTimeFilled() : !isDateAndTimeFilled();

  return {
    footerMode,
    isApplyOnlyFooter,
    isApplyButtonDisabled,
  };
}

export function useFooterKeyboardNavigation() {
  const { footerMode, isApplyButtonDisabled } = useFooterParams();

  const {
    dateAndTime,
    showSeconds,
    applyButtonRef,
    currentButtonRef,
    minutesKeyboardNavigationRef,
    secondsKeyboardNavigationRef,
    onFocusLeave,
  } = useContext(CalendarContext);

  const focusController = useMemo(
    () =>
      new FooterFocusController({
        showSeconds,
        dateAndTime,
        applyButtonRef,
        currentButtonRef,
        minutesKeyboardNavigationRef,
        secondsKeyboardNavigationRef,
        onFocusLeave,
      }),
    [
      applyButtonRef,
      currentButtonRef,
      dateAndTime,
      minutesKeyboardNavigationRef,
      onFocusLeave,
      secondsKeyboardNavigationRef,
      showSeconds,
    ],
  );

  return useMemo(
    () => createFooterKeyboardNavigation(footerMode, focusController, isApplyButtonDisabled),
    [focusController, footerMode, isApplyButtonDisabled],
  );
}
