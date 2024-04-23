import { ArgTypes } from '@storybook/types';

import { PlaceholderSVG } from '@snack-uikit/icons';
import { Tag } from '@snack-uikit/tag';

import { FilterOption } from '../../src';
import { BaseOption } from '../../src/components/ChipChoice/types';
import { SIZE } from '../../src/constants';
import { COMMON_ARG_TYPES } from '../constants';

const icon = <PlaceholderSVG />;

export const FILTER_OPTIONS: FilterOption[] = [
  {
    beforeContent: icon,
    value: 'value1',
    label: 'Option 1',
    afterContent: <Tag label='Tag' appearance='red' />,
  },
  {
    label: 'Group Select',
    type: 'group-select',
    divider: true,
    options: [
      { beforeContent: icon, value: 'value2', label: 'Option 2', contentRenderProps: { caption: 'two' } },
      { beforeContent: icon, value: 'value3', label: 'Option 3', contentRenderProps: { caption: 'three' } },
    ],
  },
  {
    type: 'group',
    divider: true,
    options: [],
  },
  {
    type: 'next-list',
    label: 'Next List Group',
    options: [
      { beforeContent: icon, value: 'value4', label: 'Option 4', contentRenderProps: { description: 'three' } },
      { beforeContent: icon, value: 'value5', label: 'Option 5', contentRenderProps: { description: 'four' } },
    ],
  },
  {
    type: 'group',
    divider: true,
    options: [],
  },
  {
    type: 'collapse',
    label: 'Collapse Group',
    options: [
      { beforeContent: icon, value: 'value6', label: 'Option 6' },
      { beforeContent: icon, value: 'value7', label: 'Option 7' },
    ],
  },
  {
    label: 'Group',
    type: 'group',
    divider: true,
    mode: 'primary',
    options: [
      { beforeContent: icon, value: 'value8', label: 'Option 8' },
      { beforeContent: icon, value: 'value9', label: 'Option 9' },
    ],
  },
];

export const BASE_OPTIONS: BaseOption[] = [
  { value: 'value1', label: 'Option 1' },
  { value: 'value2', label: 'Option 2' },
  { value: 'value3', label: 'Option 3' },
  { value: 'value4', label: 'Option 4' },
  { value: 'value5', label: 'Option 5' },
];

export const CHIP_CHOICE_STORY_ARGS = {
  label: 'Label Text',
  size: SIZE.S,
  disabled: false,
  loading: false,
  searchable: true,
  'data-test-id': 'chip-choice',
  tabIndex: undefined,
  className: undefined,
  onClick: undefined,
  showClickCounter: false,
  customFormatter: false,
  useDefaultValue: true,
  useBaseOptions: false,
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
  useBaseOptions: {
    name: '[Stories]: BaseOptions',
  },
};

export type ChipChoiceCustomStoryProps = {
  showClickCounter?: boolean;
  customFormatter: boolean;
  useDefaultValue: boolean;
  useBaseOptions: boolean;
};
