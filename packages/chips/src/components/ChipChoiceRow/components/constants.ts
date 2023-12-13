import { ChipChoice } from '../../ChipChoice';
import { CHIP_CHOICE_TYPE } from '../../ChipChoice/constants';

export const MAP_CHIP_TYPE_TO_COMPONENT = {
  [CHIP_CHOICE_TYPE.Single]: ChipChoice.Single,
  [CHIP_CHOICE_TYPE.Multi]: ChipChoice.Multi,
  [CHIP_CHOICE_TYPE.Date]: ChipChoice.Date,
  [CHIP_CHOICE_TYPE.DateRange]: ChipChoice.DateRange,
};
