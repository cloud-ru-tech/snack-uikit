import { useContext } from 'react';

import { ViewLevel } from '../../constants';
import { useGrid } from '../../hooks';
import { getYearLabel, getYearShift, isTheSameDecade, isTheSameYear } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import { Grid } from '../Grid';
import { buildDecadeGrid } from './utils';

export function DecadeView() {
  const { referenceDate, setViewLevel, setViewShift, preselectedRange, continuePreselect, restartPreselect } =
    useContext(CalendarContext);

  const grid = useGrid({
    buildGrid: buildDecadeGrid,
    isTheSameItem: isTheSameYear,
    isInPeriod: isTheSameDecade,
    getItemLabel: getYearLabel,

    onSelect(date: Date) {
      setViewShift(getYearShift(referenceDate, date));
      setViewLevel(ViewLevel.Year);
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
