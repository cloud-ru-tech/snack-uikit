import { createRef, RefObject, useMemo } from 'react';

import { AccordionItem } from './AccordionItem';
import { BaseItem } from './BaseItem';
import { GroupItem } from './GroupItem';
import { NextListItem } from './NextListItem';
import { ItemProps } from './types';
import { isAccordionItemProps, isGroupItemProps, isNextListItemProps } from './utils';

export function useRenderItems(items: ItemProps[]) {
  return useMemo(
    () =>
      items.map((item, idx) => {
        if (isGroupItemProps(item)) {
          return <GroupItem {...item} key={item.id} />;
        }

        if (isAccordionItemProps(item)) {
          return <AccordionItem {...item} key={idx} />;
        }

        if (isNextListItemProps(item)) {
          return <NextListItem {...item} key={item.id} />;
        }

        return <BaseItem {...item} key={item.id} />;
      }),
    [items],
  );
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

export type UseItemsWithIdsProps = {
  search?: boolean;
  footerActiveElementsRefs?: RefObject<HTMLElement>[];
};

export function useItemsWithIds({ search, footerActiveElementsRefs }: UseItemsWithIdsProps) {
  return useMemo(
    () => ({
      search: addItemsIds(
        search ? ([{ itemRef: createRef<HTMLInputElement>() }] as unknown as ItemProps[]) : [],
        'search',
      ),
      footerRefs: addItemsIds(
        footerActiveElementsRefs
          ? (footerActiveElementsRefs?.map(ref => ({ itemRef: ref })) as unknown as ItemProps[])
          : [],
        'footer',
      ),
    }),

    [footerActiveElementsRefs, search],
  );
}
