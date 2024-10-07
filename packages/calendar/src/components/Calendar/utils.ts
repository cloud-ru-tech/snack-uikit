import { Range } from '../../types';
import { CalendarProps } from './Calendar';

function isRangeValue(value: CalendarProps['value']): value is Range {
  return Array.isArray(value) && value.length === 2 && value[0] instanceof Date && value[1] instanceof Date;
}

function isDateValue(value: CalendarProps['value']): value is Date {
  return value instanceof Date;
}

export const getNormalizedValue = (value: CalendarProps['value']): Range | undefined => {
  if (isRangeValue(value)) {
    return value;
  }

  if (isDateValue(value)) {
    return [value, value];
  }

  return value;
};
