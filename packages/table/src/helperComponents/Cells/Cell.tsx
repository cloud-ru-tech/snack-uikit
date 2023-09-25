import cn from 'classnames';
import { CSSProperties, MouseEventHandler, ReactNode } from 'react';

import { DataAttributes } from '../types';
import styles from './styles.module.scss';

export type CellProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
} & DataAttributes;

export function Cell({ onClick, className, style, children, ...attributes }: CellProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div role='cell' onClick={onClick} className={cn(styles.tableCell, className)} style={style} {...attributes}>
      {children}
    </div>
  );
}
