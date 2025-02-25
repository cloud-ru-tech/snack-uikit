import { PaginationState, SortingState } from '@tanstack/react-table';

export type Settings<TFilter> = {
  filter?: TFilter;
  pagination: PaginationState;
  search: string;
  sorting: SortingState;
};
