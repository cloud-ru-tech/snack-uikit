import { ReactElement, ReactText } from 'react';

import { Variant } from './constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import classNames from './styles.scss';

export type ButtonProps = {
  text: ReactText;
  variant?: Variant;
  icon?: ReactElement;
  className?: string;
  onClick(): void;
  disabled?: boolean;
};

export const Button = ({ text, variant = Variant.Filled, icon, onClick, disabled }: ButtonProps) => (
  <button className={classNames.styledButtonPrivate} data-variant={variant} onClick={onClick} disabled={disabled}>
    {text}
    {icon && <div className={classNames.iconWrapper}>{icon}</div>}
  </button>
);

Button.variants = Variant;
