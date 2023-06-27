import cn from 'classnames';
import { useContext } from 'react';

import { CalendarContext } from '../CalendarContext';
import styles from './styles.module.scss';

export type ColumnLabelProps = {
  label: string;
  className?: string;
};

export function ColumnLabel({ label, className }: ColumnLabelProps) {
  const { size, getTestId } = useContext(CalendarContext);

  return (
    <div className={cn(styles.wrapper, className)} data-test-id={getTestId('header-item')} data-size={size}>
      {label}
    </div>
  );
}
