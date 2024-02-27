import { RefObject } from 'react';

import {
  AccordionItemProps,
  BaseItemProps,
  isAccordionItemProps,
  isBaseItemProps,
  isGroupItemProps,
  isNextListItemProps,
  ItemProps,
  NextListItemProps,
} from './components/Items';

type WithCollapsedItemsProps = {
  items: ItemProps[];
  openCollapsedItems: Array<number | string>;
};

export function withCollapsedItems({ items, openCollapsedItems }: WithCollapsedItemsProps) {
  let itemRefs: RefObject<HTMLElement>[] = [];
  let newItems: ItemProps[] = [];
  let ids: Array<string | number> = [];
  let expandedIds: Array<string | number> = [];

  items.forEach(item => {
    if (
      ((isBaseItemProps(item) && !item.inactive) || isNextListItemProps(item) || isAccordionItemProps(item)) &&
      !item.disabled
    ) {
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

export function extractItemRefs(items: ItemProps[]): RefObject<HTMLElement>[] {
  return items.reduce((prev: RefObject<HTMLElement>[], item: ItemProps) => {
    if (isGroupItemProps(item)) {
      return prev.concat(extractItemRefs(item.items));
    }
    return item.itemRef ? prev.concat([item.itemRef]) : prev;
  }, [] as RefObject<HTMLElement>[]);
}

/**
 * Функция возвращает массив id дочерних items
 * @function  extractItemIds
 */

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
    .filter(
      item =>
        isAccordionItemProps(item) ||
        isNextListItemProps(item) ||
        isGroupItemProps(item) ||
        (isBaseItemProps(item) && !item.disabled && !item.inactive),
    )
    .reduce(
      (prev: Array<string | number>, item: ItemProps) => {
        if (isAccordionItemProps(item) || isNextListItemProps(item)) {
          return prev.concat([item.id ?? '']).concat(extractChildIds({ items: item.items }));
        }

        if (isGroupItemProps(item)) {
          return prev.concat(extractChildIds({ items: item.items }));
        }

        return item.id && !isGroupItemProps(item) ? prev.concat([item.id]) : prev;
      },
      [] as Array<string | number>,
    );
}

export function extractAllChildIds({ items }: { items: ItemProps[] }): Array<string | number> {
  return items
    .filter(
      item =>
        isAccordionItemProps(item) ||
        isNextListItemProps(item) ||
        isGroupItemProps(item) ||
        (isBaseItemProps(item) && !item.inactive),
    )
    .reduce(
      (prev: Array<string | number>, item: ItemProps) => {
        if (isAccordionItemProps(item) || isNextListItemProps(item)) {
          return prev.concat([item.id ?? '']).concat(extractAllChildIds({ items: item.items }));
        }

        if (isGroupItemProps(item)) {
          return prev.concat(extractAllChildIds({ items: item.items }));
        }

        return item.id && !isGroupItemProps(item) ? prev.concat([item.id]) : prev;
      },
      [] as Array<string | number>,
    );
}

/**
 *  Функция разворачивает массив айтемов в плоский список
 *  @function  flattenItems
 */

export function flattenItems(items: ItemProps[]): (BaseItemProps | AccordionItemProps | NextListItemProps)[] {
  const flattenedItems: (BaseItemProps | AccordionItemProps | NextListItemProps)[] = [];

  function flatten(item: ItemProps) {
    if (!isGroupItemProps(item)) {
      flattenedItems.push(item);
    }

    if ('items' in item) {
      for (const nestedItem of item.items) {
        flatten(nestedItem);
      }
    }
  }

  for (const item of items) {
    flatten(item);
  }

  return flattenedItems;
}
