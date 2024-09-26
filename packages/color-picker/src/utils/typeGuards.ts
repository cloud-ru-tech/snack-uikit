import { HSLA_REGEX, HSVA_REGEX, RGBA_REGEX } from '../constants';
import { Color, HslaColor, HslColor, HsvaColor, HsvColor, RgbaColor, RgbColor } from '../types';

export function isRbgColor(value: Color): value is RgbColor {
  return typeof value === 'object' && 'r' in value && 'g' in value && 'b' in value;
}

export function isRgbaColor(value: Color): value is RgbaColor {
  return typeof value === 'object' && isRbgColor(value) && 'a' in value;
}

export function isHslColor(value: Color): value is HslColor {
  return typeof value === 'object' && 'h' in value && 's' in value && 'l' in value;
}

export function isHslaColor(value: Color): value is HslaColor {
  return typeof value === 'object' && isHslColor(value) && 'a' in value;
}

export function isHsvColor(value: Color): value is HsvColor {
  return typeof value === 'object' && 'h' in value && 's' in value && 'v' in value;
}

export function isHsvaColor(value: Color): value is HsvaColor {
  return typeof value === 'object' && isHsvColor(value) && 'a' in value;
}

export function isHslaString(value: string) {
  const matcher = HSLA_REGEX;
  const match = matcher.exec(value);

  return Boolean(match);
}

export function isHsvaString(value: string) {
  const matcher = HSVA_REGEX;
  const match = matcher.exec(value);

  return Boolean(match);
}

export function isRbgaString(value: string) {
  const matcher = RGBA_REGEX;
  const match = matcher.exec(value);

  return Boolean(match);
}
