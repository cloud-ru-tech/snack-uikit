import { RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';
import { ChipChoiceRowProps } from '@snack-uikit/chips';

export const validatePaging = (value: unknown): value is RequestPayloadParams['pagination'] => {
  if (!value) {
    return true;
  }

  if (typeof value !== 'object') {
    return false;
  }

  return 'limit' in value && typeof value.limit === 'number' && 'offset' in value && typeof value.offset === 'number';
};

export const validateSorting = (value: unknown): value is RequestPayloadParams['ordering'] =>
  !value ||
  (value as NonNullable<RequestPayloadParams['ordering']>).every(
    column => typeof column?.field === 'string' && typeof column?.direction === 'string',
  );

export const validateFilter = <TFilters extends Record<string, unknown>>(
  value: unknown,
  filterSettings: ChipChoiceRowProps<TFilters>['filters'],
): value is TFilters =>
  typeof value === 'object' &&
  value !== null &&
  Object.keys(value).every(field => Boolean(filterSettings.find(setting => setting.id === field)));
