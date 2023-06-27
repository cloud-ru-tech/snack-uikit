import { capitalize, getStartOfWeek } from '../../utils';

export const MONDAY_DATE = new Date(1970, 1, 2);

export const SUNDAY_DATE = new Date(1970, 1, 1);

export const getWeekLabels = (locale: Intl.Locale): string[] => {
  const labels: string[] = [];

  const startDate = getStartOfWeek(locale) === 0 ? SUNDAY_DATE : MONDAY_DATE;

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    labels.push(capitalize(date.toLocaleString(locale, { weekday: 'short' })));
  }

  return labels;
};
