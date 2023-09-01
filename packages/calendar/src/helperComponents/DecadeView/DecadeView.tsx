import { useContext } from 'react';

import { ViewMode } from '../../constants';
import { useGrid } from '../../hooks';
import { getYearLabel, getYearShift, isTheSameDecade, isTheSameYear } from '../../utils';
import { CalendarContext } from '../CalendarContext';
import { Grid } from '../Grid';
import { buildDecadeGrid } from './utils';

export function DecadeView() {
  const { referenceDate, setViewMode, setViewShift, preselectedRange, continuePreselect, restartPreselect } =
    useContext(CalendarContext);

  const grid = useGrid({
    buildGrid: buildDecadeGrid,
    isTheSameItem: isTheSameYear,
    isInPeriod: isTheSameDecade,
    getItemLabel: getYearLabel,

    onSelect(date: Date) {
      setViewShift(getYearShift(referenceDate, date));
      setViewMode(ViewMode.Year);
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
