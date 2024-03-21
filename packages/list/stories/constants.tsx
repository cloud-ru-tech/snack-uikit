import { Avatar } from '@snack-uikit/avatar';
import { Counter } from '@snack-uikit/counter';
import { PlaceholderSVG } from '@snack-uikit/icons';

import { AccordionItemProps, BaseItemProps, GroupItemProps, ItemProps, NextListItemProps } from '../src';

export const BASE_OPTIONS: BaseItemProps[] = [
  {
    content: { option: 'Content' },
    beforeContent: <PlaceholderSVG />,
    afterContent: <Counter value={10} />,
    switch: true,
  },
  {
    content: { option: 'Long Long Long Long Long Content' },
    beforeContent: <PlaceholderSVG />,
    switch: true,
  },
];

export const LONG_LIST_OPTIONS = Array.from({ length: 10 }).fill({
  content: { option: 'Content' },
  beforeContent: <PlaceholderSVG />,
  afterContent: <Counter value={10} />,
}) as BaseItemProps[];

export const GROUP_OPTIONS: GroupItemProps[] = [
  {
    divider: true,
    items: BASE_OPTIONS,
    label: 'Long long long long long long long veryyyyyyyy long group name',
    mode: 'primary',
  },
  {
    divider: false,
    items: BASE_OPTIONS,
    label: 'Long_long_long_long_unbroken_group_label',
    mode: 'secondary',
  },
  { divider: false, items: BASE_OPTIONS, label: 'Group 3', mode: 'primary' },
  { divider: false, items: BASE_OPTIONS, label: 'Group 4', mode: 'secondary' },
  { divider: false, items: BASE_OPTIONS, label: 'Group 5', mode: 'primary' },
  { divider: true, items: BASE_OPTIONS },
];

export const EXPAND_OPTIONS: ItemProps[] = [
  {
    content: { option: 'Content', description: 'description' },
    beforeContent: <PlaceholderSVG />,
    items: [
      {
        content: { option: 'Content', description: 'description' },
        beforeContent: <PlaceholderSVG />,
        type: 'collapse',
        items: BASE_OPTIONS.map(item => ({ ...item, switch: false })),
      },
      {
        content: { option: 'Content', description: 'description' },
        beforeContent: <PlaceholderSVG />,
        type: 'collapse',
        items: BASE_OPTIONS.map(item => ({ ...item, switch: false })),
      },
    ],
    type: 'collapse',
  },
  {
    content: { option: 'Content', description: 'description' },
    beforeContent: <PlaceholderSVG />,
    type: 'collapse',
    items: [
      {
        content: { option: 'Content', description: 'description' },
        beforeContent: <PlaceholderSVG />,
        type: 'collapse',
        items: BASE_OPTIONS.map(item => ({ ...item, switch: false })),
      },
      {
        content: { option: 'Content', description: 'description' },
        beforeContent: <PlaceholderSVG />,
        type: 'collapse',
        items: BASE_OPTIONS.map(item => ({ ...item, switch: false })),
      },
    ],
  },
];

export const DROPLIST_OPTIONS: Array<AccordionItemProps | NextListItemProps | BaseItemProps | GroupItemProps> = [
  {
    content: { option: 'Content', description: 'description' },
    beforeContent: <Avatar name={'Anton Belov'} showTwoSymbols size='xs' />,
    id: 'first',
    disabled: false,
    type: 'next-list',
    items: [
      {
        content: { option: 'Content', description: 'description' },
        beforeContent: <PlaceholderSVG />,
        id: 'first-nested',
        scroll: true,
        items: GROUP_OPTIONS,
        type: 'next-list',
      },
    ],
  },
  ...BASE_OPTIONS,
  ...EXPAND_OPTIONS,
  {
    content: { option: 'Content', description: 'description' },
    beforeContent: <PlaceholderSVG />,
    id: 'second',
    items: BASE_OPTIONS.map(item => ({ ...item, disabled: true })),
  },
];
