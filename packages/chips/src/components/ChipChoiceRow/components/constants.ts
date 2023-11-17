import { ChipChoice } from '../../ChipChoice';

export const MAP_CHIP_TYPE_TO_COMPONENT = {
  [ChipChoice.types.Single]: ChipChoice.Single,
  [ChipChoice.types.Multi]: ChipChoice.Multi,
  [ChipChoice.types.Date]: ChipChoice.Date,
  [ChipChoice.types.DateRange]: ChipChoice.DateRange,
};
