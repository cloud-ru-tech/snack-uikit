import cn from 'classnames';
import { CSSProperties, forwardRef, MouseEventHandler, ReactNode } from 'react';

import { DataAttributes } from '../types';
import styles from './styles.module.scss';

export type CellProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
  role?: 'cell' | 'columnheader';
} & DataAttributes;

export const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ onClick, onMouseUp, className, style, children, role = 'cell', ...attributes }, ref) => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role={role}
      onClick={onClick}
      onMouseUp={onMouseUp}
      className={cn(styles.tableCell, className)}
      style={style}
      ref={ref}
      {...attributes}
    >
      {children}
    </div>
  ),
);
