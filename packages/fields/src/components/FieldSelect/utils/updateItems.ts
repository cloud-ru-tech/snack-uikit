import { ItemId, ItemProps, SelectionSingleValueType } from '@snack-uikit/list';

import { flattenItems } from '../legacy';
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
  value?: ItemId;
  selectedItem?: ItemWithId;
  currentItems?: ItemProps[];
}) {
  if (options.length < 1) {
    return {
      selectedItem: undefined,
      items: [],
    };
  }

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
  if (options.length < 1) {
    return {
      selectedItems: undefined,
      items: [],
    };
  }

  const originalItems = transformOptionsToItems(options);

  if (!value || !value.length) {
    return {
      selectedItems: undefined,
      items: originalItems,
    };
  }

  const foundedValue: (number | string)[] = [];

  let newItems: ItemProps[] = originalItems;
  let newSelectedItems = selectedItems;

  const flattenOriginalItems = flattenItems(originalItems);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const foundItems: ItemWithId[] = flattenOriginalItems.filter((item: any) => {
    if (value.includes(item.id) && !foundedValue.includes(item.id)) {
      foundedValue.push(item.id);
      return true;
    }
  });
  const nonFoundValues: SelectionSingleValueType[] = value.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value => !flattenOriginalItems.find((item: any) => item.id === value),
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
