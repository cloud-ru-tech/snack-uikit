import cn from 'classnames';
import { MouseEvent, ReactNode } from 'react';

import { DataAttributes } from '../types';
import styles from './styles.module.scss';

export type RowProps = {
  children: ReactNode;
  onClick?(e: MouseEvent<HTMLDivElement>): void;
  className?: string;
  rowAutoHeight?: boolean;
} & DataAttributes;

export function Row({ onClick, children, className, rowAutoHeight, ...attributes }: RowProps) {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      onClick={onClick}
      className={cn(styles.tableRow, className)}
      data-auto-height={rowAutoHeight || undefined}
      role='row'
      {...attributes}
    >
      {children}
    </div>
  );
}
