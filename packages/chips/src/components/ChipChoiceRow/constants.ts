import { ButtonFunction } from '@snack-uikit/button';

import { ChipChoice } from '../ChipChoice';

export enum Size {
  Xs = 'xs',
  S = 's',
  M = 'm',
}

export const MAP_ROW_SIZE_TO_CHOICE_SIZE = {
  [Size.Xs]: ChipChoice.sizes.Xs,
  [Size.S]: ChipChoice.sizes.S,
  [Size.M]: ChipChoice.sizes.M,
};

export const MAP_ROW_SIZE_TO_BUTTON_SIZE = {
  [Size.Xs]: ButtonFunction.sizes.Xs,
  [Size.S]: ButtonFunction.sizes.S,
  [Size.M]: ButtonFunction.sizes.M,
};
