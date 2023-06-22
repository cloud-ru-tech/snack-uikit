import { KeyboardEventHandler, MouseEvent, ReactElement } from 'react';

import { AvatarProps } from '@snack-ui/avatar';
import { WithSupportProps } from '@snack-ui/utils';

import { Size, Variant } from './constants';

export type BaseDroplistItemProps = WithSupportProps<{
  label: string;
  caption?: string;
  description?: string;
  tagLabel?: string;
  size?: Size;
  disabled?: boolean;
  icon?: ReactElement;
  avatar?: Omit<AvatarProps, 'size'>;
  className?: string;
  tabIndex?: number;
}>;

export type DroplistItemProps = BaseDroplistItemProps & {
  variant: Variant;
  checked?: boolean;
  onClick?(e: MouseEvent<HTMLLabelElement>): void;
  onChange?(checked: boolean): void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};
