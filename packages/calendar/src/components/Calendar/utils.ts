import { CALENDAR_MODE } from '../../constants';
import { Range } from '../../types';
import { CalendarProps } from './Calendar';

export const getNormalizedValue = ({ value, mode }: CalendarProps): Range | undefined => {
  if (!value) return value;
  if (mode === CALENDAR_MODE.Date || mode === CALENDAR_MODE.Month) return [value, value];
  return value;
};

export const getNormalizedDefaultValue = ({ defaultValue, mode }: CalendarProps): Range | undefined => {
  if (!defaultValue) return defaultValue;
  if (mode === CALENDAR_MODE.Date || mode === CALENDAR_MODE.Month) return [defaultValue, defaultValue];
  return defaultValue;
};
