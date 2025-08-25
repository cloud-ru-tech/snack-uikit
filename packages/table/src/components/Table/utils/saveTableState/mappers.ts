import { PaginationState, SortingState } from '@tanstack/react-table';

import { RequestPayloadParams, SortDirection } from '@cloud-ru/ft-request-payload-transform';

import { DEFAULT_PAGE_SIZE } from '../../../../constants';

export const mapPaginationToTableState = (value?: RequestPayloadParams['pagination']): PaginationState => {
  if (!value || value.offset === undefined || value.limit === undefined) {
    return { pageSize: DEFAULT_PAGE_SIZE, pageIndex: 0 };
  }

  return {
    pageSize: value.limit || DEFAULT_PAGE_SIZE,
    pageIndex: Math.floor(value.offset / value.limit),
  };
};

export const mapSortToTableState = (value: RequestPayloadParams['sort'] = []): SortingState =>
  value.map(column => ({
    id: column.field,
    desc: column.direction === 'd',
  }));

export const mapPaginationToRequestPayload = (value: PaginationState): RequestPayloadParams['pagination'] => ({
  limit: value.pageSize,
  offset: value.pageSize * value.pageIndex,
});

export const mapSortToRequestPayload = (value: SortingState): RequestPayloadParams['sort'] =>
  value?.map(column => ({
    field: column.id,
    direction: (column.desc ? 'd' : 'a') as SortDirection,
  })) || [];
