import { KeyboardEventHandler, useCallback, useContext } from 'react';

import { getDefaultItemId } from '@snack-uikit/list';

import { CALENDAR_MODE } from '../../constants';
import { useGrid } from '../../hooks';
import { getDateLabel, isTheSameDate, isTheSameMonth } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import { Grid } from '../Grid';
import { buildMonthGrid } from './utils';

export function MonthView() {
  const {
    mode,
    viewMode,
    dateAndTime,
    setValue,
    preselectedRange,
    startPreselect,
    continuePreselect,
    completePreselect,
    restartPreselect,
    onDateChange,
    locale,
    hoursKeyboardNavigationRef,
  } = useContext(CalendarContext);

  const onDayKeyDown: KeyboardEventHandler = useCallback(
    e => {
      if (mode !== 'date-time' && viewMode !== 'month') {
        return;
      }

      switch (e.key) {
        case 'Tab':
          if (!e.shiftKey) {
            e.preventDefault();
            hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.hours ?? 0));
          }

          break;
        case 'Enter':
          setTimeout(() => hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.hours ?? 0)), 0);
          break;
        default:
          break;
      }
    },
    [dateAndTime?.hours, hoursKeyboardNavigationRef, mode, viewMode],
  );

  const grid = useGrid({
    buildGrid: date => buildMonthGrid(date, locale),
    isTheSameItem: isTheSameDate,
    isInPeriod: isTheSameMonth,
    getItemLabel: getDateLabel,

    onSelect(date) {
      if (mode === CALENDAR_MODE.DateTime) {
        onDateChange(date);
        return;
      }

      if (mode === CALENDAR_MODE.Range) {
        preselectedRange ? completePreselect(date) : startPreselect(date);
        return;
      }

      if (mode === CALENDAR_MODE.Date) {
        setValue([date, date]);
      }
    },

    onPreselect(date) {
      if (preselectedRange) {
        continuePreselect(date);
      }
    },

    onLeave() {
      if (preselectedRange) {
        restartPreselect();
      }
    },

    onKeyDown: onDayKeyDown,
  });

  return <Grid grid={grid} />;
}
