import cn from 'classnames';
import { RefObject, useCallback, useEffect, useMemo } from 'react';

import { useLocale } from '@snack-uikit/locale';
import { Scroll } from '@snack-uikit/scroll';
import { SkeletonContextProvider } from '@snack-uikit/skeleton';
import { Toolbar } from '@snack-uikit/toolbar';
import { extractSupportProps } from '@snack-uikit/utils';

import { DEFAULT_PAGE_SIZE } from '../../constants';
import {
  BodyRow,
  ExportButton,
  getColumnId,
  getRowActionsColumnDef,
  getStatusColumnDef,
  HeaderRow,
  STATUS_APPEARANCE,
  TableContext,
  TableEmptyState,
  TablePagination,
  useEmptyState,
} from '../../helperComponents';
import { TableProps } from '../types';
import { useLoadingTable, useTable } from './hooks';
import styles from './styles.module.scss';

/** Компонент таблицы */
export function Table<TData extends object>({
  data,
  columnDefinitions,
  rowSelection,
  search,
  sorting,
  columnFilters,
  pagination,
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

  ...rest
}: TableProps<TData>) {
  const { table, tableColumns, columnPinning } = useTable<TData>({
    data,
    sorting,
    manualFiltering,
    manualPagination,
    manualSorting,
    columnDefinitions,
    rowSelection,
    pagination,
    pageCount,
    pageSize,
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
    if (!loading && rowSelection?.multiRow) {
      table.toggleAllPageRowsSelected();
      return;
    }

    if (!loading && table.getIsSomePageRowsSelected()) {
      table.resetRowSelection();
      return;
    }
  }, [loading, rowSelection?.multiRow, table]);

  useEffect(() => {}, []);

  const columnSizeVars = useMemo(() => {
    const originalColumnDefs = table._getColumnDefs();
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: string } = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const originalColDef = originalColumnDefs.find(col => getColumnId(header) === col.id);
      const originalColumnDefSize = originalColDef?.size;
      const initSize = originalColumnDefSize ? `${originalColumnDefSize}px` : '100%';

      let size = initSize;

      if (header.column.getCanResize()) {
        const currentSize = header.getSize();
        const colDefSize = header.column.columnDef.size;

        size = currentSize === colDefSize ? initSize : `${currentSize}px`;
      }

      colSizes[`--table-column-${header.id}-size`] = size;
      colSizes[`--table-column-${header.id}-flex`] = size === '100%' ? 'unset' : '0';
    }

    return colSizes;
    /* effect must be called only on columnSizingInfo.isResizingColumn changes
      to reduce unnecessary recalculations */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo.isResizingColumn]);

  const tableRows = table.getRowModel().rows;
  const loadingTableRows = loadingTable.getRowModel().rows;
  const tablePagination = table.getState().pagination;

  const { t } = useLocale('Table');
  const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });

  const cssPageSize = useMemo(() => {
    const tempPageSize = !suppressPagination ? tablePagination?.pageSize : pageSize;

    return !tableRows.length ? Math.min(Math.max(tempPageSize, 5), DEFAULT_PAGE_SIZE) : tempPageSize;
  }, [pageSize, suppressPagination, tablePagination?.pageSize, tableRows.length]);

  const enableSelection = Boolean(rowSelection?.enable);

  return (
    <>
      <div
        style={{
          '--page-size': cssPageSize,
          // width: table.getTotalSize(),
        }}
        className={cn(styles.wrapper, className)}
        {...extractSupportProps(rest)}
      >
        {!suppressToolbar && (
          <div className={styles.header}>
            <Toolbar
              search={{
                value: table.getState().globalFilter,
                onChange: table.setGlobalFilter,
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
              selectionMode={rowSelection?.multiRow ? 'multiple' : 'single'}
              before={toolbarBefore}
              after={
                <>
                  {toolbarAfter}
                  {exportFileName ? (
                    <ExportButton fileName={exportFileName} columnDefinitions={columnDefinitions} data={data} />
                  ) : undefined}
                </>
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
            options={pagination?.options}
            optionsLabel={pagination?.optionsLabel}
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
