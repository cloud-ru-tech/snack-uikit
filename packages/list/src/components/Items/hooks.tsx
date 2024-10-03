import { createRef, RefObject, useMemo } from 'react';

import { ITEM_PREFIXES } from '../../constants';
import { getFooterItemId } from '../../utils';
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
        id: ITEM_PREFIXES.search,
        parentId: ITEM_PREFIXES.default,
        items: [],
        allChildIds: [],
      },
      footerItems:
        footerActiveElementsRefs?.map((itemRef, idx) => ({
          id: getFooterItemId(idx),
          itemRef,
          parentId: ITEM_PREFIXES.default,
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

  const enableChildIds = useMemo(
    () =>
      baseChildIds.filter(itemId => {
        const item = flattenItems[itemId];

        return item && !('type' in item) && !item.disabled;
      }),
    [baseChildIds, flattenItems],
  );

  const checked = isSelectionMultiple
    ? value && Boolean(value.length) && baseChildIds.every(childId => value?.includes(childId))
    : undefined;

  const allEnabledChecked = isSelectionMultiple
    ? value && Boolean(value.length) && enableChildIds.every(childId => value?.includes(childId))
    : undefined;

  const indeterminate = isSelectionMultiple
    ? !checked && baseChildIds.some(childId => value?.includes(childId))
    : baseChildIds.includes(value ?? '');

  const handleOnSelect = () => {
    if (checked || allEnabledChecked) {
      setValue?.((value: ItemId[]) =>
        (value ?? []).filter(itemId => itemId !== id && !enableChildIds.includes(itemId)),
      );
      return;
    }

    setValue?.((value: ItemId[]) => Array.from(new Set([...(value ?? []), ...enableChildIds])));
  };

  return { checked, indeterminate, handleOnSelect };
}
