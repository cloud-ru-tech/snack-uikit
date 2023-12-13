import { ButtonFunctionProps } from '@snack-uikit/button';

import { SIZE } from '../../constants';

export const CHIP_CHOICE_ROW_SIZE = {
  Xs: 'xs',
  S: 's',
  M: 'm',
} as const;

export const MAP_ROW_SIZE_TO_CHOICE_SIZE = {
  [CHIP_CHOICE_ROW_SIZE.Xs]: SIZE.Xs,
  [CHIP_CHOICE_ROW_SIZE.S]: SIZE.S,
  [CHIP_CHOICE_ROW_SIZE.M]: SIZE.M,
};

export const MAP_ROW_SIZE_TO_BUTTON_SIZE: Record<string, ButtonFunctionProps['size']> = {
  [CHIP_CHOICE_ROW_SIZE.Xs]: 'xs',
  [CHIP_CHOICE_ROW_SIZE.S]: 's',
  [CHIP_CHOICE_ROW_SIZE.M]: 'm',
};
