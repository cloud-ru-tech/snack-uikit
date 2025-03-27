import { PaginationState, SortingState } from '@tanstack/react-table';

export type Settings<TFilters> = {
  filter?: TFilters;
  pagination: PaginationState;
  search: string;
  sorting: SortingState;
};
