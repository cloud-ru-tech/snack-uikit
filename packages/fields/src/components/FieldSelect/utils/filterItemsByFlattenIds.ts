import { GroupItemProps, ItemId, ItemProps } from '@snack-uikit/list';

import { ItemWithId } from '../types';

const isItemWithId = (item: ItemProps): item is ItemWithId => (item as ItemWithId).id !== undefined;

const isGroupItem = (item: ItemProps): item is GroupItemProps => (item as GroupItemProps).type === 'group';

export function filterItemsByFlattenIds(items: ItemProps[], ids: ItemId[]) {
  const filteredItems: ItemProps[] = [];
  items.forEach(item => {
    if (isItemWithId(item) && item.id && ids.includes(item.id)) {
      filteredItems.push(item);
      return;
    }
    if (isGroupItem(item)) {
      const filteredSubItems = filterItemsByFlattenIds(item.items, ids);
      filteredItems.push({ ...item, items: filteredSubItems });
      return;
    }
  });
  return filteredItems;
}
