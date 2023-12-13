import { VIEW_MODE } from '../../constants';
import { ViewMode } from '../../types';
import { getDecadeShift, getYearShift } from '../../utils';

export const getShift = (referenceDate: Date, viewDate: Date, currentViewLevel: ViewMode): number => {
  switch (currentViewLevel) {
    case VIEW_MODE.Month:
      return getYearShift(referenceDate, viewDate);
    case VIEW_MODE.Year:
      return getDecadeShift(referenceDate, viewDate);
    case VIEW_MODE.Decade:
    default:
      return 0;
  }
};
