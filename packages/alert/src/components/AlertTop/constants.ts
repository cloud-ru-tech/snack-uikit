import { APPEARANCE } from '../../constants';

const COLOR = {
  InvertNeutral: 'invert-neutral',
  Primary: 'primary',
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
} as const;

export const APPEARANCE_TO_COLOR_MAP_INVERT = {
  [APPEARANCE.Neutral]: COLOR.InvertNeutral,
  [APPEARANCE.Primary]: COLOR.Primary,
  [APPEARANCE.Error]: COLOR.Red,
  [APPEARANCE.Warning]: COLOR.Yellow,
  [APPEARANCE.Success]: COLOR.Green,
} as const;
