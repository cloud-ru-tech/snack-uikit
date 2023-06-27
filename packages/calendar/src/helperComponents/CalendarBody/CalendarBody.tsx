import { useContext } from 'react';

import { ViewLevel } from '../../constants';
import { CalendarContext } from '../CalendarContext';
import { DecadeView } from '../DecadeView';
import { MonthView } from '../MonthView';
import { YearView } from '../YearView';

export function CalendarBody() {
  const { viewLevel } = useContext(CalendarContext);

  switch (viewLevel) {
    case ViewLevel.Decade:
      return <DecadeView />;
    case ViewLevel.Year:
      return <YearView />;
    case ViewLevel.Month:
    default:
      return <MonthView />;
  }
}
