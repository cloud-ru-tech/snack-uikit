import { Mode } from './constants';
import { ToggleItemState } from './types';

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
