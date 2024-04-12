import {
  ChipChoiceCustom,
  ChipChoiceCustomProps,
  ChipChoiceDate,
  ChipChoiceDateProps,
  ChipChoiceDateRange,
  ChipChoiceDateRangeProps,
  ChipChoiceMultiple,
  ChipChoiceSingle,
  CustomContentRenderProps,
} from './components';

export type { FilterOption, ChipChoiceMultipleProps, ChipChoiceSingleProps } from './types';
export type { ChipChoiceCustomProps, ChipChoiceDateProps, ChipChoiceDateRangeProps, CustomContentRenderProps };

export namespace ChipChoice {
  export const Custom = ChipChoiceCustom;
  export const Single = ChipChoiceSingle;
  export const Multiple = ChipChoiceMultiple;
  export const Date = ChipChoiceDate;
  export const DateRange = ChipChoiceDateRange;
}

export { isAccordionOption, isBaseOption, isGroupOption, isGroupSelectOption, isNextListOption } from './utils';
