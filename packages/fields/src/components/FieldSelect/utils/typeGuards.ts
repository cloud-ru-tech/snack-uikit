import {
  AccordionOptionProps,
  BaseOptionProps,
  FieldSelectMultipleProps,
  FieldSelectSingleProps,
  GroupOptionProps,
  NestListOptionProps,
} from '../types';

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
  return 'options' in option && option['type'] === 'group';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFieldSelectMultipleProps(props: any): props is FieldSelectMultipleProps {
  return 'selection' in props && props['selection'] === 'multiple';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFieldSelectSingleProps(props: any): props is FieldSelectSingleProps {
  return ('selection' in props && props['selection'] === 'single') || props['selection'] === undefined;
}
