import { KeyboardEventHandler, useCallback, useMemo, useState } from 'react';

import { IdType, Segment } from './types';

type useFocusControlParams = {
  items: Segment[];
  selected?: IdType;
};

export function useFocusControl({ selected, items }: useFocusControlParams) {
  const [focusableSegmentValue, setFocusableSegmentValue] = useState(selected);
  const [_, setNeedSetFocus] = useState(false);
  const { prev, next } = useMemo(
    () =>
      items.reduce(
        (res, item) => {
          if (res._isNextSearching && !res.next) {
            res.next = item.disabled ? res.next : item.value;
          }

          if (focusableSegmentValue === item.value) {
            res._isNextSearching = true;
          }

          if (!res._isNextSearching) {
            res.prev = item.disabled ? res.prev : item.value;
          }

          return res;
        },
        { _isNextSearching: false } as { prev?: IdType; next?: IdType; _isNextSearching: boolean },
      ),
    [focusableSegmentValue, items],
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    e => {
      switch (e.key) {
        case 'ArrowLeft': {
          if (prev) {
            setNeedSetFocus(true);
            setFocusableSegmentValue(prev);
          }
          return;
        }
        case 'ArrowRight': {
          if (next) {
            setNeedSetFocus(true);
            setFocusableSegmentValue(next);
          }
          return;
        }
        default: {
          return;
        }
      }
    },
    [next, prev],
  );

  const onGetFocusable = useCallback((ref: HTMLButtonElement | null) => {
    setNeedSetFocus(needSetFocus => {
      if (needSetFocus) {
        ref?.focus();
      }

      return false;
    });
  }, []);

  return { onKeyDown, focusableSegmentValue, onGetFocusable };
}
