import { KeyboardEvent, RefObject, useEffect, useState } from 'react';

export type UseKeyboardNavigationProps<T extends HTMLElement> = {
  ids: Array<number | string>;
  expandedIds: Array<number | string>;
  parentRef?: RefObject<T>;
  btnRef?: RefObject<HTMLButtonElement>;
  itemRefs?: RefObject<HTMLButtonElement>[];
};

export function useKeyboardNavigation<T extends HTMLElement>({
  ids,
  itemRefs,
  expandedIds,
  parentRef,
  btnRef,
}: UseKeyboardNavigationProps<T>) {
  const [activeFocusIndex, setActiveFocusIndex] = useState<number>(-1);
  const [openNestedIndex, setOpenNestedIndex] = useState<number>(-1);

  const handleListKeyDown = (e: KeyboardEvent<T>) => {
    switch (e.key) {
      case 'ArrowDown': {
        setActiveFocusIndex(activeIndex => Math.min(activeIndex + 1, ids.length - 1));

        // go to loader from last item
        // if (activeFocusIndex === ids.length - 2) {
        //   return;
        // }

        e.stopPropagation();
        e.preventDefault();
        return;
      }
      case 'ArrowUp': {
        if (activeFocusIndex === 0) {
          parentRef?.current?.focus();
          setActiveFocusIndex(-1);
          return;
        }

        setActiveFocusIndex(activeIndex => Math.max(activeIndex - 1, 0));

        e.stopPropagation();
        e.preventDefault();
        return;
      }
      case 'ArrowRight': {
        if (expandedIds.includes(ids[activeFocusIndex])) {
          setOpenNestedIndex(activeFocusIndex);
        }

        e.stopPropagation();
        e.preventDefault();

        return;
      }
      case 'Tab': {
        if (parentRef && activeFocusIndex !== -1) {
          e.preventDefault();

          parentRef?.current?.focus();
        } else if (activeFocusIndex === -1) {
          btnRef && !e.shiftKey ? btnRef?.current?.focus() : parentRef?.current?.focus();
        }

        setOpenNestedIndex(-1);
        setActiveFocusIndex(-1);

        return;
      }
      default: {
        return;
      }
    }
  };

  const resetNestedIndex = () => {
    setActiveFocusIndex(openNestedIndex);
    setOpenNestedIndex(-1);
  };

  const resetActiveFocusIndex = () => {
    setActiveFocusIndex(-1);
  };

  useEffect(() => {
    activeFocusIndex !== -1 && openNestedIndex === -1 && itemRefs?.[activeFocusIndex]?.current?.focus();
  }, [activeFocusIndex, itemRefs, openNestedIndex]);

  return {
    activeFocusIndex,
    setActiveFocusIndex,
    openNestedIndex,
    resetNestedIndex,
    resetActiveFocusIndex,
    handleListKeyDown,
  };
}
