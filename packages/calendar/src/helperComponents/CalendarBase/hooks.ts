import { ViewLevel } from '../../constants';

export function useViewDate(referenceDate: Date, viewLevel: ViewLevel, viewShift: number) {
  switch (viewLevel) {
    case ViewLevel.Decade:
      const decadeFirstYear = Math.floor(referenceDate.getFullYear() / 10) * 10;
      return new Date(decadeFirstYear + viewShift * 10, 1, 1);
    case ViewLevel.Year:
      return new Date(referenceDate.getFullYear() + viewShift, 1, 1);
    case ViewLevel.Month:
    default:
      return new Date(referenceDate.getFullYear(), referenceDate.getMonth() + viewShift, 1);
  }
}
