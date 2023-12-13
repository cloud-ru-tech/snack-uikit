import { CALENDAR_MODE } from '../../constants';
import { Range } from '../../types';
import { CalendarProps } from './Calendar';

export const getNormalizedValue = ({ value, mode }: CalendarProps): Range | undefined => {
  if (!value) return value;
  if (mode === CALENDAR_MODE.Date) return [value, value];
  return value;
};

export const getNormalizedDefaultValue = ({ defaultValue, mode }: CalendarProps): Range | undefined => {
  if (!defaultValue) return defaultValue;
  if (mode === CALENDAR_MODE.Date) return [defaultValue, defaultValue];
  return defaultValue;
};
