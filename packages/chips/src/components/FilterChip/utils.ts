import { SelectionMode } from './constants';
import { FilterOption } from './types';

export const normalizeValue = (
  selectionMode: SelectionMode,
  options: FilterOption[],
  value?: string | string[],
): string[] | undefined => {
  if (!value) {
    return undefined;
  }

  const arrayValue = Array.isArray(value) ? value : [value];

  const possibleValue = arrayValue.filter(value => value && options.some(option => value === option.value));

  if (possibleValue.length === 0 && selectionMode === SelectionMode.Single) {
    return undefined;
  }

  return possibleValue;
};

export const fallbackValue = (selectionMode: SelectionMode, options: FilterOption[], value: string[]) => {
  if (selectionMode !== SelectionMode.Single) return value;

  if (value.length === 0) {
    return [options[0].value];
  }

  return value;
};

export const defaultMultiValueLabelFormatter = (value: FilterOption[]): string => value.length.toString();
