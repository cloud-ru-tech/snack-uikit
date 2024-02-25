import { ColumnPinningState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { SkeletonText } from '@snack-uikit/skeleton';

import { ColumnDefinition } from '../../../types';
import styles from '../styles.module.scss';

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
