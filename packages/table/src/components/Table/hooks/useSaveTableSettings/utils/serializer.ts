import { PaginationState, SortingState } from '@tanstack/react-table';

import { createRequestPayload, RequestPayloadParams, SortDirection } from '@cloud-ru/ft-request-payload-transform';
import { FiltersState } from '@snack-uikit/chips';

import { Settings } from '../types';

const mapPagination = (value: PaginationState): RequestPayloadParams['pagination'] => ({
  limit: value.pageSize,
  offset: value.pageSize * value.pageIndex,
});

const mapSort = (value: SortingState): RequestPayloadParams['sort'] =>
  value.map(column => ({
    field: column.id,
    direction: (column.desc ? 'd' : 'a') as SortDirection,
  }));

type FilterValue = string | null | number | boolean | Date;

const mapDateToString = (filter: FilterValue): string | null | number | boolean =>
  filter instanceof Date ? filter.toISOString() : filter;

const mapFilter = <TFilter extends FiltersState = Record<string, unknown>>(
  value?: TFilter,
): RequestPayloadParams['filter'] => {
  if (!value) {
    return undefined;
  }
  return Object.entries(value)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) =>
      Array.isArray(value)
        ? {
            value: (value as FilterValue[]).map(mapDateToString),
            condition: 'in',
            field: key,
          }
        : {
            value: mapDateToString(value as FilterValue),
            condition: 'eq',
            field: key,
          },
    );
};

export const serializer = <TFilter extends FiltersState = Record<string, unknown>>(value: Settings<TFilter>) =>
  createRequestPayload({
    pagination: mapPagination(value.pagination),
    search: value.search,
    sort: mapSort(value.sorting),
    filter: mapFilter(value.filter),
  }).toString();
