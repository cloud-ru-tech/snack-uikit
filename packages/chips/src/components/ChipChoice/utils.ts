import { FilterOption } from './types';

export const normalizeValueForMultiChoice = (options: FilterOption[], value?: string[]): string[] | undefined => {
  if (!value) {
    return undefined;
  }

  return value.filter(val => options.some(option => val === option.value));
};

export const normalizeValueForSingleChoice = (options: FilterOption[], value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  return options.find(option => value === option.value)?.value;
};

export const defaultMultiValueLabelFormatter = (value: FilterOption[], total: number): string =>
  `${value.length.toString()}/${total}`;
