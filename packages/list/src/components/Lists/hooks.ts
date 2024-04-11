import { KeyboardEvent, RefObject, useCallback, useRef, useState } from 'react';

import { FocusFlattenItem, ItemId } from '../Items';

type UseNewKeyboardNavigationProps<T extends HTMLElement> = {
  mainRef?: RefObject<T>;
  btnRef?: RefObject<HTMLButtonElement>;
  focusFlattenItems: Record<string, FocusFlattenItem>;
};

export function useNewKeyboardNavigation<T extends HTMLElement>({
  mainRef,
  btnRef,
  focusFlattenItems,
}: UseNewKeyboardNavigationProps<T>) {
  const [activeItemId, setActiveItemId] = useState<ItemId | undefined>();

  const activeItemIdRef = useRef<ItemId | undefined>();

  const handleListKeyDownFactory = useCallback(
    (ids: ItemId[], expandedIds: ItemId[]) => (e: KeyboardEvent<T>) => {
      switch (e.key) {
        case 'ArrowDown': {
          if (activeItemIdRef.current !== undefined) {
            const activeIndex = ids.findIndex(id => id === activeItemIdRef.current);

            const nextId = Math.min(activeIndex + 1, ids.length - 1);
            const itemId = ids[nextId];
            const item = focusFlattenItems[itemId];

            activeItemIdRef.current = itemId;
            setActiveItemId(itemId);

            if (item.type !== 'group') {
              item.itemRef?.current?.focus();
            }
          } else {
            const itemId = ids[0];
            const item = focusFlattenItems[itemId];

            activeItemIdRef.current = itemId;
            setActiveItemId(itemId);

            if (item.type !== 'group') {
              item.itemRef?.current?.focus();
            }
          }

          e.stopPropagation();
          e.preventDefault();
          return;
        }
        case 'ArrowUp': {
          if (ids[0] === activeItemIdRef.current) {
            const item = focusFlattenItems[ids[0]];

            if (item.parentId === '~main') {
              activeItemIdRef.current = undefined;
              setActiveItemId(undefined);
              mainRef?.current?.focus();
            }
            return;
          }

          if (activeItemIdRef.current !== undefined) {
            const activeIndex = ids.findIndex(id => id === activeItemIdRef.current);
            const nextId = Math.max(activeIndex - 1, 0);
            const itemId = ids[nextId];
            const item = focusFlattenItems[itemId];

            activeItemIdRef.current = itemId;
            setActiveItemId(itemId);

            if (item.type !== 'group') {
              item.itemRef?.current?.focus();
            }
          }

          e.stopPropagation();
          e.preventDefault();
          return;
        }

        case 'ArrowRight': {
          if (activeItemIdRef.current !== undefined && expandedIds.includes(activeItemIdRef.current)) {
            const item = focusFlattenItems[activeItemIdRef.current];

            const newItemId = item.items[0];
            const newItem = focusFlattenItems[newItemId];

            activeItemIdRef.current = newItemId;
            setActiveItemId(newItemId);

            setTimeout(() => newItem.itemRef?.current?.focus(), 0);
          }

          e.stopPropagation();
          e.preventDefault();

          return;
        }

        case 'Tab': {
          if (activeItemIdRef.current !== undefined) {
            e.preventDefault();
            e.stopPropagation();

            activeItemIdRef.current = undefined;
            setActiveItemId(undefined);
            mainRef?.current?.focus();
          } else {
            btnRef && !e.shiftKey ? btnRef?.current?.focus() : mainRef?.current?.focus();
          }

          return;
        }
        default: {
          return;
        }
      }
    },
    [focusFlattenItems, mainRef, btnRef],
  );

  const resetActiveItemId = useCallback(() => {
    setActiveItemId(undefined);
    activeItemIdRef.current = undefined;
  }, []);

  const forceUpdateActiveItemId = useCallback(
    (itemId: ItemId) => {
      setActiveItemId(itemId);
      activeItemIdRef.current = itemId;

      const item = focusFlattenItems[itemId];

      item?.itemRef?.current?.focus();
    },
    [focusFlattenItems],
  );

  return {
    resetActiveItemId,
    activeItemId,
    forceUpdateActiveItemId,
    handleListKeyDownFactory,
  };
}
