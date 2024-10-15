import { useMemo } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { useLocale } from '@snack-uikit/locale';

import { EmptyStateProps } from './ListEmptyState';

export function useEmptyState({
  noDataState: noDataStateProp,
  noResultsState: noResultsStateProp,
  errorDataState: errorDataStateProp,
}: {
  noDataState?: EmptyStateProps;
  noResultsState?: EmptyStateProps;
  errorDataState?: EmptyStateProps;
}) {
  const { t } = useLocale('List');

  return useMemo(() => {
    const noDataState: EmptyStateProps = {
      description: t('noData.description'),
      ...noDataStateProp,
    };

    const noResultsState: EmptyStateProps = {
      description: t('noResults.description'),
      ...noResultsStateProp,
    };

    const errorDataState: EmptyStateProps = {
      icon: { icon: CrossSVG, appearance: 'neutral', decor: true },
      description: t('errorData.description'),
      ...errorDataStateProp,
    };

    return {
      noDataState,
      noResultsState,
      errorDataState,
    };
  }, [errorDataStateProp, noDataStateProp, noResultsStateProp, t]);
}
