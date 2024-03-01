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

export type ChipChoiceMultipleValueFormatterProps = {
  value: FilterOption[];
  total: number;
  allLabel: string;
};

export const defaultMultiValueLabelFormatter = ({
  value,
  total,
  allLabel,
}: ChipChoiceMultipleValueFormatterProps): string => {
  if (value.length === 0 || value.length === total) {
    return allLabel;
  }

  if (value.length === 1) {
    return value[0].label;
  }

  return `${value.length.toString()}/${total}`;
};

export type ChipChoiceSingleValueFormatterProps = {
  value?: FilterOption;
  allLabel?: string;
};

export function defaultSingleValueFormatter({ value, allLabel }: ChipChoiceSingleValueFormatterProps) {
  return value?.label ?? allLabel;
}
