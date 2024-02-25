import {
  CellContext,
  ColumnPinningState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';

import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { getColumnId, getSelectionCellColumnDef } from '../../../helperComponents';
import { ColumnDefinition } from '../../../types';
import { fuzzyFilter } from '../../../utils';
import { TableProps } from '../../types';
import { useStateControl } from './useStateControl';

type UseTableProps<TData extends object> = Pick<
  TableProps<TData>,
  | 'search'
  | 'rowSelection'
  | 'sorting'
  | 'pagination'
  | 'pageSize'
  | 'columnDefinitions'
  | 'data'
  | 'manualFiltering'
  | 'manualSorting'
  | 'manualPagination'
  | 'pageCount'
>;

export function useTable<TData extends object>({
  search,
  pageSize = DEFAULT_PAGE_SIZE,
  pagination: paginationProp,
  rowSelection: rowSelectionProp,
  sorting: sortingProp,
  columnDefinitions,
  manualFiltering,
  manualPagination,
  manualSorting,
  pageCount,
  data,
}: UseTableProps<TData>) {
  const { state: globalFilter, onStateChange: onGlobalFilterChange } = useStateControl<string>(search, '');
  const { state: rowSelection, onStateChange: onRowSelectionChange } = useStateControl<RowSelectionState>(
    rowSelectionProp,
    {},
  );
  const defaultPaginationState = useMemo(
    () => ({
      pageIndex: 0,
      pageSize,
    }),
    [pageSize],
  );

  const { state: sorting, onStateChange: onSortingChange } = useStateControl<SortingState>(sortingProp, []);
  const { state: pagination, onStateChange: onPaginationChange } = useStateControl<PaginationState>(
    paginationProp,
    defaultPaginationState,
  );
  const enableSelection = Boolean(rowSelectionProp?.enable);
  const tableColumns: ColumnDefinition<TData>[] = useMemo(() => {
    let cols: ColumnDefinition<TData>[] = columnDefinitions;
    if (enableSelection) {
      cols = [getSelectionCellColumnDef(), ...cols];
    }
    return cols;
  }, [columnDefinitions, enableSelection]);
  const columnPinning = useMemo(() => {
    const pinningState: Required<ColumnPinningState> = { left: [], right: [] };
    for (const col of tableColumns) {
      const id = getColumnId(col);
      if (col.pinned && id) {
        pinningState[col.pinned]?.push(id);
      }
    }
    return pinningState;
  }, [tableColumns]);

  const table = useReactTable<TData>({
    data,
    columns: tableColumns,
    state: {
      columnPinning,
      globalFilter,
      rowSelection,
      sorting,
      pagination,
    },
    pageCount,
    defaultColumn: {
      enableSorting: true,
      enableResizing: true,
      minSize: 40,
      cell: (cell: CellContext<TData, unknown>) => <TruncateString text={String(cell.getValue())} maxLines={1} />,
    },

    manualSorting,
    manualPagination,
    manualFiltering,

    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange,

    onRowSelectionChange,
    enableRowSelection: rowSelectionProp?.enable,
    enableMultiRowSelection: rowSelectionProp?.multiRow,
    enableFilters: true,
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    enableSorting: true,
    enableMultiSort: true,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),

    columnResizeMode: 'onEnd',
  });

  return { table, tableColumns, columnPinning };
}
