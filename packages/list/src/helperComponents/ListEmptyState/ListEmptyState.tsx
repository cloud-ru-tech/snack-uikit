import { InfoBlock, InfoBlockProps } from '@snack-uikit/info-block';

import styles from './styles.module.scss';

export type EmptyStateProps = Pick<InfoBlockProps, 'description' | 'icon' | 'data-test-id'>;

export type ListEmptyState = {
  emptyStates: {
    noDataState: EmptyStateProps;
    noResultsState: EmptyStateProps;
    errorDataState: EmptyStateProps;
  };
  loading?: boolean;
  dataError?: boolean;
  dataFiltered?: boolean;
  itemsLength: number;
};

export function ListEmptyState({ dataError, dataFiltered, itemsLength, emptyStates, loading }: ListEmptyState) {
  if (itemsLength || loading) {
    return null;
  }

  return (
    <div className={styles.listEmptyStateWrapper}>
      {dataError && <InfoBlock {...emptyStates.errorDataState} size='s' align='vertical' />}
      {!dataError && dataFiltered && <InfoBlock {...emptyStates.noResultsState} size='s' align='vertical' />}
      {!dataError && !dataFiltered && <InfoBlock {...emptyStates.noDataState} size='s' align='vertical' />}
    </div>
  );
}
