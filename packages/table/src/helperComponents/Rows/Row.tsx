import cn from 'classnames';
import { MouseEvent, ReactNode } from 'react';

import { DataAttributes } from '../types';
import styles from './styles.module.scss';

type RowProps = {
  children: ReactNode;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
  className?: string;
  role?: 'rowheader' | 'row';
} & DataAttributes;

export function Row({ onClick, role = 'row', children, className, ...attributes }: RowProps) {
  return (
    <div onClick={onClick} className={cn(styles.tableRow, className)} role={role} {...attributes}>
      {children}
    </div>
  );
}
