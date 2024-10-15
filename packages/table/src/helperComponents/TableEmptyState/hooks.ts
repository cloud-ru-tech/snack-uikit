import { useMemo } from 'react';

import { CrossSVG, SearchSVG } from '@snack-uikit/icons';
import { useLocale } from '@snack-uikit/locale';

import { EmptyStateProps } from '../../types';

export function useEmptyState({
  noDataState: noDataStateProp,
  noResultsState: noResultsStateProp,
  errorDataState: errorDataStateProp,
}: {
  noDataState?: EmptyStateProps;
  noResultsState?: EmptyStateProps;
  errorDataState?: EmptyStateProps;
}) {
  const { t } = useLocale('Table');

  return useMemo(() => {
    const noDataState: EmptyStateProps = {
      icon: { icon: SearchSVG, appearance: 'neutral', decor: true },
      title: t('noData.title'),
      ...noDataStateProp,
    };

    const noResultsState: EmptyStateProps = {
      icon: { icon: SearchSVG, appearance: 'neutral', decor: true },
      title: t('noResults.title'),
      description: t('noResults.description'),
      ...noResultsStateProp,
    };

    const errorDataState: EmptyStateProps = {
      icon: { icon: CrossSVG, appearance: 'neutral', decor: true },
      title: t('errorData.title'),
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
