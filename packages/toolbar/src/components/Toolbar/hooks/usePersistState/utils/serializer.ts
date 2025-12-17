import { createRequestPayload, RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';
import { FiltersState } from '@snack-uikit/chips';

import { PersistedFilterState } from '../../../types';
import { isDateString } from './isDateString';

type FilterValue = string | null | number | boolean | Date;

const mapValueToString = (filter: FilterValue): string | null | number | boolean => {
  if (filter instanceof Date) {
    return filter.toISOString();
  }

  if (isDateString(filter)) {
    return filter;
  }

  return filter;
};

const mapFilterToPayload = (value?: FiltersState): RequestPayloadParams['filter'] => {
  if (!value) {
    return undefined;
  }

  return Object.entries(value)
    .filter(([, v]) => v !== undefined)
    .map(([key, v]) =>
      Array.isArray(v)
        ? {
            value: (v as FilterValue[]).map(mapValueToString),
            condition: 'in',
            field: key,
          }
        : {
            value: mapValueToString(v as FilterValue),
            condition: 'eq',
            field: key,
          },
    );
};

/** Вспомогательная функция для преобразования состояния тулбара к формату RequestPayloadParams */
export const formatFilterStateToRequestPayload = <T extends FiltersState>(value?: PersistedFilterState<T> | null) =>
  createRequestPayload({
    pagination: value?.pagination,
    search: value?.search ?? '',
    ordering: value?.ordering,
    filter: mapFilterToPayload(value?.filter),
  });

export const defaultSerializer = <T extends FiltersState>(value: PersistedFilterState<T>) =>
  formatFilterStateToRequestPayload(value).toString();
