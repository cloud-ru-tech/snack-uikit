import { SIZE } from './constants';
import { DataAttributes, Size } from './types';

export function getVisualStateAttributes(state: Record<string, string | boolean>) {
  return Object.entries(state).reduce<DataAttributes>(function (result, [name, value]) {
    result[`data-${name.toLowerCase()}`] = value;
    return result;
  }, {});
}

export function getIconSize(size?: Size) {
  switch (size) {
    case SIZE.S: {
      return 16;
    }
    case SIZE.M:
    default: {
      return 24;
    }
  }
}
