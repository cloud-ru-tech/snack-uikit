import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import { SeparatorProps } from '../../helperComponents';
import { ScrollProps, SearchState } from '../../types';

export type ItemContentProps = {
  option: string;
  caption?: string;
  description?: string;
};

export type BaseItemPrivateProps = {
  expandIcon?: ReactNode;
  open?: boolean;
};

export type BaseItemProps = WithSupportProps<{
  beforeContent?: ReactNode;
  afterContent?: ReactNode;

  content: ItemContentProps;

  onClick?(e: MouseEvent<HTMLButtonElement>): void;
  onKeyDown?(e: KeyboardEvent<HTMLButtonElement>): void;
  onFocus?(e: FocusEvent<HTMLButtonElement>): void;
  onBlur?(e: FocusEvent<HTMLButtonElement>): void;

  id?: string | number;

  disabled?: boolean;

  itemRef?: RefObject<HTMLButtonElement>;
  className?: string;

  inactive?: boolean;
  switch?: boolean;
}>;

type BaseItemsWithoutNonGroupProps = Omit<BaseItemProps, 'switch' | 'inactive'>;

// eslint-disable-next-line no-use-before-define
export type ItemProps = BaseItemProps | AccordionItemProps | NextListItemProps | GroupItemProps;

export type AccordionItemProps = BaseItemsWithoutNonGroupProps & {
  items: ItemProps[];
  // TODO: add later
  // mode?: 'single' | 'multiple';
  type: 'collapse';
};

export type NextListItemProps = BaseItemsWithoutNonGroupProps & {
  items: ItemProps[];
  type: 'next-list';
  placement?: 'right-start' | 'left-start' | 'left' | 'right' | 'left-end' | 'right-end';
  search?: SearchState;
} & ScrollProps;

export type GroupItemProps = Omit<SeparatorProps, 'size'> & {
  items: ItemProps[];
  id?: string | number;
};
