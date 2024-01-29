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

export function getSlicedItems(
  items: ItemProps[],
  search: boolean,
  pinTop: number,
  pinBottom: number,
  footerActiveElementsRefs: number,
) {
  const searchShift = search ? 1 : 0;

  return {
    pinTop: items.slice(searchShift, pinTop + searchShift),
    items: items.slice(pinTop + searchShift, items.length - pinBottom - footerActiveElementsRefs),
    pinBottom: items.slice(
      items.length - pinBottom - footerActiveElementsRefs,
      items.length - footerActiveElementsRefs,
    ),
  };
}
