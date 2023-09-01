import { ViewMode } from '../../constants';
import { getDecadeShift, getYearShift } from '../../utils';

export const getShift = (referenceDate: Date, viewDate: Date, currentViewLevel: ViewMode): number => {
  switch (currentViewLevel) {
    case ViewMode.Month:
      return getYearShift(referenceDate, viewDate);
    case ViewMode.Year:
      return getDecadeShift(referenceDate, viewDate);
    case ViewMode.Decade:
    default:
      return 0;
  }
};
