import { createRef } from 'react';

import { AccordionItemProps, BaseItemProps, GroupItemProps, ItemProps, NextListItemProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBaseItemProps(item: any): item is BaseItemProps {
  return 'content' in item;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAccordionItemProps(item: any): item is AccordionItemProps {
  return 'items' in item && item['type'] === 'collapse';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNextListItemProps(item: any): item is NextListItemProps {
  return 'items' in item && item['type'] === 'next-list';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isGroupItemProps(item: any): item is GroupItemProps {
  return 'items' in item && item['type'] === undefined;
}

export function getSlicedItems({
  items,
  hasSearch,
  pinTop,
  pinBottom,
  footerRefs,
}: {
  items: ItemProps[];
  hasSearch: boolean;
  footerRefs: ItemProps[];
  pinTop?: ItemProps[];
  pinBottom?: ItemProps[];
}) {
  const searchShift = hasSearch ? 1 : 0;
  const pinTopNumber = pinTop?.length ?? 0;
  const pinBottomNumber = pinBottom?.length ?? 0;
  const footerElementsNumber = footerRefs?.length ?? 0;

  return {
    pinTop: items.slice(searchShift, pinTopNumber + searchShift),
    items: items.slice(pinTopNumber + searchShift, items.length - pinBottomNumber - footerElementsNumber),
    pinBottom: items.slice(items.length - pinBottomNumber - footerElementsNumber, items.length - footerElementsNumber),
  };
}

export function addItemsIds(itemsProp: ItemProps[], prefix?: string | number): ItemProps[] {
  return itemsProp.map((item, idx) => {
    const itemId = item.id ?? (prefix !== undefined ? [prefix, idx].join('-') : String(idx));

    if (isGroupItemProps(item)) {
      return { ...item, id: itemId, items: addItemsIds(item.items, itemId) };
    }

    if (isAccordionItemProps(item) || isNextListItemProps(item)) {
      return {
        ...item,
        id: itemId,
        items: addItemsIds(item.items, itemId),
        itemRef: item.itemRef || createRef<HTMLButtonElement>(),
      };
    }

    return { ...item, id: itemId, itemRef: item.itemRef || createRef<HTMLButtonElement>() };
  });
}
