import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { ICON_SIZE, SIZE, Size } from '@snack-uikit/input-private';
import { DroplistProps, flattenItems, ItemProps, SelectionSingleValueType } from '@snack-uikit/list';

import {
  AccordionOptionProps,
  BaseOptionProps,
  FieldSelectMultipleProps,
  FieldSelectProps,
  FieldSelectSingleProps,
  GroupOptionProps,
  ItemWithId,
  NestListOptionProps,
  OptionProps,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBaseOptionProps(option: any): option is BaseOptionProps {
  return !('options' in option);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAccordionOptionProps(option: any): option is AccordionOptionProps {
  return 'options' in option && option['type'] === 'collapse';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNextListOptionProps(option: any): option is NestListOptionProps {
  return 'options' in option && option['type'] === 'next-list';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isGroupOptionProps(option: any): option is GroupOptionProps {
  return 'options' in option && option['type'] === undefined;
}

export function transformOptionsToItems(options: OptionProps[]): ItemProps[] {
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

    const { description, option: contentOption, caption, value, ...rest } = option as BaseOptionProps;

    return {
      'data-test-id': 'field-select__list-option-' + option.value,
      ...rest,
      id: value,
      content: { option: contentOption, caption, description },
    };
  });
}

export function findSelectedOption(items: ItemProps[], value: SelectionSingleValueType): ItemWithId | undefined {
  const flatten: ItemWithId[] = flattenItems(items);

  if (!value) {
    return undefined;
  }

  return flatten.find(item => String(item.id) === String(value)) ?? { id: value, content: { option: String(value) } };
}

export function findSelectedOptions(items: ItemProps[], value: SelectionSingleValueType[]): ItemWithId[] | undefined {
  const flatten: ItemWithId[] | undefined = flattenItems(items);

  if (!value) {
    return undefined;
  }

  return value.map(value => (flatten ? findSelectedOption(flatten, value) : undefined)).filter(Boolean) as
    | ItemWithId[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFieldSelectMultipleProps(props: any): props is FieldSelectMultipleProps {
  return 'selection' in props && props['selection'] === 'multiple';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFieldSelectSingleProps(props: any): props is FieldSelectSingleProps {
  return ('selection' in props && props['selection'] === 'single') || props['selection'] === undefined;
}

export function getArrowIcon({ size, open }: { size: Size; open: boolean }) {
  return {
    ArrowIcon: open ? ChevronUpSVG : ChevronDownSVG,
    arrowIconSize: size === SIZE.S ? ICON_SIZE.Xs : ICON_SIZE.S,
  };
}

export function extractListProps({
  dataError,
  noDataState,
  noResultsState,
  errorDataState,
  pinTop,
  pinBottom,
  dataFiltered,
  loading,
}: Partial<FieldSelectProps>): Partial<DroplistProps> {
  return {
    dataError,
    noDataState,
    noResultsState,
    errorDataState,
    pinTop,
    pinBottom,
    dataFiltered,
    loading,
    trigger: 'clickAndFocusVisible',
    placement: 'bottom',
    'data-test-id': 'field-select__list',
    scroll: true,
    marker: true,
  };
}
