import { KeyboardEventHandler, ReactElement, RefCallback } from 'react';

import { Droplist } from '@snack-ui/droplist';
import { InputPrivateProps } from '@snack-ui/input-private';
import { WithSupportProps } from '@snack-ui/utils';

import { FieldDecoratorProps } from '../FieldDecorator';

export enum SelectionMode {
  Single = 'single',
  Multi = 'multi',
}

export type Option = Pick<
  Droplist.ItemSingleProps,
  'label' | 'caption' | 'description' | 'tagLabel' | 'icon' | 'avatar' | 'disabled'
> & {
  value: string;
};

export type ExtendedOption = Option & {
  ref: RefCallback<HTMLInputElement>;
  tabIndex: number;
  checked: boolean;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
};

type InputProps = Pick<
  InputPrivateProps,
  'id' | 'name' | 'placeholder' | 'disabled' | 'readonly' | 'onFocus' | 'onBlur'
>;

type WrapperProps = Pick<
  FieldDecoratorProps,
  'className' | 'label' | 'labelTooltip' | 'required' | 'hint' | 'showHintIcon' | 'size' | 'validationState'
>;

type FieldSelectOwnProps = {
  options: Option[];
  open?: boolean;
  onOpenChange?(value: boolean): void;
  searchable?: boolean;
  showCopyButton?: boolean;
  prefixIcon?: ReactElement;
  noDataText?: string;
  locale?: Intl.Locale;
};

export type FieldSelectBaseProps = FieldSelectOwnProps & InputProps & WrapperProps;

type SingleModeProps = {
  value?: Option['value'];
  onChange?(value: Option['value']): void;
};

type MultiModeProps = {
  value?: Option['value'][];
  onChange?(value: Option['value'][]): void;
  getSelectedItemsText?(amount: number): string;
};

export type FieldSelectSingleProps = WithSupportProps<FieldSelectBaseProps & SingleModeProps>;
export type FieldSelectMultiProps = WithSupportProps<FieldSelectBaseProps & MultiModeProps>;