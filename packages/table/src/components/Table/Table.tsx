import { closestCenter, DndContext, DndContextProps } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  CellContext,
  ColumnPinningState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FiltersState } from '@snack-uikit/chips';
import { useLocale } from '@snack-uikit/locale';
import { Scroll } from '@snack-uikit/scroll';
import { SkeletonContextProvider } from '@snack-uikit/skeleton';
import { Toolbar, ToolbarProps } from '@snack-uikit/toolbar';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, useLayoutEffect } from '@snack-uikit/utils';

import {
  DEFAULT_FILTER_VISIBILITY,
  DEFAULT_PAGE_SIZE,
  DEFAULT_ROW_SELECTION,
  DEFAULT_SORTING,
  TEST_IDS,
} from '../../constants';
import { CellAutoResizeContext, useCellAutoResizeController } from '../../contexts';
import {
  BodyRow,
  ColumnsSettings,
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
import { getTreeColumnDef } from '../../helperComponents/Cells/TreeCell';
import { ColumnDefinition } from '../../types';
import { customDateParser, fuzzyFilter } from '../../utils';
import { TableProps } from '../types';
import { useColumnOrderByDrag, useLoadingTable, useStateControl } from './hooks';
import { usePageReset } from './hooks/usePageReset';
import { useSaveTableSettings } from './hooks/useSaveTableSettings';
import styles from './styles.module.scss';
import {
  getColumnIdentifier,
  getColumnStyleVars,
  getCurrentlyConfiguredHeaderWidth,
  getInitColumnSizeFromLocalStorage,
  getInitialColumnsOpenValue,
  isFilterableColumn,
  prepareColumnsSettings,
  prepareColumnsSettingsMap,
  saveStateToLocalStorage,
} from './utils';

/** Компонент таблицы */
export function Table<TData extends object, TFilters extends FiltersState = Record<string, unknown>>({
  data,
  rowPinning = {
    top: [],
  },
  columnDefinitions,
  keepPinnedRows = false,
  copyPinnedRows = false,
  enableSelectPinned = false,
  rowSelection: rowSelectionProp,
  search,
  sorting: sortingProp,
  columnFilters,
  pagination: paginationProp,
  className,
  onRowClick,
  onRefresh,
  pageSize = DEFAULT_PAGE_SIZE,
  pageCount,
  loading = false,
  infiniteLoading = false,
  outline = false,
  moreActions,
  exportSettings,
  dataFiltered,
  dataError,
  noDataState,
  noResultsState,
  errorDataState,
  suppressToolbar = false,
  suppressSearch = false,
  toolbarAfter,
  suppressPagination = false,
  manualSorting = false,
  manualPagination: manualPaginationProp = false,
  manualFiltering = false,
  autoResetPageIndex = false,
  scrollRef,
  scrollContainerRef,
  getRowId,
  enableFuzzySearch,
  savedState,
  expanding,
  bulkActions: bulkActionsProp,
  rowAutoHeight,
  columnsSettings: columnsSettingsProp,
  ...rest
}: TableProps<TData, TFilters>) {
  const { setDataToStorages, defaultFilter } = useSaveTableSettings({
    options: savedState,
    filterSettings: columnFilters?.filters,
  });

  const [globalFilter, onGlobalFilterChange] = useStateControl<string>(search, '');

  const [rowSelection, onRowSelectionChange] = useStateControl<RowSelectionState>(
    rowSelectionProp,
    DEFAULT_ROW_SELECTION,
  );

  const defaultPaginationState = useMemo(
    () => ({
      pageIndex: 0,
      pageSize,
    }),
    [pageSize],
  );

  const [sorting, onSortingChange] = useStateControl<SortingState>(sortingProp, DEFAULT_SORTING);

  const [pagination, onPaginationChange] = useStateControl<PaginationState>(paginationProp, defaultPaginationState);

  const [filter, setFilter] = useStateControl<TFilters | undefined>(
    {
      state: columnFilters?.value,
      initialState: columnFilters?.defaultValue as TFilters,
      onChange: columnFilters?.onChange,
    },
    undefined,
  );

  const [filterVisibility, setFilterVisibility] = useStateControl<string[]>(
    {
      state: columnFilters?.visibleFilters,
      initialState: [],
      onChange: columnFilters?.onVisibleFiltersChange,
    },
    DEFAULT_FILTER_VISIBILITY,
  );

  const [areColumnFiltersOpen, setAreColumnFiltersOpen] = useState<boolean>(() =>
    getInitialColumnsOpenValue(columnFilters),
  );

  useEffect(() => {
    setDataToStorages({ pagination, sorting, filter, search: globalFilter || '' });
  }, [pagination, sorting, filter, setDataToStorages, globalFilter]);

  useLayoutEffect(() => {
    if (defaultFilter) {
      defaultFilter.pagination && onPaginationChange(defaultFilter.pagination);
      defaultFilter.search && onGlobalFilterChange(defaultFilter.search);
      defaultFilter.sorting && onSortingChange(defaultFilter.sorting);
      defaultFilter.filter && setFilter(customDateParser(defaultFilter.filter));
      defaultFilter.filter && setFilterVisibility(Object.keys(defaultFilter.filter));
    }
    // Только для первого рендера, чтобы проинициализировать фильтр
    // eslint-disable-next-line
  }, [defaultFilter]);

  const patchedFilter = useMemo(() => {
    if (!columnFilters) {
      return undefined;
    }

    return {
      open: areColumnFiltersOpen,
      onOpenChange: setAreColumnFiltersOpen,
      ...columnFilters,
      value: filter,
      onChange: setFilter,
      visibleFilters: filterVisibility,
      onVisibleFiltersChange: setFilterVisibility,
    };
  }, [columnFilters, areColumnFiltersOpen, filter, setFilter, filterVisibility, setFilterVisibility]);

  const enableSelection = Boolean(rowSelectionProp?.enable);

  const manualPagination = infiniteLoading || manualPaginationProp;

  const [enabledColumns, setEnabledColumns] = useState<string[]>(() => prepareColumnsSettingsMap(columnDefinitions));
  const areColumnsSettingsEnabled = Boolean(columnsSettingsProp?.enableSettingsMenu);

  const filteredColumnDefinitions = useMemo(() => {
    if (!areColumnsSettingsEnabled) {
      return columnDefinitions;
    }

    return columnDefinitions.filter(colDef => {
      if (isFilterableColumn(colDef)) {
        return enabledColumns.includes(getColumnIdentifier(colDef));
      }

      return true;
    });
  }, [columnDefinitions, enabledColumns, areColumnsSettingsEnabled]);

  const tableColumns: ColumnDefinition<TData>[] = useMemo(() => {
    let cols: ColumnDefinition<TData>[] = filteredColumnDefinitions;
    if (enableSelection && !expanding) {
      cols = [getSelectionCellColumnDef(enableSelectPinned), ...cols];
    }
    if (expanding) {
      cols = [getTreeColumnDef(expanding.expandingColumnDefinition), ...cols];
    }
    return cols;
  }, [filteredColumnDefinitions, enableSelection, enableSelectPinned, expanding]);

  const enableColumnsOrderSortByDrag = Boolean(columnsSettingsProp?.enableDrag);
  const { columnOrder, setColumnOrder, sensors, handleDragEnd } = useColumnOrderByDrag(tableColumns);
  const dndContextProps: DndContextProps = useMemo(() => {
    if (!enableColumnsOrderSortByDrag) {
      return {};
    }

    return {
      collisionDetection: closestCenter,
      modifiers: [restrictToHorizontalAxis],
      onDragEnd: handleDragEnd,
      sensors: sensors,
    };
  }, [enableColumnsOrderSortByDrag, handleDragEnd, sensors]);

  const filterableColumns = useMemo(() => columnDefinitions.filter(isFilterableColumn), [columnDefinitions]);
  const areAllColumnsEnabled = filterableColumns.length === enabledColumns.length;
  const { t } = useLocale('Table');
  const columnsSettings = useMemo(
    () =>
      prepareColumnsSettings({
        columnDefinitions,
        columnOrder,
        areAllColumnsEnabled,
        t,
      }),
    [areAllColumnsEnabled, columnDefinitions, columnOrder, t],
  );

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

  const enableRowSelection = useCallback(
    (row: Row<TData>) => {
      const parent = row.getParentRow();
      const isParentSelected = parent ? parent.getCanSelect() : true;
      let isCurrentRowSelected = true;
      if (rowSelectionProp?.enable !== undefined) {
        isCurrentRowSelected =
          typeof rowSelectionProp.enable === 'boolean' ? rowSelectionProp.enable : rowSelectionProp.enable(row);
      }
      return isParentSelected && isCurrentRowSelected;
    },
    [rowSelectionProp],
  );

  const table = useReactTable<TData>({
    data,
    columns: tableColumns,
    state: {
      columnPinning,
      columnOrder: enableColumnsOrderSortByDrag ? columnOrder : undefined,
      globalFilter,
      rowSelection,
      sorting,
      pagination,
      rowPinning: expanding ? { top: [] } : rowPinning,
    },
    pageCount,
    defaultColumn: {
      enableSorting: false,
      enableResizing: false,
      minSize: 40,
      cell: (cell: CellContext<TData, unknown>) => {
        if (rowAutoHeight) {
          return cell.getValue();
        }

        return <TruncateString text={String(cell.getValue())} maxLines={1} />;
      },
    },
    onColumnOrderChange: enableColumnsOrderSortByDrag ? setColumnOrder : undefined,

    manualSorting,
    manualPagination,
    manualFiltering,
    globalFilterFn: enableFuzzySearch ? fuzzyFilter : 'includesString',
    onGlobalFilterChange,

    getRowId,
    onRowSelectionChange,
    enableGrouping: true,
    enableRowSelection,
    enableMultiRowSelection: rowSelectionProp?.multiRow,
    enableFilters: true,
    getSubRows: expanding?.getSubRows,
    enableSubRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableColumnResizing: true,
    paginateExpandedRows: manualPagination,
    enableSorting: true,
    enableMultiSort: true,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange,
    autoResetPageIndex,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onEnd',
    keepPinnedRows,
  });

  useEffect(() => {
    if (!expanding) {
      table.toggleAllRowsExpanded(false);
    }
  }, [expanding, table]);

  const { loadingTable } = useLoadingTable({
    pageSize: Math.min(Math.max(pageSize, 5), DEFAULT_PAGE_SIZE),
    columnDefinitions: filteredColumnDefinitions,
    columnPinning,
  });

  const handleOnRefresh = useCallback(() => {
    table.resetRowSelection();
    onRefresh?.();
  }, [onRefresh, table]);

  const bulkActions: ToolbarProps<TFilters>['bulkActions'] = useMemo(
    () =>
      enableSelection
        ? bulkActionsProp?.map(action => ({
            ...action,
            onClick: () => action.onClick?.(table.getState().rowSelection, table.resetRowSelection),
          }))
        : undefined,
    [bulkActionsProp, enableSelection, table],
  );

  const handleOnToolbarCheck = useCallback(() => {
    if (!loading && !enableSelectPinned && table.getTopRows().length) {
      const centerRows = table.getCenterRows();
      const isSomeRowsSelected = table.getIsSomePageRowsSelected();
      const isAllCenterRowsSelected = centerRows.every(row => row.getIsSelected());

      if (isAllCenterRowsSelected) {
        table.resetRowSelection();
        return;
      }

      centerRows.forEach(row => row.toggleSelected(isSomeRowsSelected ? true : undefined));
      return;
    }

    if (!loading && rowSelectionProp?.multiRow) {
      table.toggleAllPageRowsSelected();
      return;
    }
  }, [loading, rowSelectionProp?.multiRow, table, enableSelectPinned]);

  const columnSizeVarsRef = useRef<Record<string, string>>();
  const headers = table.getFlatHeaders();

  const columnSizes = useMemo(() => {
    const originalColumnDefs = table._getColumnDefs();
    const vars: Record<string, string> = {};
    const realSizes: Record<string, number> = {};
    const resizedColumnIndex = headers.findIndex(({ column }) => column.getIsResizing());

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const { sizeKey, flexKey } = getColumnStyleVars(header.id);

      const originalColDef = originalColumnDefs.find(col => getColumnId(header) === col.id);

      if (header.id === 'snack_predefined_statusColumn' && !originalColDef?.header && !originalColDef?.enableSorting) {
        vars[sizeKey] = 'var(--size-table-cell-status-indicator-horizontal)';
        vars[flexKey] = '100%';
      } else {
        const originalColumnDefSize = originalColDef?.size;
        let initSize = originalColumnDefSize ? `${originalColumnDefSize}px` : '100%';
        const prevSize = columnSizeVarsRef.current?.[sizeKey];

        const isResizeSavedToStore = originalColDef?.enableResizing && savedState?.id && savedState?.resize !== false;

        if (isResizeSavedToStore) {
          const savedSize = getInitColumnSizeFromLocalStorage({ id: savedState.id, columnId: header.id });
          if (savedSize) {
            initSize = savedSize;
          }
        }

        let size = initSize;

        if (header.column.getCanResize()) {
          const currentSize = header.getSize();
          const colDefSize = header.column.columnDef.size;

          if (currentSize !== colDefSize || (i < resizedColumnIndex && prevSize === '100%')) {
            const realSize = prevSize === '100%' ? getCurrentlyConfiguredHeaderWidth(header.id) : currentSize;
            realSizes[header.id] = realSize;
            size = `${realSize}px`;
          }
        }

        if (isResizeSavedToStore) {
          saveStateToLocalStorage({ id: savedState.id, columnId: header.id, size });
        }

        vars[sizeKey] = size;
        vars[flexKey] = size === '100%' ? 'unset' : '0';
      }
    }

    return { vars, realSizes };
    /*
      effect must be called only on columnSizingInfo.isResizingColumn changes
      to reduce unnecessary recalculations

      headers ids can also change, so they also should present here

      table.getTotalSize() will trigger re-render after double-click size reset
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo.isResizingColumn, headers, table.getTotalSize()]);

  useEffect(() => {
    if (Object.keys(columnSizes.realSizes).length) {
      table.setColumnSizing(old => ({ ...old, ...columnSizes.realSizes }));
    }

    columnSizeVarsRef.current = columnSizes.vars;
  }, [columnSizes, table]);

  const tableRows = table.getRowModel().rows;
  const tableCenterRows = table.getCenterRows();
  const tableFilteredRows = table.getFilteredRowModel().rows;
  const tableFilteredRowsIds = tableFilteredRows.map(row => row.id);
  const topRows = table.getTopRows();
  const loadingTableRows = loadingTable.getRowModel().rows;

  const filteredTopRows = table.getState().globalFilter
    ? topRows.filter(tr => tableFilteredRowsIds.includes(tr.id))
    : topRows;
  const centerRows = copyPinnedRows ? tableRows : tableCenterRows;

  const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });

  usePageReset({
    manualPagination,
    maximumAvailablePage: pageCount || tableFilteredRows.length / pagination.pageSize,
    pagination,
    onPaginationChange,
    autoResetPageIndex,
  });

  const { updateCellMap } = useCellAutoResizeController(table);

  const showToolbar = !suppressToolbar;

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      {showToolbar && (
        <div className={styles.header}>
          <Toolbar
            search={
              suppressSearch
                ? undefined
                : {
                    value: globalFilter,
                    onChange: onGlobalFilterChange,
                    loading: search?.loading,
                    placeholder: search?.placeholder || t('searchPlaceholder'),
                  }
            }
            className={styles.toolbar}
            onRefresh={onRefresh ? handleOnRefresh : undefined}
            bulkActions={bulkActions}
            selectionMode={rowSelectionProp?.multiRow ? 'multiple' : 'single'}
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onCheck={enableSelection ? handleOnToolbarCheck : undefined}
            outline={outline}
            after={
              toolbarAfter || exportSettings || areColumnsSettingsEnabled ? (
                <>
                  {toolbarAfter}
                  {exportSettings && (
                    <ExportButton
                      settings={exportSettings}
                      columnDefinitions={columnDefinitions}
                      data={data}
                      topRows={filteredTopRows}
                      centerRows={centerRows}
                    />
                  )}
                  {areColumnsSettingsEnabled && (
                    <ColumnsSettings
                      columnsSettings={columnsSettings}
                      enabledColumns={enabledColumns}
                      setEnabledColumns={setEnabledColumns}
                    />
                  )}
                </>
              ) : undefined
            }
            moreActions={moreActions}
            filterRow={patchedFilter}
            data-test-id={TEST_IDS.toolbar}
          />
        </div>
      )}

      <Scroll size='s' className={styles.table} ref={scrollContainerRef} data-outline={outline || undefined}>
        <div className={styles.tableContent} style={columnSizes.vars}>
          <CellAutoResizeContext.Provider value={{ updateCellMap }}>
            <DndContext {...dndContextProps}>
              <TableContext.Provider value={{ table }}>
                {(!infiniteLoading || !data.length) && loading ? (
                  <SkeletonContextProvider loading>
                    <HeaderRow rowAutoHeight={rowAutoHeight} columnOrder={columnOrder} />
                    {loadingTableRows.map(row => (
                      <BodyRow key={row.id} row={row} rowAutoHeight={rowAutoHeight} columnOrder={columnOrder} />
                    ))}
                  </SkeletonContextProvider>
                ) : (
                  <>
                    {centerRows.length || filteredTopRows.length ? (
                      <HeaderRow
                        rowAutoHeight={rowAutoHeight}
                        columnOrder={columnOrder}
                        enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
                      />
                    ) : null}

                    {filteredTopRows.length ? (
                      <div className={styles.topRowWrapper}>
                        {filteredTopRows.map(row => (
                          <BodyRow
                            key={row.id}
                            row={row}
                            onRowClick={onRowClick}
                            rowAutoHeight={rowAutoHeight}
                            columnOrder={columnOrder}
                            enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
                          />
                        ))}
                      </div>
                    ) : null}

                    {centerRows.map(row => (
                      <BodyRow
                        key={row.id}
                        row={row}
                        onRowClick={onRowClick}
                        rowAutoHeight={rowAutoHeight}
                        columnOrder={columnOrder}
                        enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
                      />
                    ))}

                    {data.length > 0 && infiniteLoading && loading && !dataError && (
                      <SkeletonContextProvider loading>
                        {loadingTableRows.slice(0, 3).map(row => (
                          <BodyRow
                            key={row.id}
                            row={row}
                            columnOrder={columnOrder}
                            enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
                          />
                        ))}
                      </SkeletonContextProvider>
                    )}

                    <TableEmptyState
                      emptyStates={emptyStates}
                      dataError={dataError}
                      dataFiltered={dataFiltered || Boolean(table.getState().globalFilter)}
                      tableRowsLength={tableRows.length + filteredTopRows.length}
                    />
                  </>
                )}
              </TableContext.Provider>
            </DndContext>
          </CellAutoResizeContext.Provider>
        </div>

        <div className={styles.scrollStub} ref={scrollRef as RefObject<HTMLDivElement>} />
      </Scroll>

      {!infiniteLoading && !suppressPagination && (
        <TablePagination
          table={table}
          options={paginationProp?.options}
          optionsLabel={paginationProp?.optionsLabel}
          pageCount={pageCount}
          optionsRender={paginationProp?.optionsRender}
        />
      )}
    </div>
  );
}

Table.getStatusColumnDef = getStatusColumnDef;
Table.statusAppearances = STATUS_APPEARANCE;
Table.getRowActionsColumnDef = getRowActionsColumnDef;
