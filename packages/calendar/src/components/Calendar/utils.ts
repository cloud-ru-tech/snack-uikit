import { CALENDAR_MODE } from '../../constants';
import { CalendarMode, Range } from '../../types';
import { CalendarProps } from './Calendar';

export const getNormalizedValue = (mode: CalendarMode, value: CalendarProps['value']): Range | undefined => {
  if (!value) return value;

  if (mode === CALENDAR_MODE.Range) {
    return value as Range;
  }

  return [value as Date, value as Date];
};
