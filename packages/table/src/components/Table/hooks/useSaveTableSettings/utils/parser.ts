import { PaginationState, SortingState } from '@tanstack/react-table';

import { parseQueryParamsString, RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';
import { FiltersState } from '@snack-uikit/chips';

import { DEFAULT_PAGE_SIZE } from '../../../../../constants';
import { Settings } from '../types';

const mapPagination = (value: RequestPayloadParams['pagination']): PaginationState => {
  if (!value || !value.offset || !value.limit) return { pageSize: DEFAULT_PAGE_SIZE, pageIndex: 0 };
  return {
    pageSize: value.limit || DEFAULT_PAGE_SIZE,
    pageIndex: Math.floor(value.offset / value.limit),
  };
};

const mapSort = (value: RequestPayloadParams['sort'] = []): SortingState =>
  value.map(column => ({
    id: column.field,
    desc: column.direction === 'd',
  }));

const mapFilter = <TFilter extends FiltersState = Record<string, unknown>>(
  value?: RequestPayloadParams['filter'],
): TFilter | undefined => {
  if (!value) {
    return undefined;
  }
  return Object.fromEntries(value.map(filter => [filter.field, filter.value])) as TFilter;
};

export const parser = <TFilter extends FiltersState = Record<string, unknown>>(value: string): Settings<TFilter> => {
  const parsedValue = parseQueryParamsString(value);
  return {
    pagination: mapPagination(parsedValue?.pagination),
    search: parsedValue?.search?.toString() || '',
    sorting: mapSort(parsedValue?.sort),
    filter: mapFilter(parsedValue?.filter),
  };
};
