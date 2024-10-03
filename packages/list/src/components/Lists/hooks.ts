import { KeyboardEvent, RefObject, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { ITEM_PREFIXES } from '../../constants';
import { FocusFlattenItem, ItemId } from '../Items';

type UseNewKeyboardNavigationProps<T extends HTMLElement> = {
  mainRef?: RefObject<T>;
  btnRef?: RefObject<HTMLButtonElement>;
  focusFlattenItems: Record<string, FocusFlattenItem>;
  keyboardNavigationRef?: RefObject<{ focusItem(item: ItemId): void }>;
  hasListInFocusChain: boolean;
  firstItemId: ItemId;
};

export function useNewKeyboardNavigation<T extends HTMLElement>({
  mainRef,
  btnRef,
  focusFlattenItems,
  keyboardNavigationRef,
  hasListInFocusChain,
  firstItemId,
}: UseNewKeyboardNavigationProps<T>) {
  const defaultActiveItemId = hasListInFocusChain ? undefined : firstItemId;
  const [activeItemId, setActiveItemId] = useState<ItemId | undefined>(() => defaultActiveItemId);
  const activeItemIdRef = useRef<ItemId | undefined>(defaultActiveItemId);

  const resetActiveItemId = useCallback(() => {
    setActiveItemId(defaultActiveItemId);
    activeItemIdRef.current = defaultActiveItemId;
  }, [defaultActiveItemId]);

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
            if (hasListInFocusChain) {
              const item = focusFlattenItems[ids[0]];

              if (item.parentId === ITEM_PREFIXES.default) {
                activeItemIdRef.current = undefined;
                setActiveItemId(undefined);
                mainRef?.current?.focus();
              }
            }
          } else if (activeItemIdRef.current !== undefined) {
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

            e.stopPropagation();
            e.preventDefault();
          }

          return;
        }

        case 'Tab': {
          if (activeItemIdRef.current !== undefined) {
            if (hasListInFocusChain) {
              e.preventDefault();
              e.stopPropagation();

              activeItemIdRef.current = undefined;
              setActiveItemId(undefined);
              mainRef?.current?.focus();
            } else {
              resetActiveItemId();
            }
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
    [focusFlattenItems, hasListInFocusChain, mainRef, resetActiveItemId, btnRef],
  );

  const forceUpdateActiveItemId = useCallback(
    (itemId: ItemId) => {
      setActiveItemId(itemId);
      activeItemIdRef.current = itemId;

      const item = focusFlattenItems[itemId];

      item?.itemRef?.current?.focus();
    },
    [focusFlattenItems],
  );

  useImperativeHandle(keyboardNavigationRef, () => ({ focusItem: forceUpdateActiveItemId }), [forceUpdateActiveItemId]);

  return {
    resetActiveItemId,
    activeItemId,
    forceUpdateActiveItemId,
    handleListKeyDownFactory,
  };
}
