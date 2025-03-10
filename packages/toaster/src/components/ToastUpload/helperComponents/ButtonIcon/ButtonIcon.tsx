import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

export type ButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonIcon({ className, ...props }: ButtonIconProps) {
  return <button type='button' className={cn(styles.buttonIcon, className)} {...props}></button>;
}
