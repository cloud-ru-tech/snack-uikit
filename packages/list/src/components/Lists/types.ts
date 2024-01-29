import { FocusEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { DropdownProps } from '@snack-uikit/dropdown';
import { WithSupportProps } from '@snack-uikit/utils';

import { ScrollProps, SearchState } from '../../types';
import { ItemProps } from '../Items';
import { ListContextType, SelectionProviderProps } from './contexts';

export type ListProps = WithSupportProps<
  {
    items: ItemProps[];
    pinTop?: ItemProps[];
    pinBottom?: ItemProps[];
    footer?: ReactNode;
    // TODO: add later
    // collapse?: 'single' | 'multiple';
    search?: SearchState;
    loading?: boolean;
    noData?: string;
    noResults?: string;
    footerActiveElementsRefs?: RefObject<HTMLElement>[];
  } & Pick<SelectionProviderProps, 'value' | 'defaultValue' | 'onChange' | 'selection'> &
    ListContextType &
    ScrollProps
>;

export type DroplistProps = {
  triggerElemRef?: RefObject<HTMLElement>;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  trigger?: DropdownProps['trigger'];
  placement?: DropdownProps['placement'];
  widthStrategy?: DropdownProps['widthStrategy'];
} & ListProps;

export type ListPrivateProps = ListProps & {
  nested?: boolean;
  active?: boolean;
  tabIndex?: number;
  onFocus?(e: FocusEvent<HTMLElement>): void;
  onBlur?(e: FocusEvent<HTMLElement>): void;
  onKeyDown?(e: KeyboardEvent<HTMLElement>): void;
  // TODO: remove later
  collapse?: 'single' | 'multiple';
};
