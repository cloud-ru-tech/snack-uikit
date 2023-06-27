import { CalendarMode } from '../../constants';
import { Range } from '../../types';
import { CalendarProps } from './Calendar';

export const getNormalizedValue = ({ value, mode }: CalendarProps): Range | undefined => {
  if (!value) return value;
  if (mode === CalendarMode.Date) return [value, value];
  return value;
};

export const getNormalizedDefaultValue = ({ defaultValue, mode }: CalendarProps): Range | undefined => {
  if (!defaultValue) return defaultValue;
  if (mode === CalendarMode.Date) return [defaultValue, defaultValue];
  return defaultValue;
};
