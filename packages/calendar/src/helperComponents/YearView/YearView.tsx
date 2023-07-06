import { useContext } from 'react';

import { AUTOFOCUS, ViewLevel } from '../../constants';
import { useGrid } from '../../hooks';
import { getMonthName, getMonthShift, isTheSameMonth, isTheSameYear } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import { Grid } from '../Grid';
import { buildYearGrid } from './utils';

export function YearView() {
  const {
    referenceDate,
    setViewLevel,
    setViewShift,
    setFocus,
    preselectedRange,
    continuePreselect,
    restartPreselect,
    locale,
  } = useContext(CalendarContext);

  const grid = useGrid({
    buildGrid: buildYearGrid,
    isTheSameItem: isTheSameMonth,
    isInPeriod: isTheSameYear,
    getItemLabel: date => getMonthName(date, locale),

    onSelect(date: Date) {
      setFocus(AUTOFOCUS);
      setViewShift(getMonthShift(referenceDate, date));
      setViewLevel(ViewLevel.Month);
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