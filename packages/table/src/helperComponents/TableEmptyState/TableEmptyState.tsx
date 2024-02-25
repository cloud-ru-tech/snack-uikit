import { ReactNode } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { InfoBlock } from '@snack-uikit/info-block';

import styles from './styles.module.scss';

export type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: Pick<IconPredefinedProps, 'icon' | 'decor' | 'appearance'>;
  footer?: ReactNode;
  className?: string;
};

export type TableEmptyState = {
  emptyStates: {
    noDataState: EmptyStateProps;
    noResultsState: EmptyStateProps;
    errorDataState: EmptyStateProps;
  };
  dataError?: boolean;
  dataFiltered?: boolean;
  tableRowsLength: number;
};

export function TableEmptyState({ dataError, dataFiltered, tableRowsLength, emptyStates }: TableEmptyState) {
  if (tableRowsLength) {
    return null;
  }

  return (
    <div className={styles.tableEmptyStateWrapper}>
      {dataError && <InfoBlock {...emptyStates.errorDataState} size='m' align='vertical' />}
      {!dataError && dataFiltered && <InfoBlock {...emptyStates.noResultsState} size='m' align='vertical' />}
      {!dataError && !dataFiltered && <InfoBlock {...emptyStates.noDataState} size='m' align='vertical' />}
    </div>
  );
}
