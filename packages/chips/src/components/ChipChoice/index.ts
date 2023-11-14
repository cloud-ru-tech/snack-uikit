import { Droplist } from '@snack-ui/droplist';

import { Size, Variant } from '../../constants';
import {
  ChipChoiceCustom,
  ChipChoiceCustomProps,
  ChipChoiceDate,
  ChipChoiceDateProps,
  ChipChoiceDateRange,
  ChipChoiceDateRangeProps,
  ChipChoiceMulti,
  ChipChoiceMultiProps,
  ChipChoiceSingle,
  ChipChoiceSingleProps,
} from './components';

export type { FilterOption } from './types';

export type {
  ChipChoiceCustomProps,
  ChipChoiceMultiProps,
  ChipChoiceSingleProps,
  ChipChoiceDateProps,
  ChipChoiceDateRangeProps,
};

export namespace ChipChoice {
  export const Custom = ChipChoiceCustom;
  export const Single = ChipChoiceSingle;
  export const Multi = ChipChoiceMulti;
  export const Date = ChipChoiceDate;
  export const DateRange = ChipChoiceDateRange;
  export const sizes = Size;
  export const variants = Variant;
  export const placements = Droplist.placements;
}
