import { ValueOf } from '@snack-uikit/utils';

export const COLOR_MODE = {
  Hex: 'hex',
  Rbg: 'rbg',
  Hsv: 'hsv',
};

export const COLOR_MODE_OPTIONS = [
  {
    value: COLOR_MODE.Hex,
    label: 'HEX',
  },
  {
    value: COLOR_MODE.Hsv,
    label: 'HSV',
  },
  {
    value: COLOR_MODE.Rbg,
    label: 'RGB',
  },
];

export const COLOR_MODE_LABEL = {
  [COLOR_MODE.Hex]: 'HEX',
  [COLOR_MODE.Rbg]: 'RGB',
  [COLOR_MODE.Hsv]: 'HSV',
};

export const DEFAULT_COLOR_MODE_CONFIG = {
  [COLOR_MODE.Hex]: true,
  [COLOR_MODE.Rbg]: true,
  [COLOR_MODE.Hsv]: true,
};

export type ColorMode = ValueOf<typeof COLOR_MODE>;

export const RGBA_REGEX =
  /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;

export const HSVA_REGEX =
  /hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;

export const HSLA_REGEX =
  /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
