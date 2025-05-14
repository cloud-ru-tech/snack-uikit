import { InfoBlock, InfoBlockProps } from '@snack-uikit/info-block';

import { ListPrivateProps } from '../../components/Lists/types';
import styles from './styles.module.scss';

export type EmptyStateProps = Pick<InfoBlockProps, 'description' | 'icon' | 'data-test-id' | 'footer' | 'className'>;

export type ListEmptyState = {
  emptyStates: {
    noDataState: EmptyStateProps;
    noResultsState: EmptyStateProps;
    errorDataState: EmptyStateProps;
  };
  loading?: boolean;
  dataError?: boolean;
  dataFiltered?: boolean;
  hasNoItems: boolean;
  size: ListPrivateProps['size'];
};

export function ListEmptyState({ dataError, dataFiltered, hasNoItems, emptyStates, loading, size }: ListEmptyState) {
  if (loading) {
    return null;
  }

  if (dataError) {
    return (
      <div className={styles.listEmptyStateWrapper}>
        <InfoBlock {...emptyStates.errorDataState} size={size} align='vertical' />
      </div>
    );
  }

  if (dataFiltered && hasNoItems) {
    return (
      <div className={styles.listEmptyStateWrapper}>
        <InfoBlock {...emptyStates.noResultsState} size={size} align='vertical' data-test-id='list__no-results' />
      </div>
    );
  }

  if (!dataFiltered && hasNoItems) {
    return (
      <div className={styles.listEmptyStateWrapper}>
        <InfoBlock {...emptyStates.noDataState} size={size} align='vertical' data-test-id='list__no-data' />
      </div>
    );
  }

  return null;
}
