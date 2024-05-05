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
import cn from 'classnames';
import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';

import { useLocale } from '@snack-uikit/locale';
import { Scroll } from '@snack-uikit/scroll';
import { SkeletonContextProvider } from '@snack-uikit/skeleton';
import { Toolbar } from '@snack-uikit/toolbar';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps } from '@snack-uikit/utils';

import { DEFAULT_PAGE_SIZE } from '../../constants';
import {
  BodyRow,
  ExportButton,
  getColumnId,
  getRowActionsColumnDef,
  getSelectionCellColumnDef,
  getStatusColumnDef,
  HeaderRow,
  STATUS_APPEARANCE,
  TableContext,
  TableEmptyState,
  TablePagination,
  useEmptyState,
} from '../../helperComponents';
import { ColumnDefinition } from '../../types';
import { fuzzyFilter } from '../../utils';
import { TableProps } from '../types';
import { useLoadingTable } from './hooks';
import { useStateControl } from './hooks/useStateControl';
import styles from './styles.module.scss';

/** Компонент таблицы */
export function Table<TData extends object>({
  data,
  columnDefinitions,
  rowSelection: rowSelectionProp,
  search,
  sorting: sortingProp,
  columnFilters,
  pagination: paginationProp,
  className,
  onRowClick,
  onRefresh,
  onDelete,
  pageSize = DEFAULT_PAGE_SIZE,
  pageCount,
  loading = false,
  outline = false,
  moreActions,
  exportFileName,
  dataFiltered,
  dataError,
  noDataState,
  noResultsState,
  errorDataState,
  suppressToolbar = false,
  toolbarBefore,
  toolbarAfter,
  suppressPagination = false,
  manualSorting = false,
  manualPagination = false,
  manualFiltering = false,
  scrollRef,
  scrollContainerRef,
  getRowId,
  enableFuzzySearch,
  ...rest
}: TableProps<TData>) {
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

  useEffect(() => {
    if (pagination.pageIndex >= data.length / pagination.pageSize) {
      onPaginationChange({ ...pagination, pageIndex: 0 });
    }
  }, [data.length, onPaginationChange, pagination]);

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
      enableSorting: false,
      enableResizing: false,
      minSize: 40,
      cell: (cell: CellContext<TData, unknown>) => <TruncateString text={String(cell.getValue())} maxLines={1} />,
    },

    manualSorting,
    manualPagination,
    manualFiltering,

    globalFilterFn: enableFuzzySearch ? fuzzyFilter : undefined,
    onGlobalFilterChange,

    getRowId,
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
    autoResetPageIndex: false,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onEnd',
  });

  const { loadingTable } = useLoadingTable({ pageSize, columnDefinitions: tableColumns, columnPinning });

  const handleOnRefresh = useCallback(() => {
    table.resetRowSelection();
    onRefresh?.();
  }, [onRefresh, table]);

  const handleOnDelete = useCallback(() => {
    if (loading) {
      return;
    }

    if (onDelete) {
      onDelete(table.getState().rowSelection, table.resetRowSelection);
    }
  }, [loading, onDelete, table]);

  const handleOnCheck = useCallback(() => {
    if (!loading && rowSelectionProp?.multiRow) {
      table.toggleAllPageRowsSelected();
      return;
    }

    if (!loading && table.getIsSomePageRowsSelected()) {
      table.resetRowSelection();
      return;
    }
  }, [loading, rowSelectionProp?.multiRow, table]);

  const columnSizeVarsRef = useRef<Record<string, string>>();
  const columnSizesSnapshot = table
    .getAllColumns()
    .map(column => column.getSize())
    .join('_');

  const columnSizeVars = useMemo(() => {
    const sizeKey = (id: string) => `--table-column-${id}-size`;
    const flexKey = (id: string) => `--table-column-${id}-flex`;

    const getCurrentlyConfiguredHeaderWidth = (id: string) => {
      const cell = document.querySelector<HTMLDivElement>(`[data-header-id="${id}"]`);
      const resizeHandler = cell?.querySelector<HTMLDivElement>(
        '[data-test-id="table__header-cell-resize-handle-moving-part"]',
      );

      if (cell && resizeHandler) {
        const { width } = cell.getBoundingClientRect();
        const offset = parseInt(resizeHandler.style.getPropertyValue('--offset'));
        return width + offset;
      }

      return 0;
    };

    const originalColumnDefs = table._getColumnDefs();
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, string> = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const originalColDef = originalColumnDefs.find(col => getColumnId(header) === col.id);
      const originalColumnDefSize = originalColDef?.size;
      const initSize = originalColumnDefSize ? `${originalColumnDefSize}px` : '100%';
      const prevSize = columnSizeVarsRef.current?.[sizeKey(header.id)];

      let size = initSize;

      if (header.column.getCanResize()) {
        const currentSize = header.getSize();
        const colDefSize = header.column.columnDef.size;

        size = currentSize === colDefSize ? initSize : `${currentSize}px`;

        if (prevSize === '100%' && currentSize !== colDefSize) {
          const realSize = getCurrentlyConfiguredHeaderWidth(header.id);
          table.setColumnSizing(old => ({ ...old, [header.id]: realSize }));

          size = `${realSize}px`;
        }
      }

      colSizes[sizeKey(header.id)] = size;
      colSizes[flexKey(header.id)] = size === '100%' ? 'unset' : '0';
    }

    return colSizes;
    /*
      effect must be called only on columnSizingInfo.isResizingColumn changes
      to reduce unnecessary recalculations

      columnSizesSnapshot will trigger re-render after double-click size reset
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo.isResizingColumn, columnSizesSnapshot]);

  useEffect(() => {
    columnSizeVarsRef.current = columnSizeVars;
  }, [columnSizeVars]);

  const tableRows = table.getRowModel().rows;
  const loadingTableRows = loadingTable.getRowModel().rows;
  const tablePagination = table.getState().pagination;

  const { t } = useLocale('Table');
  const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });

  const cssPageSize = useMemo(() => {
    const tempPageSize = !suppressPagination ? tablePagination?.pageSize : pageSize;

    return !tableRows.length ? Math.min(Math.max(tempPageSize, 5), DEFAULT_PAGE_SIZE) : tempPageSize;
  }, [pageSize, suppressPagination, tablePagination?.pageSize, tableRows.length]);

  return (
    <>
      <div
        style={{
          '--page-size': cssPageSize,
        }}
        className={cn(styles.wrapper, className)}
        {...extractSupportProps(rest)}
      >
        {!suppressToolbar && (
          <div className={styles.header}>
            <Toolbar
              search={{
                value: globalFilter,
                onChange: onGlobalFilterChange,
                loading: search?.loading,
                placeholder: search?.placeholder || t('searchPlaceholder'),
              }}
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={table.getIsSomePageRowsSelected()}
              className={styles.toolbar}
              onRefresh={onRefresh ? handleOnRefresh : undefined}
              onDelete={enableSelection && onDelete ? handleOnDelete : undefined}
              onCheck={enableSelection ? handleOnCheck : undefined}
              outline={outline}
              selectionMode={rowSelectionProp?.multiRow ? 'multiple' : 'single'}
              before={toolbarBefore}
              after={
                toolbarAfter || exportFileName ? (
                  <>
                    {toolbarAfter}
                    {exportFileName && (
                      <ExportButton fileName={exportFileName} columnDefinitions={columnDefinitions} data={data} />
                    )}
                  </>
                ) : undefined
              }
              moreActions={moreActions}
            />

            {columnFilters && <div className={styles.filtersWrapper}> {columnFilters} </div>}
          </div>
        )}

        <div className={styles.scrollWrapper} data-outline={outline || undefined}>
          <Scroll size='s' className={styles.table} ref={scrollContainerRef}>
            <div className={styles.tableContent} style={columnSizeVars}>
              <TableContext.Provider value={{ table }}>
                {loading ? (
                  <SkeletonContextProvider loading>
                    <HeaderRow />
                    {loadingTableRows.map(row => (
                      <BodyRow key={row.id} row={row} />
                    ))}
                  </SkeletonContextProvider>
                ) : (
                  <>
                    {tableRows.length ? <HeaderRow /> : null}
                    {tableRows.map(row => (
                      <BodyRow key={row.id} row={row} onRowClick={onRowClick} />
                    ))}

                    <TableEmptyState
                      emptyStates={emptyStates}
                      dataError={dataError}
                      dataFiltered={dataFiltered || Boolean(table.getState().globalFilter)}
                      tableRowsLength={tableRows.length}
                    />
                  </>
                )}
              </TableContext.Provider>
            </div>
            <div className={styles.scrollStub} ref={scrollRef as RefObject<HTMLDivElement>} />
          </Scroll>
        </div>

        {!suppressPagination && (
          <TablePagination
            table={table}
            options={paginationProp?.options}
            optionsLabel={paginationProp?.optionsLabel}
            pageCount={pageCount}
          />
        )}
      </div>
    </>
  );
}

Table.getStatusColumnDef = getStatusColumnDef;
Table.statusAppearances = STATUS_APPEARANCE;
Table.getRowActionsColumnDef = getRowActionsColumnDef;
