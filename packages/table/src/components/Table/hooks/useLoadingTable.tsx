import { ColumnPinningState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { SkeletonText } from '@snack-uikit/skeleton';

import { getSelectionCellColumnDef, getTreeColumnDef } from '../../../helperComponents';
import { ColumnDefinition } from '../../../types';
import { RowAppearance, TableProps } from '../../types';
import styles from '../styles.module.scss';

type UseLoadingTableProps<TData extends object> = {
  columnDefinitions: ColumnDefinition<TData>[];
  pageSize: number;
  columnPinning: ColumnPinningState;
  enableSelection?: boolean;
  enableSelectPinned?: boolean;
  expanding?: TableProps<TData>['expanding'];
  rowSelectionAppearance?: RowAppearance;
};

function CellSkeleton() {
  return <SkeletonText className={styles.skeleton} lines={1} width={'100%'} />;
}

export function useLoadingTable<TData extends object>({
  pageSize,
  columnDefinitions,
  columnPinning,
  enableSelection,
  enableSelectPinned,
  expanding,
  rowSelectionAppearance,
}: UseLoadingTableProps<TData>) {
  const data = useMemo(() => Array.from({ length: pageSize }).map(() => ({}) as TData), [pageSize]);
  const columns = useMemo(() => {
    let cols: ColumnDefinition<TData>[] = columnDefinitions.map(column => ({
      ...column,
      cell: () => <CellSkeleton />,
    }));

    // for selection column
    if (enableSelection && !expanding) {
      const selectionColumnDef = getSelectionCellColumnDef(enableSelectPinned ?? false);
      const loadingSelectionColumn = {
        ...selectionColumnDef,
        cell: () => <CellSkeleton />,
      } as ColumnDefinition<TData>;

      cols = [loadingSelectionColumn, ...cols];
    }

    // for tree column
    if (expanding) {
      const treeColumnDef = getTreeColumnDef({
        ...expanding.expandingColumnDefinition,
        enableSelection,
        rowSelectionAppearance,
      });
      const loadingTreeColumn = {
        ...treeColumnDef,
        cell: () => <CellSkeleton />,
      } as ColumnDefinition<TData>;

      cols = [loadingTreeColumn, ...cols];
    }

    return cols;
  }, [columnDefinitions, enableSelection, enableSelectPinned, expanding, rowSelectionAppearance]);

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
