import { FocusEventHandler, MouseEventHandler, ReactNode, RefObject } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { LabelPosition, Mode, Size, Width } from './constants';

export type ToggleItemState<D = undefined> = {
  checked: boolean;
  data: D;
};

export type ToggleItem<D> = ToggleItemState<D> & {
  setChecked: (checked: boolean) => void;
};

export type InputVisualState = {
  focusVisible: boolean;
  disabled: boolean;
  checked: boolean;
  hover: boolean;
  size: Size;
};

export type DataAttributes = Record<`data-${string}`, string | boolean>;

export type TogglePrivateProps = WithSupportProps<{
  className?: string;
  label?: string;
  labelPosition?: LabelPosition;
  width?: Width;
  size?: Size;
  render: (visualState: InputVisualState) => ReactNode;
  mode?: Mode;
  id?: string;
  value?: string;
  name?: string;
  tabIndex?: number;
  autofocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}>;

export type ToggleProps = WithSupportProps<
  Pick<
    TogglePrivateProps,
    | 'id'
    | 'name'
    | 'value'
    | 'tabIndex'
    | 'autofocus'
    | 'checked'
    | 'defaultChecked'
    | 'disabled'
    | 'onChange'
    | 'onClick'
    | 'onBlur'
    | 'onFocus'
    | 'className'
    | 'label'
    | 'labelPosition'
    | 'width'
    | 'size'
  > & {
    inputRef?: RefObject<HTMLInputElement>;
  }
>;
