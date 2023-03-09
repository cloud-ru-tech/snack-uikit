import { MouseEventHandler, ReactElement } from 'react';

import { HtmlType, IconPosition, Size, Target, Type } from './constants';

export type BaseButtonProps = {
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  iconPosition?: IconPosition;
  label?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  size?: Size;
  type?: Type;
  htmlType?: HtmlType;
};

export type AnchorButtonProps = {
  href?: string;
  target?: Target;
};

export type CommonButtonProps = AnchorButtonProps & BaseButtonProps;
