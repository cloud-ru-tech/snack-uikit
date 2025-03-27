import { PaginationState, SortingState } from '@tanstack/react-table';

import { ChipChoiceRowProps } from '@snack-uikit/chips';

export const validatePaging = (value: unknown): value is PaginationState =>
  typeof (value as PaginationState)?.pageSize === 'number' && typeof (value as PaginationState)?.pageIndex === 'number';

export const validateSorting = (value: unknown): value is SortingState =>
  (value as SortingState)?.every(column => typeof column?.id === 'string' && typeof column?.desc === 'boolean');

export const validateFilter = <TFilters extends Record<string, unknown>>(
  value: unknown,
  filterSettings: ChipChoiceRowProps<TFilters>['filters'],
): value is TFilters =>
  typeof value === 'object' &&
  value !== null &&
  Object.keys(value).every(field => Boolean(filterSettings.find(setting => setting.id === field)));
