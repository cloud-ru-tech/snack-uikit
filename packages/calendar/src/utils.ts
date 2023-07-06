import { getWeekStartByLocale } from 'weekstart';

import { InRangePosition, ViewLevel } from './constants';
import { Range } from './types';

export const isTheSameDecade = (date1: Date, date2: Date) =>
  Math.floor(date1.getFullYear() / 10) === Math.floor(date2.getFullYear() / 10);

export const isTheSameYear = (date1: Date, date2: Date): boolean => date1.getFullYear() === date2.getFullYear();

export const isTheSameMonth = (date1: Date, date2: Date): boolean =>
  isTheSameYear(date1, date2) && date1.getMonth() === date2.getMonth();

export const isTheSameDate = (date1: Date, date2: Date): boolean =>
  isTheSameMonth(date1, date2) && date1.getDate() === date2.getDate();

export const capitalize = (str: string) => str.substring(0, 1).toUpperCase() + str.substring(1);

export const getMonthName = (date: Date, locale?: Intl.Locale): string => {
  const monthName = date.toLocaleString(locale, { month: 'long' });
  return capitalize(monthName);
};

export const getDateLabel = (date: Date) => date.getDate().toString();

export const getYearLabel = (date: Date) => date.getFullYear().toString();

export const getMonthShift = (today: Date, targetDate: Date) => {
  const overYearDiff = (targetDate.getFullYear() - today.getFullYear()) * 12;
  const monthsDiff = targetDate.getMonth() - today.getMonth();
  return overYearDiff + monthsDiff;
};

export const getYearShift = (today: Date, targetDate: Date) => targetDate.getFullYear() - today.getFullYear();

export const getDecadeShift = (today: Date, targetDate: Date) =>
  Math.trunc((targetDate.getFullYear() - today.getFullYear()) / 10);

export const isTheSameItem = (viewLevel: ViewLevel, date1: Date, date2: Date): boolean => {
  switch (viewLevel) {
    case ViewLevel.Month:
      return isTheSameDate(date1, date2);
    case ViewLevel.Year:
      return isTheSameMonth(date1, date2);
    case ViewLevel.Decade:
      return isTheSameYear(date1, date2);
    default:
      return false;
  }
};

export const sortDates = (dates: Date[]): Date[] => [...dates].sort((d1, d2) => d1.valueOf() - d2.valueOf());

export const getInRangePosition = (date: Date, viewLevel: ViewLevel, range?: Range): InRangePosition => {
  if (!range) {
    return InRangePosition.Out;
  }

  const [startDate, endDate] = sortDates(range);

  const isStart = isTheSameItem(viewLevel, date, startDate);
  const isEnd = isTheSameItem(viewLevel, date, endDate);

  if (isStart && isEnd) {
    return InRangePosition.StartEnd;
  }

  if (isStart) {
    return InRangePosition.Start;
  }

  if (isEnd) {
    return InRangePosition.End;
  }

  const [start, end] = range.map(date => date.valueOf()).sort();

  return date.valueOf() >= start && date.valueOf() <= end ? InRangePosition.In : InRangePosition.Out;
};

export const getEndOfTheDay = (date: Date) =>
  new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).valueOf() - 1);

export const getTestIdBuilder = (testId?: string) => (prefix: string) => testId ? `${prefix}-${testId}` : undefined;

export const getLocale = (localeProp?: Intl.Locale) => localeProp || new Intl.Locale(navigator?.language || 'ru-RU');

export const getStartOfWeek = (locale: Intl.Locale) => getWeekStartByLocale(locale.language);