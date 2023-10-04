import { Appearance } from '../../constants';

export enum Variant {
  LabelOnly = 'label-only',
  IconOnly = 'icon-only',
  IconBefore = 'icon-before',
  IconAfter = 'icon-after',
}

export enum PrivateSize {
  Xs = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
}

export const APPEARANCE_TO_COLOR_MAP = {
  [Appearance.Neutral]: 'neutral',
  [Appearance.Primary]: 'primary',
  [Appearance.Destructive]: 'red',
};
