import { useContext } from 'react';

import { ViewMode } from '../../constants';
import { CalendarContext } from '../CalendarContext';
import { DecadeView } from '../DecadeView';
import { MonthView } from '../MonthView';
import { YearView } from '../YearView';

export function CalendarBody() {
  const { viewMode } = useContext(CalendarContext);

  switch (viewMode) {
    case ViewMode.Decade:
      return <DecadeView />;
    case ViewMode.Year:
      return <YearView />;
    case ViewMode.Month:
    default:
      return <MonthView />;
  }
}
