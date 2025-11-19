import { InfoBlock, InfoBlockProps } from '@snack-uikit/info-block';

import styles from './styles.module.scss';

export type EmptyStateProps = Pick<InfoBlockProps, 'title' | 'description' | 'icon' | 'footer' | 'className'>;

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
