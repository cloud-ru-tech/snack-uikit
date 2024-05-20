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
