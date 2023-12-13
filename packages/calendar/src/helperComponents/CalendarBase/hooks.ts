import { VIEW_MODE } from '../../constants';
import { ViewMode } from '../../types';

export function useViewDate(referenceDate: Date, viewMode: ViewMode, viewShift: number) {
  switch (viewMode) {
    case VIEW_MODE.Decade:
      const decadeFirstYear = Math.floor(referenceDate.getFullYear() / 10) * 10;
      return new Date(decadeFirstYear + viewShift * 10, 1, 1);
    case VIEW_MODE.Year:
      return new Date(referenceDate.getFullYear() + viewShift, 1, 1);
    case VIEW_MODE.Month:
    default:
      return new Date(referenceDate.getFullYear(), referenceDate.getMonth() + viewShift, 1);
  }
}
