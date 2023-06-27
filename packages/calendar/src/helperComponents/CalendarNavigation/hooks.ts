import { useContext } from 'react';

import { ViewLevel } from '../../constants';
import { getMonthName } from '../../utils';
import { CalendarContext } from '../CalendarContext';

export function usePeriodName(): string {
  const { viewDate, viewLevel, locale } = useContext(CalendarContext);

  switch (viewLevel) {
    case ViewLevel.Month:
      const year = viewDate.getFullYear();
      return `${getMonthName(viewDate, locale)} ${year}`;
    case ViewLevel.Year:
      return viewDate.getFullYear().toString();
    case ViewLevel.Decade:
      const decadeStart = viewDate.getFullYear();
      return `${decadeStart}-${decadeStart + 9}`;
    default:
      return '';
  }
}
