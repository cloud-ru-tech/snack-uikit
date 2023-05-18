import { useEffect, useMemo, useState } from 'react';

import { Mode } from '../constants';
import { ToggleItem, ToggleItemState } from '../types';
import { normalizeToggleItems } from '../utils';

export function useToggleGroup<D>(mode: Mode, items: ToggleItemState<D>[]): ToggleItem<D>[] {
  const [rawItems, setRawItems] = useState<ToggleItemState<D>[]>(() => normalizeToggleItems<D>(mode, items));

  useEffect(() => {
    setRawItems(state => normalizeToggleItems<D>(mode, state));
  }, [mode]);

  return useMemo(
    () =>
      rawItems.map((item, currentItem) => ({
        ...item,
        setChecked(checked: boolean) {
          setRawItems(prevState =>
            prevState.map((item, index) => {
              if (index === currentItem) {
                return { ...item, checked };
              }

              if (mode === Mode.Radio) {
                return { ...item, checked: false };
              }

              return { ...item };
            }),
          );
        },
      })),
    [rawItems, mode],
  );
}

useToggleGroup.modes = Mode;
