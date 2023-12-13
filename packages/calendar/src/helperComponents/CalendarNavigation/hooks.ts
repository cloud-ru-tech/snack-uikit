import { useContext } from 'react';

import { VIEW_MODE } from '../../constants';
import { getMonthName } from '../../utils';
import { CalendarContext } from '../CalendarContext';

export function usePeriodName(): string {
  const { viewDate, viewMode, locale } = useContext(CalendarContext);

  switch (viewMode) {
    case VIEW_MODE.Month:
      const year = viewDate.getFullYear();
      return `${getMonthName(viewDate, locale)} ${year}`;
    case VIEW_MODE.Year:
      return viewDate.getFullYear().toString();
    case VIEW_MODE.Decade:
      const decadeStart = viewDate.getFullYear();
      return `${decadeStart}-${decadeStart + 9}`;
    default:
      return '';
  }
}
