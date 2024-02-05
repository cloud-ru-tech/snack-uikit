import { ColumnPinningState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CrossSVG, SearchSVG } from '@snack-uikit/icons';
import { useLocale } from '@snack-uikit/locale';
import { SkeletonText } from '@snack-uikit/skeleton';

import { ColumnDefinition, TableEmptyStateProps } from '../../types';
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

export function useTableEmptyState({
  noDataState: noDataStateProp,
  noResultsState: noResultsStateProp,
}: {
  noDataState?: TableEmptyStateProps;
  noResultsState?: TableEmptyStateProps;
}) {
  const [locales] = useLocale('Table');

  return useMemo(() => {
    const noDataState: TableEmptyStateProps = noDataStateProp ?? {
      icon: CrossSVG,
      appearance: 'red',
      ...locales.noData,
    };

    const noResultsState: TableEmptyStateProps = noResultsStateProp ?? {
      icon: SearchSVG,
      appearance: 'neutral',
      ...locales.noResults,
    };

    return {
      noDataState,
      noResultsState,
    };
  }, [locales.noData, locales.noResults, noDataStateProp, noResultsStateProp]);
}
