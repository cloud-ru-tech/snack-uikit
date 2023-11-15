import { Size } from './constants';
import { DataAttributes } from './types';

export function getVisualStateAttributes(state: Record<string, string | boolean>) {
  return Object.entries(state).reduce<DataAttributes>(function (result, [name, value]) {
    result[`data-${name.toLowerCase()}`] = value;
    return result;
  }, {});
}

export function getIconSize(size?: Size) {
  switch (size) {
    case Size.S: {
      return 16;
    }
    case Size.M:
    default: {
      return 24;
    }
  }
}
