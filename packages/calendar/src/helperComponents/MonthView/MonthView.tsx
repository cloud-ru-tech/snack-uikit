import { useContext } from 'react';

import { CalendarMode } from '../../constants';
import { useGrid } from '../../hooks';
import { getDateLabel, isTheSameDate, isTheSameMonth } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import { Grid } from '../Grid';
import { buildMonthGrid } from './utils';

export function MonthView() {
  const {
    mode,
    setValue,
    preselectedRange,
    startPreselect,
    continuePreselect,
    completePreselect,
    restartPreselect,
    locale,
  } = useContext(CalendarContext);

  const grid = useGrid({
    buildGrid: date => buildMonthGrid(date, locale),
    isTheSameItem: isTheSameDate,
    isInPeriod: isTheSameMonth,
    getItemLabel: getDateLabel,

    onSelect(date) {
      if (mode === CalendarMode.Range) {
        preselectedRange ? completePreselect(date) : startPreselect(date);
        return;
      }
      setValue([date, date]);
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
  });

  return <Grid grid={grid} />;
}
