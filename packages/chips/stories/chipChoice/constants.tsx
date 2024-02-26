import { ArgTypes } from '@storybook/types';

import { PlaceholderSVG } from '@snack-uikit/icons';

import { FilterOption } from '../../src';
import { SIZE } from '../../src/constants';
import { COMMON_ARG_TYPES } from '../constants';

const icon = <PlaceholderSVG size={16} />;

export const FILTER_OPTIONS: FilterOption[] = [
  { icon, value: 'value1', label: 'Option 1', caption: 'one', tagLabel: '+1' },
  { icon, value: 'value2', label: 'Option 2', caption: 'two', tagLabel: '+2' },
  { icon, value: 'value3', label: 'Option 3', caption: 'three', tagLabel: '+3' },
  { icon, value: 'value4', label: 'Option 4', caption: 'four', tagLabel: '+4' },
  { icon, value: 'value5', label: 'Option 5', caption: 'five', tagLabel: '+5' },
];

export const CHIP_CHOICE_STORY_ARGS = {
  label: 'Label Text',
  size: SIZE.S,
  disabled: false,
  loading: false,
  'data-test-id': 'chip-choice',
  tabIndex: undefined,
  className: undefined,
  onClick: undefined,
  showClickCounter: false,
  customFormatter: false,
  useDefaultValue: true,
};

export const CHIP_CHOICE_ARG_TYPES: ArgTypes = {
  value: { table: { disable: true } },
  options: { table: { disable: true } },
  onClick: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  onChangeValue: { table: { disable: true } },
  valueFormatter: { table: { disable: true } },
  ...COMMON_ARG_TYPES,
  icon: {
    ...COMMON_ARG_TYPES.icon,
    if: { arg: 'size', neq: SIZE.Xs },
  },
  customFormatter: {
    name: '[Stories]: Use custom formatter',
    control: {
      type: 'boolean',
    },
  },
  showClickCounter: {
    name: '[Stories]: Show click counter',
  },
  useDefaultValue: {
    name: '[Stories]: Init component with default value',
  },
};

export type ChipChoiceCustomStoryProps = {
  showClickCounter?: boolean;
  customFormatter: boolean;
  useDefaultValue: boolean;
};
