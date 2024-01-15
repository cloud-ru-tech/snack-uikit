import cn from 'classnames';
import { MouseEvent, ReactNode } from 'react';

import { DataAttributes } from '../types';
import styles from './styles.module.scss';

type RowProps = {
  children: ReactNode;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
  className?: string;
} & DataAttributes;

export function Row({ onClick, children, className, ...attributes }: RowProps) {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div onClick={onClick} className={cn(styles.tableRow, className)} role='row' {...attributes}>
      {children}
    </div>
  );
}
