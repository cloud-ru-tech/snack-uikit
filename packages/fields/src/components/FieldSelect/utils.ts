import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';
import { ICON_SIZE, SIZE, Size } from '@snack-uikit/input-private';
import { ItemProps } from '@snack-uikit/list';

import {
  AccordionOptionProps,
  BaseOptionProps,
  FieldSelectMultipleProps,
  FieldSelectSingleProps,
  GroupOptionProps,
  NestListOptionProps,
  OptionProps,
  OptionWithoutGroup,
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

export function extractSelectedOptions(
  options: OptionProps[],
  value: string | number | undefined,
): OptionWithoutGroup | undefined {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (isAccordionOptionProps(option) || isNextListOptionProps(option)) {
      const { value: optionValue } = option;

      if (optionValue === value) {
        return option;
      }

      const selectedOptionFromNestedOptions = extractSelectedOptions(option.options, value);

      if (selectedOptionFromNestedOptions) {
        return selectedOptionFromNestedOptions;
      }
    }

    if (isGroupOptionProps(option)) {
      const selectedOptionFromNestedOptions = extractSelectedOptions(option.options, value);

      if (selectedOptionFromNestedOptions) {
        return selectedOptionFromNestedOptions;
      }
    }

    if (isBaseOptionProps(option)) {
      if (option.value === value) {
        return option;
      }
    }
  }

  return undefined;
}

export function extractSelectedMultipleOptions(
  options: OptionProps[],
  value?: (string | number | undefined)[],
): OptionWithoutGroup[] | undefined {
  let selectedOptions: OptionWithoutGroup[] = [];

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (isAccordionOptionProps(option) || isNextListOptionProps(option)) {
      const { value: optionValue } = option;

      if (value?.includes(optionValue)) {
        selectedOptions.push(option);
      }

      const selectedOptionFromNestedOptions = extractSelectedMultipleOptions(option.options, value);

      if (selectedOptionFromNestedOptions) {
        selectedOptions = selectedOptions.concat(selectedOptionFromNestedOptions);
      }
    }

    if (isGroupOptionProps(option)) {
      const selectedOptionFromNestedOptions = extractSelectedMultipleOptions(option.options, value);

      if (selectedOptionFromNestedOptions) {
        selectedOptions = selectedOptions.concat(selectedOptionFromNestedOptions);
      }
    }

    if (isBaseOptionProps(option)) {
      if (value?.includes(option.value)) {
        selectedOptions.push(option);
      }
    }
  }

  return selectedOptions.length ? selectedOptions : undefined;
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
