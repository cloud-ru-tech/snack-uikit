import { ColumnPinningState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CrossSVG, SearchSVG } from '@snack-uikit/icons';
import { useLocale } from '@snack-uikit/locale';
import { SkeletonText } from '@snack-uikit/skeleton';

import { ColumnDefinition, EmptyStateProps } from '../../types';
import styles from './styles.module.scss';

export function useStateControl<TState>(
  control: { initialState?: TState; state?: TState; onChange?(state: TState): void } | undefined,
  defaultState: TState,
) {
  const onControlState = useCallback(
    (controlState: TState) => {
      if (control?.state) {
        const newState = typeof controlState === 'function' ? controlState(control.state) : controlState;

        control?.onChange?.(newState);
      } else {
        control?.onChange?.(controlState);
      }
    },
    [control],
  );

  const [state, onStateChange] = useUncontrolledProp<TState>(
    control?.state,
    control?.state ?? control?.initialState ?? defaultState,
    onControlState,
  );

  return {
    state,
    onStateChange,
  };
}

type UseLoadingTableProps<TData> = {
  columnDefinitions: ColumnDefinition<TData>[];
  pageSize: number;
  columnPinning: ColumnPinningState;
};

export function useLoadingTable<TData>({ pageSize, columnDefinitions, columnPinning }: UseLoadingTableProps<TData>) {
  const data = useMemo(() => (Array.from({ length: pageSize }).map(() => '') || []) as TData[], [pageSize]);
  const columns = useMemo(
    () =>
      columnDefinitions.map(column => ({
        ...column,
        cell: () => <SkeletonText className={styles.skeleton} lines={1} width={'100%'} />,
      })),
    [columnDefinitions],
  );

  const loadingTable = useReactTable<TData>({
    data,
    columns,

    state: {
      columnPinning,
    },

    getCoreRowModel: getCoreRowModel(),
  });

  return { loadingTable };
}

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
      icon: { icon: CrossSVG, appearance: 'red', decor: true },
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
