import { ViewMode } from '../../constants';

export function useViewDate(referenceDate: Date, viewMode: ViewMode, viewShift: number) {
  switch (viewMode) {
    case ViewMode.Decade:
      const decadeFirstYear = Math.floor(referenceDate.getFullYear() / 10) * 10;
      return new Date(decadeFirstYear + viewShift * 10, 1, 1);
    case ViewMode.Year:
      return new Date(referenceDate.getFullYear() + viewShift, 1, 1);
    case ViewMode.Month:
    default:
      return new Date(referenceDate.getFullYear(), referenceDate.getMonth() + viewShift, 1);
  }
}
