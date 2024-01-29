import { KeyboardEvent, RefObject, useCallback, useEffect, useState } from 'react';

import { useParentListContext } from '../../Lists/contexts';

type UseKeyboardNavigationProps = {
  ids: Array<number | string>;
  expandedIds: Array<number | string>;
  itemRefs?: RefObject<HTMLButtonElement>[];
  id?: string | number;
};

export function useKeyboardNavigation({ ids, expandedIds, itemRefs, id }: UseKeyboardNavigationProps) {
  const { triggerRef, parentResetNestedIndex, parentIds, parentItemRefs, parentOpenNestedIndex } =
    useParentListContext();

  const [activeFocusIndex, setActiveFocusIndex] = useState<number>(-1);
  const [openNestedIndex, setOpenNestedIndex] = useState<number>(-1);
  const [open, setOpen] = useState<boolean>(false);

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case 'ArrowDown': {
        setActiveFocusIndex(activeIndex => Math.min(activeIndex + 1, ids.length - 1));

        e.stopPropagation();
        e.preventDefault();
        return;
      }
      case 'ArrowUp': {
        setActiveFocusIndex(activeIndex => Math.max(activeIndex - 1, 0));

        e.preventDefault();
        e.stopPropagation();
        return;
      }
      case 'ArrowRight': {
        e.stopPropagation();
        e.preventDefault();

        if (expandedIds.includes(ids[activeFocusIndex])) {
          setOpenNestedIndex(activeFocusIndex);
        }

        return;
      }
      case 'ArrowLeft': {
        parentItemRefs?.[parentOpenNestedIndex].current?.focus();

        parentResetNestedIndex?.();
        setActiveFocusIndex(-1);
        setOpenNestedIndex(-1);

        setOpen(false);

        e.stopPropagation();
        e.preventDefault();
        return;
      }

      case 'Tab': {
        triggerRef?.current?.focus();
        parentResetNestedIndex?.();
        setActiveFocusIndex(-1);
        setOpen(false);
        e.preventDefault();

        return;
      }

      default: {
        break;
      }
    }
  };

  useEffect(() => {
    itemRefs?.[activeFocusIndex]?.current?.focus();
  }, [activeFocusIndex, itemRefs]);

  useEffect(() => {
    if (parentIds[parentOpenNestedIndex] === id && openNestedIndex === -1) {
      setOpen(true);
      setActiveFocusIndex(activeIndex => (activeIndex === -1 ? 0 : activeIndex));
    }
  }, [id, openNestedIndex, parentIds, parentOpenNestedIndex]);

  const resetNestedIndex = () => {
    setActiveFocusIndex(openNestedIndex);
    setOpenNestedIndex(-1);
  };

  const resetActiveFocusIndex = useCallback(() => setActiveFocusIndex(-1), []);

  return {
    activeFocusIndex,
    setActiveFocusIndex,
    openNestedIndex,
    setOpenNestedIndex,
    resetNestedIndex,
    resetActiveFocusIndex,
    handleListKeyDown,
    open,
    setOpen,
  };
}
