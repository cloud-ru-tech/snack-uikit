import {
  AccordionOption,
  AnyType,
  BaseOption,
  ContentRenderProps,
  GroupOption,
  GroupSelectOption,
  NestListOption,
} from '../types';

export function isBaseOption<T extends ContentRenderProps = ContentRenderProps>(
  option: AnyType,
): option is BaseOption<T> {
  return !('options' in option);
}
export function isAccordionOption<T extends ContentRenderProps = ContentRenderProps>(
  option: AnyType,
): option is AccordionOption<T> {
  return option && 'options' in option && option['type'] === 'collapse';
}
export function isNextListOption<T extends ContentRenderProps = ContentRenderProps>(
  option: AnyType,
): option is NestListOption<T> {
  return option && 'options' in option && option['type'] === 'next-list';
}
export function isGroupOption<T extends ContentRenderProps = ContentRenderProps>(
  option: AnyType,
): option is GroupOption<T> {
  return option && 'options' in option && option['type'] === 'group';
}
export function isGroupSelectOption<T extends ContentRenderProps = ContentRenderProps>(
  option: AnyType,
): option is GroupSelectOption<T> {
  return option && 'options' in option && option['type'] === 'group-select';
}
