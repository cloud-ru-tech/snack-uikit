import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/react-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank: RankingInfo = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const preciseFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank: RankingInfo = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const isDateString = (value: unknown): value is string => typeof value === 'string' && !isNaN(Number(new Date(value)));
export const customDateParser = <T>(value: Record<string, unknown>): T =>
  Object.fromEntries(
    Object.entries(value).map(([key, value]) => {
      if (isDateString(value)) {
        return [key, new Date(value)];
      }
      if (Array.isArray(value) && value.some(isDateString)) {
        return [key, value.map(element => (isDateString(element) ? new Date(element) : element))];
      }
      return [key, value];
    }),
  ) as T;
