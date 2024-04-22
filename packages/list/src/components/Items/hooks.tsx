import { createRef, RefObject, useMemo } from 'react';

import { useNewListContext, useSelectionContext } from '../Lists/contexts';
import { AccordionItem } from './AccordionItem';
import { BaseItem } from './BaseItem';
import { GroupItem } from './GroupItem';
import { GroupSelectItem } from './GroupSelectItem';
import { NextListItem } from './NextListItem';
import {
  Flatten,
  FlattenAccordionItem,
  FlattenBaseItem,
  FlattenGroupSelectListItem,
  FlattenNextListItem,
  ItemId,
} from './types';
import { isAccordionItem, isGroupItem, isGroupSelectItem, isNextListItem } from './utils';

export function useRenderItems(focusCloseChildIds?: ItemId[]) {
  const { focusFlattenItems, flattenItems } = useNewListContext();
  const { isSelectionMultiple } = useSelectionContext();

  return useMemo(() => {
    if (!focusCloseChildIds) {
      return [null];
    }

    return focusCloseChildIds.map(id => {
      const { itemRef, key, originalId, items } = focusFlattenItems[id];

      const flattenItem = flattenItems[originalId];

      if (
        isGroupItem(flattenItem) ||
        (!isSelectionMultiple && isGroupSelectItem<FlattenGroupSelectListItem>(flattenItem))
      ) {
        return <GroupItem {...flattenItem} items={items} key={key} />;
      }
      if (isGroupSelectItem<FlattenGroupSelectListItem>(flattenItem)) {
        return <GroupSelectItem {...flattenItem} items={items} itemRef={itemRef} key={key} />;
      }
      if (isAccordionItem<FlattenAccordionItem>(flattenItem)) {
        return <AccordionItem {...flattenItem} items={items} itemRef={itemRef} key={key} />;
      }
      if (isNextListItem<FlattenNextListItem>(flattenItem)) {
        return <NextListItem {...flattenItem} focusId={id} items={items} itemRef={itemRef} key={key} />;
      }

      return <BaseItem {...flattenItem} itemRef={itemRef} key={key} />;
    });
  }, [flattenItems, focusCloseChildIds, focusFlattenItems, isSelectionMultiple]);
}

type UseCreateBaseItemsProps = {
  search?: boolean;
  footerActiveElementsRefs?: RefObject<HTMLElement>[];
};

export function useCreateBaseItems({ footerActiveElementsRefs }: UseCreateBaseItemsProps): {
  searchItem: Flatten<FlattenBaseItem, 'itemRef'>;
  footerItems: Flatten<FlattenBaseItem, 'itemRef'>[];
} {
  return useMemo(
    () => ({
      searchItem: {
        itemRef: createRef<HTMLInputElement>(),
        id: '~search',
        parentId: '~main',
        items: [],
        allChildIds: [],
      },
      footerItems:
        footerActiveElementsRefs?.map((itemRef, idx) => ({
          id: `~footer__${idx}`,
          itemRef,
          parentId: '~main',
          items: [],
          allChildIds: [],
        })) ?? [],
    }),
    [footerActiveElementsRefs],
  );
}

type UseGroupItemSelectionProps = {
  allChildIds: ItemId[];
  items: ItemId[];
  id: ItemId;
  disabled?: boolean;
};

export function useGroupItemSelection({ id, allChildIds }: UseGroupItemSelectionProps) {
  const { value, setValue, isSelectionMultiple } = useSelectionContext();
  const { flattenItems } = useNewListContext();

  const baseChildIds = useMemo(
    () =>
      allChildIds.filter(itemId => {
        const item = flattenItems[itemId];

        return item && !('type' in item);
      }),
    [allChildIds, flattenItems],
  );

  const checked = isSelectionMultiple
    ? value && Boolean(value.length) && baseChildIds.every(childId => value?.includes(childId))
    : undefined;

  const indeterminate = isSelectionMultiple
    ? !checked && baseChildIds.some(childId => value?.includes(childId))
    : baseChildIds.includes(value ?? '');

  const handleOnSelect = () => {
    if (checked) {
      setValue?.((value: ItemId[]) => (value ?? []).filter(itemId => itemId !== id && !baseChildIds.includes(itemId)));
      return;
    }

    setValue?.((value: ItemId[]) => Array.from(new Set([...(value ?? []), ...baseChildIds])));
  };

  return { checked, indeterminate, handleOnSelect };
}
