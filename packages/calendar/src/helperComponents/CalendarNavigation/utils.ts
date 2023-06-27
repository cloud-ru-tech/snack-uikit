import { ViewLevel } from '../../constants';
import { getDecadeShift, getYearShift } from '../../utils';

export const getShift = (referenceDate: Date, viewDate: Date, currentViewLevel: ViewLevel): number => {
  switch (currentViewLevel) {
    case ViewLevel.Month:
      return getYearShift(referenceDate, viewDate);
    case ViewLevel.Year:
      return getDecadeShift(referenceDate, viewDate);
    case ViewLevel.Decade:
    default:
      return 0;
  }
};
