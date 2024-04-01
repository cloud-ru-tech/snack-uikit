import { flattenItems, ItemProps, SelectionSingleValueType } from '@snack-uikit/list';

import { ItemWithId, OptionProps } from '../types';
import { transformOptionsToItems } from './options';

export function createPlaceholderItem(value: SelectionSingleValueType) {
  return { id: value, content: { option: String(value) }, placeholder: true };
}

export function updateItems({
  options,
  value,
  selectedItem,
}: {
  options: OptionProps[];
  value: SelectionSingleValueType;
  selectedItem?: ItemWithId;
  currentItems?: ItemProps[];
}) {
  const originalItems = transformOptionsToItems(options);

  if (value === undefined) {
    return {
      selectedItem: undefined,
      items: originalItems,
    };
  }

  let newItems: ItemProps[] = originalItems;
  let newSelectedItem = selectedItem;

  const foundItem = flattenItems(originalItems).find(item => item.id === value);

  if (!foundItem) {
    if (selectedItem && selectedItem?.id === value) {
      newItems = [selectedItem, ...newItems];
    } else {
      newSelectedItem = createPlaceholderItem(value);
      newItems = [newSelectedItem, ...newItems];
    }
  } else {
    newSelectedItem = foundItem;
  }

  return {
    selectedItem: newSelectedItem,
    items: newItems,
  };
}

export function updateMultipleItems({
  options,
  value,
  selectedItems,
}: {
  options: OptionProps[];
  value?: SelectionSingleValueType[];
  selectedItems?: ItemWithId[];
  currentItems?: ItemProps[];
}) {
  const originalItems = transformOptionsToItems(options);

  if (!value || !value.length) {
    return {
      selectedItems: undefined,
      items: originalItems,
    };
  }

  let newItems: ItemProps[] = originalItems;
  let newSelectedItems = selectedItems;

  const flattenOriginalItems = flattenItems(originalItems);

  const foundItems: ItemWithId[] = flattenOriginalItems.filter(item => value.includes(item.id));
  const nonFoundValues: SelectionSingleValueType[] = value.filter(
    value => !flattenOriginalItems.find(item => item.id === value),
  );

  if (nonFoundValues.length) {
    const nonFoundItems = nonFoundValues.map(
      value => selectedItems?.find(selectedItem => selectedItem.id === value) || createPlaceholderItem(value),
    );

    newSelectedItems = [...foundItems, ...nonFoundItems];
    newItems = [...nonFoundItems, ...newItems];
  } else {
    newSelectedItems = foundItems;
  }

  return {
    selectedItems: newSelectedItems.sort((a, b) => {
      if (b.disabled && !a.disabled) {
        return 1;
      }

      if (a.disabled && !b.disabled) {
        return -1;
      }

      return 0;
    }),
    items: newItems,
  };
}
