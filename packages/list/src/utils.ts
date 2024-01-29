import { RefObject } from 'react';

import {
  isAccordionItemProps,
  isBaseItemProps,
  isGroupItemProps,
  isNextListItemProps,
  ItemProps,
} from './components/Items';

type WithCollapsedItemsProps = {
  items: ItemProps[];
  openCollapsedItems: Array<number | string>;
};

export function withCollapsedItems({ items, openCollapsedItems }: WithCollapsedItemsProps) {
  let itemRefs: RefObject<HTMLButtonElement>[] = [];
  let newItems: ItemProps[] = [];
  let ids: Array<string | number> = [];
  let expandedIds: Array<string | number> = [];

  items.forEach(item => {
    if ((isBaseItemProps(item) || isNextListItemProps(item) || isAccordionItemProps(item)) && !item.disabled) {
      newItems = newItems.concat([item]);
      ids = ids.concat([item.id ?? '']);

      if (item.itemRef) {
        itemRefs = itemRefs.concat([item.itemRef]);
      }
    }

    if (isNextListItemProps(item) && item.id && !item.disabled) {
      expandedIds = expandedIds.concat(item.id);
    }

    if (isGroupItemProps(item)) {
      const { itemRefs: nestedItemsRefs, ids: nestedIds } = withCollapsedItems({
        items: item.items,
        openCollapsedItems,
      });

      ids = ids.concat(nestedIds);

      itemRefs = itemRefs.concat(nestedItemsRefs);
    }

    if (isAccordionItemProps(item) && item.id && openCollapsedItems.includes(item.id)) {
      const {
        itemRefs: nestedItemsRefs,
        ids: nestedIds,
        items: nestedItems,
        expandedIds: nestedExpandedIds,
      } = withCollapsedItems({
        items: item.items,
        openCollapsedItems,
      });

      ids = ids.concat(nestedIds);
      newItems = newItems.concat(nestedItems);
      itemRefs = itemRefs.concat(nestedItemsRefs);
      expandedIds = expandedIds.concat(nestedExpandedIds);
    }
  });

  return { items, itemRefs, ids, expandedIds };
}

export function extractItemRefs(items: ItemProps[]): RefObject<HTMLButtonElement>[] {
  return items.reduce((prev: RefObject<HTMLButtonElement>[], item: ItemProps) => {
    if (isGroupItemProps(item)) {
      return prev.concat(extractItemRefs(item.items));
    }
    return item.itemRef ? prev.concat([item.itemRef]) : prev;
  }, [] as RefObject<HTMLButtonElement>[]);
}

export function extractItemIds(items: ItemProps[]): Array<string | number> {
  return items.reduce(
    (prev: Array<string | number>, item: ItemProps) => {
      if (isGroupItemProps(item)) {
        return prev.concat(extractItemIds(item.items));
      }
      return item.id ? prev.concat([item.id]) : prev;
    },
    [] as Array<string | number>,
  );
}

export function extractChildIds({ items }: { items: ItemProps[] }): Array<string | number> {
  return items
    .filter(item => isGroupItemProps(item) || !item.disabled)
    .reduce(
      (prev: Array<string | number>, item: ItemProps) => {
        if (isAccordionItemProps(item) || isNextListItemProps(item) || isGroupItemProps(item)) {
          return prev.concat([item.id ?? '']).concat(extractChildIds({ items: item.items }));
        }

        return item.id && !isGroupItemProps(item) ? prev.concat([item.id]) : prev;
      },
      [] as Array<string | number>,
    );
}
