import { InterpolationObject } from '../types';

export function interpolateTranslation(text: string, interpolation?: InterpolationObject) {
  if (!interpolation || Object.keys(interpolation).length === 0) {
    return text;
  }

  return text.replace(/{{(.*?)}}/g, (match, p1) => {
    const value = interpolation[p1];
    return value !== undefined && value !== '' ? String(value) : match;
  });
}
