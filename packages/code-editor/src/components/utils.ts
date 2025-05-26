import chroma from 'chroma-js';
import { SchemasSettings } from 'monaco-yaml';

import { DEFAULT_SCHEMA_URI } from './constants';
import { JsonSchema } from './types';

export function rgb2hsl(HTMLcolor: string) {
  const [r, g, b] = chroma.valid(HTMLcolor)
    ? chroma(HTMLcolor)
        .rgb()
        .map(c => c / 255)
    : [0, 0, 0];

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  let h, s;

  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }

    h /= 6;
  }

  return [h, s, l]; // H - цветовой тон, S - насыщенность, L - светлота
}

export function isDark(color: string) {
  const [h, _, l] = rgb2hsl(color);

  return (h < 0.55 && l >= 0.5) || (h >= 0.55 && l >= 0.75);
}

export const getJsonSchema = (jsonSchema?: JsonSchema): SchemasSettings | undefined =>
  jsonSchema && { ...jsonSchema, uri: jsonSchema?.uri || DEFAULT_SCHEMA_URI, fileMatch: [jsonSchema.fileMatch] };

export function uppercaseFirstLetter(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return value;
  }

  return trimmedValue[0].toUpperCase() + trimmedValue.slice(1);
}
