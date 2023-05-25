import { Mode } from './constants';
import { DataAttributes, ToggleItemState } from './types';

/**
 * Заключается в том чтоб для режима 'radio' оставить один выбранный item, если выбрано несколько
 */
export function normalizeToggleItems<D>(mode: Mode, initial: ToggleItemState<D>[]): ToggleItemState<D>[] {
  if (mode === Mode.Radio) {
    return initial.reduce(
      ({ result, doesNotHaveCheckedItemYet }, item) => {
        if (doesNotHaveCheckedItemYet) {
          return { result: [...result, item], doesNotHaveCheckedItemYet: !item.checked };
        }
        return { result: [...result, { ...item, checked: false }], doesNotHaveCheckedItemYet: false };
      },
      { result: [] as ToggleItemState<D>[], doesNotHaveCheckedItemYet: true },
    ).result;
  }
  return initial;
}

export function getVisualStateAttributes(state: Record<string, string | boolean>) {
  return Object.entries(state).reduce<DataAttributes>(function (result, [name, value]) {
    result[`data-${name.toLowerCase()}`] = value;
    return result;
  }, {});
}
