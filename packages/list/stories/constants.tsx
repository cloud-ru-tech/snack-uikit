import { Avatar } from '@snack-uikit/avatar';
import { ButtonSimple } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { PlaceholderSVG, UpdateSVG } from '@snack-uikit/icons';

import { AccordionItemProps, BaseItemProps, GroupItemProps, ItemProps, NextListItemProps } from '../src';
import { GroupItem, GroupSelectItem, isAccordionItem, isBaseItem, isGroupItem } from '../src/components/Items';
import { EmptyStateProps } from '../src/helperComponents';

export function withDataTestId(items: ItemProps[], prefix?: string, shift?: number): ItemProps[] {
  return items.map((item, idx) => {
    const testId = String(
      (!isGroupItem(item) && item?.id) ||
        (prefix ? prefix + '-' + Number(idx + (shift ?? 0)) : Number(idx + (shift ?? 0))),
    );

    if (isAccordionItem(item)) {
      return {
        ...item,
        items: withDataTestId(item.items, testId),
        id: testId,
      };
    }

    if (!isBaseItem(item)) {
      return {
        ...item,
        items: withDataTestId(item.items, testId),
        id: testId,
      };
    }

    return {
      ...item,
      id: testId,
    };
  });
}

export const BASE_OPTIONS: BaseItemProps[] = [
  {
    content: { option: 'Content', description: 'Long Long Long Long Long Description', caption: 'caption' },
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

export const GROUP_OPTIONS: (GroupItem | GroupSelectItem)[] = [
  {
    divider: true,
    items: BASE_OPTIONS,
    label: 'Long long long long long long long veryyyyyyyy long group name',
    mode: 'primary',
    type: 'group',
  },
  {
    divider: false,
    items: BASE_OPTIONS,
    label: 'Long_long_long_long_unbroken_group_label',
    mode: 'secondary',
    type: 'group',
  },
  { divider: false, items: BASE_OPTIONS, label: 'Group 3', mode: 'primary', type: 'group' },
  { divider: false, items: BASE_OPTIONS, label: 'Group 4', mode: 'secondary', type: 'group' },
  { divider: false, items: BASE_OPTIONS, label: 'Group 5', mode: 'primary', type: 'group' },
  { divider: true, items: BASE_OPTIONS, type: 'group' },
];

export const VIRTUALIZED_ITEMS: (GroupItem | GroupSelectItem)[] = [
  {
    type: 'group',
    label: 'Large group',
    items: new Array(10000).fill(0).map((_, index) => ({
      id: `large_items_${index}`,
      content: { option: `Content ${index}` },
      beforeContent: <PlaceholderSVG />,
      switch: true,
    })),
  },
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
  {
    content: { option: 'Some Basic Content', description: 'description' },
    beforeContent: <PlaceholderSVG />,
    id: 'third',
    items: BASE_OPTIONS.map(item => ({ ...item, disabled: true })),
  },
  {
    content: { option: 'Some More Basic Content', description: 'Awesome description' },
    beforeContent: <PlaceholderSVG />,
    id: 'fourth',
    items: BASE_OPTIONS.map(item => ({ ...item, disabled: true })),
  },
  {
    content: { option: 'Basic Content After Basic Content', description: 'Basic Description' },
    beforeContent: <PlaceholderSVG />,
    id: 'fifth',
    items: BASE_OPTIONS.map(item => ({ ...item, disabled: true })),
  },
  {
    content: { option: 'Basic Content Again', description: 'Basic Description Again' },
    beforeContent: <PlaceholderSVG />,
    id: 'sixth',
    items: BASE_OPTIONS.map(item => ({ ...item, disabled: true })),
  },
  {
    content: { option: 'Basic Content Final', description: 'Final Description' },
    beforeContent: <PlaceholderSVG />,
    id: 'seventh',
    items: BASE_OPTIONS.map(item => ({ ...item, disabled: true })),
  },
];

export enum EmptyState {
  None = 'none',
  NotFound = 'not-found',
  NoData = 'no-data',
  DataError = 'data-error',
}

export const emptyStateSample: EmptyStateProps = {
  footer: <ButtonSimple label='Update' size='m' icon={<UpdateSVG />} onClick={() => window.alert('Clicked!')} />,
};
