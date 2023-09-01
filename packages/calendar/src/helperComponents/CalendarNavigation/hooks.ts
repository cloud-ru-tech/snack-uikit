import { useContext } from 'react';

import { ViewMode } from '../../constants';
import { getMonthName } from '../../utils';
import { CalendarContext } from '../CalendarContext';

export function usePeriodName(): string {
  const { viewDate, viewMode, locale } = useContext(CalendarContext);

  switch (viewMode) {
    case ViewMode.Month:
      const year = viewDate.getFullYear();
      return `${getMonthName(viewDate, locale)} ${year}`;
    case ViewMode.Year:
      return viewDate.getFullYear().toString();
    case ViewMode.Decade:
      const decadeStart = viewDate.getFullYear();
      return `${decadeStart}-${decadeStart + 9}`;
    default:
      return '';
  }
}
