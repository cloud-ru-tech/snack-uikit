import { APPEARANCE } from '../../constants';

export enum Variant {
  LabelOnly = 'label-only',
  IconOnly = 'icon-only',
  IconBefore = 'icon-before',
  IconAfter = 'icon-after',
}

export const APPEARANCE_TO_COLOR_MAP = {
  [APPEARANCE.Neutral]: 'neutral',
  [APPEARANCE.Primary]: 'primary',
  [APPEARANCE.Destructive]: 'red',
};
