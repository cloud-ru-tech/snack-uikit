import { parseQueryParamsString, RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';
import { FiltersState } from '@snack-uikit/chips';

import { PersistedFilterState } from '../../../types';
import { isDateString } from './isDateString';

const parseValue = (value: unknown) => {
  if (isDateString(value)) {
    return new Date(value);
  }

  if (typeof value === 'boolean') {
    return String(value);
  }

  return value;
};

const mapFilterFromPayload = <TFilters extends FiltersState = Record<string, unknown>>(
  value?: RequestPayloadParams['filter'],
): TFilters | undefined => {
  if (!value) {
    return undefined;
  }

  return Object.fromEntries(
    value.map(filter => {
      if (Array.isArray(filter.value)) {
        return [filter.field, filter.value.map(parseValue)];
      }

      return [filter.field, parseValue(filter.value)];
    }),
  ) as TFilters;
};

export const defaultParser = <T extends FiltersState>(value: string): PersistedFilterState<T> => {
  const parsed = parseQueryParamsString(value);

  return {
    pagination: parsed?.pagination,
    sorting: parsed?.sort,
    search: parsed?.search?.toString() || '',
    filter: mapFilterFromPayload<T>(parsed?.filter) ?? ({} as T),
  };
};

export const prepareDataForFilter = <T>(filter: Record<string, unknown>): T =>
  Object.entries(filter).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.map(parseValue);
      } else {
        acc[key] = parseValue(value);
      }

      return acc;
    },
    { ...filter },
  ) as T;
