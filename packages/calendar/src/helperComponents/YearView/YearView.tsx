import { useContext } from 'react';

import { AUTOFOCUS, CALENDAR_MODE, VIEW_MODE } from '../../constants';
import { useGrid } from '../../hooks';
import { getMonthName, getMonthShift, isTheSameMonth, isTheSameYear } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import { Grid } from '../Grid';
import { buildYearGrid } from './utils';

export function YearView() {
  const {
    referenceDate,
    setViewMode,
    setViewShift,
    setFocus,
    preselectedRange,
    continuePreselect,
    restartPreselect,
    locale,
    setValue,
    mode,
  } = useContext(CalendarContext);

  const grid = useGrid({
    buildGrid: buildYearGrid,
    isTheSameItem: isTheSameMonth,
    isInPeriod: isTheSameYear,
    getItemLabel: date => getMonthName(date, locale),

    onSelect(date: Date) {
      if (mode === CALENDAR_MODE.Month) {
        setValue([date, date]);
        return;
      }

      setFocus(AUTOFOCUS);
      setViewShift(getMonthShift(referenceDate, date));
      setViewMode(VIEW_MODE.Month);
    },

    onPreselect(date: Date) {
      if (preselectedRange) {
        continuePreselect(date);
      }
    },

    onLeave() {
      if (preselectedRange) {
        restartPreselect();
      }
    },
  });

  return <Grid grid={grid} />;
}
