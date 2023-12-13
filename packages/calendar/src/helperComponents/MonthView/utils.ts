import { GRID_SIZE, VIEW_MODE } from '../../constants';
import { BaseGrid, BaseGridItem } from '../../types';
import { getStartOfWeek } from '../../utils';
import { WEEK_STARTS_WITH_MONDAY, WEEK_STARTS_WITH_SUNDAY } from './constants';

export const buildMonthGrid = (date: Date, locale: Intl.Locale): BaseGrid => {
  const result: BaseGrid = [];
  const WEEK = getStartOfWeek(locale) === 0 ? WEEK_STARTS_WITH_SUNDAY : WEEK_STARTS_WITH_MONDAY;
  const startGap = WEEK.indexOf(date.getDay());
  let currentDate = new Date(date.getFullYear(), date.getMonth(), 1 - startGap);
  const { rows } = GRID_SIZE[VIEW_MODE.Month];

  for (let i = 0; i < rows; i++) {
    const week: BaseGridItem[] = [];

    for (let j = 0; j < WEEK.length; j++) {
      week.push({ date: currentDate, address: [i, j] });
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    }

    result.push(week);
  }

  return result;
};
