import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from 'react';

import { CounterProps } from '@snack-ui/counter';

import { IconPosition, Size, Type } from './constants';

export type BaseButtonProps = {
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  iconPosition?: IconPosition;
  label?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  size?: Size;
  type?: Type;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  tabIndex?: number;
};

export type AnchorButtonProps = {
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};

export type CounterInButtonProps = Pick<CounterProps, 'value' | 'appearance' | 'variant' | 'plusLimit'>;
export type CounterButtonProps = {
  counter?: CounterInButtonProps;
};

export type CommonButtonProps = AnchorButtonProps & BaseButtonProps;
