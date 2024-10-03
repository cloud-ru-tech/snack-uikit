import { createRef } from 'react';

import { ITEM_PREFIXES } from '../../constants';
import { ItemContentProps } from '../../helperComponents';
import { getItemAutoId } from '../../utils';
import {
  AccordionItem,
  AnyType,
  BaseItem,
  FlattenItem,
  FocusFlattenItem,
  GroupItem,
  GroupSelectItem,
  Item,
  ItemId,
  NextListItem,
} from './types';

export function isBaseItem<ReturnType = BaseItem>(item: AnyType): item is ReturnType {
  return item && !('items' in item);
}
export function isAccordionItem<ReturnType = AccordionItem>(item: AnyType): item is ReturnType {
  return item && 'items' in item && item['type'] === 'collapse';
}
export function isNextListItem<ReturnType = NextListItem>(item: AnyType): item is ReturnType {
  return item && 'items' in item && item['type'] === 'next-list';
}
export function isGroupItem<ReturnType = GroupItem>(item: AnyType): item is ReturnType {
  return item && 'items' in item && item['type'] === 'group';
}
export function isGroupSelectItem<ReturnType = GroupSelectItem>(item: AnyType): item is ReturnType {
  return item && 'items' in item && item['type'] === 'group-select';
}
export function isContentItem(item: AnyType): item is ItemContentProps {
  return typeof item === 'object' && item['option'] !== undefined;
}

export const isBaseItemProps = isBaseItem;
export const isAccordionItemProps = isAccordionItem;
export const isNextListItemProps = isNextListItem;
export const isGroupItemProps = isGroupItem;

type FlattenProps = {
  item: Item;
  idx: number;
  prefix?: ItemId;
  parentId?: ItemId;
};

type KindFlattenItemsProps = {
  items: Item[];
  prefix?: ItemId;
  parentId?: ItemId;
};

export function kindFlattenItems({ items, prefix, parentId }: KindFlattenItemsProps) {
  const flattenItems: Record<string, FlattenItem> = {};
  const focusFlattenItems: Record<string, FocusFlattenItem> = {};

  function flatten({ item, idx, prefix, parentId = ITEM_PREFIXES.default }: FlattenProps): {
    id: ItemId;
    children: ItemId[];
    focusChildren: ItemId[];
    autoId: ItemId;
  } {
    const autoId = prefix !== undefined ? getItemAutoId(prefix, idx) : String(idx);
    const itemId = (!isGroupItem(item) ? item.id : undefined) ?? autoId;

    if (isBaseItem(item)) {
      flattenItems[itemId] = {
        ...item,
        items: [],
        allChildIds: [],
        id: itemId,
      };

      focusFlattenItems[autoId] = {
        key: autoId,
        originalId: itemId,
        id: autoId,
        disabled: item.disabled,
        parentId,
        items: [],
        allChildIds: [],
        itemRef: item.itemRef || createRef<HTMLElement>(),
      };

      return { id: itemId, children: [itemId], autoId, focusChildren: [autoId] };
    }

    let allChildIds: ItemId[] = [];
    let allFocusChildIds: ItemId[] = [];
    const closeChildIds: ItemId[] = [];
    const autoChildIds: ItemId[] = [];

    const { items, ...rest } = item;
    const childActiveParent = isGroupItem(item) ? parentId ?? ITEM_PREFIXES.default : autoId;

    const filteredItems = items.filter(item => !item.hidden);

    for (let idx = 0; idx < filteredItems.length; idx++) {
      const { id, children, autoId, focusChildren } = flatten({
        item: filteredItems[idx],
        idx,
        prefix: itemId,
        parentId: childActiveParent,
      });

      autoChildIds.push(autoId);
      closeChildIds.push(id);
      allChildIds = allChildIds.concat(children);
      allFocusChildIds = allFocusChildIds.concat(focusChildren);
    }

    const children = [...new Set(allChildIds.concat(closeChildIds))];
    const focusChildren = [...new Set(allFocusChildIds.concat(autoChildIds))];

    flattenItems[itemId] = {
      ...rest,
      id: itemId,
      items: [],
      allChildIds: children,
    };

    focusFlattenItems[autoId] = {
      key: autoId,
      originalId: itemId,
      id: autoId,
      parentId,
      items: autoChildIds,
      allChildIds: focusChildren,
      disabled: (item.type === 'collapse' || item.type === 'next-list') && item.disabled,
      type: item.type,
      itemRef: (!isGroupItem(item) ? item.itemRef : undefined) ?? createRef<HTMLElement>(),
    };

    return { id: itemId, children, autoId, focusChildren };
  }

  const closeChildIds: ItemId[] = [];
  const autoChildIds: ItemId[] = [];
  let allChildIds: ItemId[] = [];

  const filteredItems = items.filter(item => !item.hidden);

  for (let idx = 0; idx < filteredItems.length; idx++) {
    const { id, children, autoId } = flatten({ item: filteredItems[idx], idx, prefix, parentId });

    autoChildIds.push(autoId);
    closeChildIds.push(id);
    allChildIds.push(id);
    allChildIds = allChildIds.concat(children);
  }

  const children = [...new Set(allChildIds)];

  return {
    focusCloseChildIds: autoChildIds,
    allChildIds: children,
    flattenItems,
    focusFlattenItems,
  };
}

type ExtractActiveItemsProps = {
  focusFlattenItems: Record<string, FocusFlattenItem>;
  focusCloseChildIds: ItemId[];
  openCollapseItems: ItemId[];
  isSelectionMultiple?: boolean;
};

type ExtractActiveItemsReturnType = {
  ids: ItemId[];
  expandedIds: ItemId[];
};

export function extractActiveItems({
  focusFlattenItems,
  focusCloseChildIds,
  openCollapseItems,
  isSelectionMultiple,
}: ExtractActiveItemsProps): ExtractActiveItemsReturnType {
  const ids: ItemId[] = [];
  const expandedIds: ItemId[] = [];

  function internalFn(focusCloseChildIds: ItemId[]) {
    focusCloseChildIds.forEach(id => {
      const child = focusFlattenItems[id];

      if (child.type === 'group') {
        internalFn(child.items);
        return;
      }

      if (!child.disabled) {
        if (child.type === 'group-select') {
          if (isSelectionMultiple) {
            ids.push(child.id);
          }

          internalFn(child.items);
          return;
        }

        ids.push(child.id);

        if (child.type) {
          expandedIds.push(id);

          if (openCollapseItems.includes(child.originalId)) {
            internalFn(child.items);
          }
        }
      }
    });
  }

  internalFn(focusCloseChildIds);

  return {
    ids,
    expandedIds,
  };
}
