import cn from 'classnames';
import { useContext, useMemo } from 'react';

import { VIEW_MODE } from '../../constants';
import { CalendarContext } from '../CalendarContext';
import { ColumnLabel } from '../ColumnLabel';
import styles from './styles.module.scss';
import { getWeekLabels } from './utils';

export type ColumnLabelsProps = {
  className?: string;
};

export function ColumnLabels({ className }: ColumnLabelsProps) {
  const { viewMode, locale, size } = useContext(CalendarContext);

  const labels = useMemo(() => getWeekLabels(locale), [locale]);

  if (viewMode === VIEW_MODE.Month) {
    return (
      <div className={cn(styles.row, className)} data-size={size}>
        {labels.map(label => (
          <ColumnLabel key={label} label={label} />
        ))}
      </div>
    );
  }

  return null;
}
