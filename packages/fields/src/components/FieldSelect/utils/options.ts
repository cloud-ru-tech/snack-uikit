import { ItemProps, SelectionSingleValueType } from '@snack-uikit/list';
import { TagProps } from '@snack-uikit/tag';

import { flattenItems } from '../legacy';
import { BaseOptionProps, ItemWithId, OptionProps } from '../types';
import { isAccordionOptionProps, isGroupOptionProps, isNextListOptionProps } from './typeGuards';

export function transformOptionsToItems(
  options: OptionProps[],
): (ItemProps & { appearance?: TagProps['appearance'] })[] {
  return options.map(option => {
    if (isAccordionOptionProps(option) || isNextListOptionProps(option)) {
      const { description, option: contentOption, caption, options, value, ...rest } = option;

      return {
        'data-test-id': 'field-select__list-option-' + option.value,
        ...rest,
        id: value,
        content: { option: contentOption, caption, description },
        items: transformOptionsToItems(options),
      };
    }

    if (isGroupOptionProps(option)) {
      const { options, ...rest } = option;

      return {
        ...rest,
        items: transformOptionsToItems(options),
      };
    }

    const { description, option: contentOption, caption, value, appearance, ...rest } = option as BaseOptionProps;

    return {
      'data-test-id': 'field-select__list-option-' + option.value,
      ...rest,
      id: value,
      appearance: appearance,
      content: { option: contentOption, caption, description },
    };
  });
}

export function findSelectedOption(
  items: ItemProps[],
  value: SelectionSingleValueType,
): [ItemWithId | undefined, ItemWithId | undefined] {
  const flatten: ItemWithId[] = flattenItems(items);

  if (!value) {
    return [undefined, undefined];
  }

  const foundItem = flatten.find(item => String(item.id) === String(value));
  const placeholderItem = { id: value, content: { option: String(value) } };

  return [foundItem, !foundItem ? placeholderItem : undefined];
}

export function findSelectedOptions(
  items: ItemProps[],
  value: SelectionSingleValueType[] | undefined,
): [ItemWithId[] | undefined, ItemWithId[] | undefined] {
  const flatten: ItemWithId[] | undefined = flattenItems(items);

  if (!value || !value?.length) {
    return [undefined, undefined];
  }

  let foundItems: ItemWithId[] | undefined;
  let placeholderItems: ItemWithId[] | undefined;

  value.forEach(value => {
    if (flatten) {
      const [found, placeholder] = findSelectedOption(flatten, value);
      if (found || foundItems) {
        foundItems = (foundItems ?? []).concat(found ?? []);
      }

      if (placeholder || placeholderItems) {
        placeholderItems = (placeholderItems ?? []).concat(placeholder ?? []);
      }
    }
  });

  return [foundItems, placeholderItems];
}
