import {
  CellContext,
  ColumnPinningState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionOptions,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
import { ReactNode, useCallback, useMemo } from 'react';

import { Scroll } from '@snack-uikit/scroll';
import { SkeletonContextProvider } from '@snack-uikit/skeleton';
import { Toolbar, ToolbarProps } from '@snack-uikit/toolbar';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import {
  BodyRow,
  ExportButton,
  getColumnId,
  getRowActionsColumnDef,
  getSelectionCellColumnDef,
  getStatusColumnDef,
  HeaderRow,
  RowClickHandler,
  STATUS_APPEARANCE,
  TableContext,
} from '../../helperComponents';
import { ColumnDefinition } from '../../types';
import { fuzzyFilter } from '../../utils';
import { TableEmptyState, TableEmptyStateProps } from '../TableEmptyState';
import { TablePagination } from '../TablePagination';
import { DEFAULT_NO_DATA_TABLE_STATE, DEFAULT_NO_RESULTS_TABLE_STATE } from './constants';
import { useLoadingTable, useStateControl } from './hooks';
import styles from './styles.module.scss';

export type TableProps<TData extends object> = WithSupportProps<{
  /** Данные для отрисовки */
  data: TData[];
  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];
  /** Параметры отвечают за возможность сортировки, их стоит использовать если нужно отслеживать состояние <br>
   *  <strong>initialState</strong>: Начальное состояние сортировки <br>
   *  <strong>state</strong>: Состояние сортировки, жестко устанавливаемое снаружи <br>
   * <strong>onChange</strong>: Колбэк на изменение сортировки
   *  */
  sorting?: {
    initialState?: SortingState;
    state?: SortingState;
    onChange?(state: SortingState): void;
  };
  /** Параметры отвечают за возможность выбора строк <br>
   * <strong>initialState</strong>: Начальное состояние выбора строк <br>
   * <strong>state</strong>: Состояние выбора строк, жестко устанавливаемое снаружи <br>
   * <strong>enable</strong>: Колбэк определяющий можно ли выбрать строку <br>
   * <strong>multiRow</strong>: Мульти-выбор строк (включен по-умолчанию, когда включается выбор) <br>
   * <strong>onChange</strong>: Колбэк на выбор строк
   *  */
  rowSelection?: {
    initialState?: RowSelectionState;
    state?: RowSelectionState;
    enable?: RowSelectionOptions<TData>['enableRowSelection'];
    multiRow?: boolean;
    onChange?(state: RowSelectionState): void;
  };
  /** Параметры отвечают за глобальный поиск в таблице <br>
   * <strong>initialState</strong>: Начальное состояние строки поиска <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>placeholder</strong>: Placeholder строки поиска @default 'Search'<br>
   * <strong>loading</strong>: Состояние загрузки в строке поиска <br>
   * <strong>onChange</strong>: Колбэк на изменение данных в строке поиска
   *  */
  search?: {
    initialValue?: string;
    state?: string;
    placeholder?: string;
    loading?: boolean;
    onChange?(value: string): void;
  };

  /** Максимальное кол-во строк на страницу @default 10 */
  pageSize?: number;

  /** Параметры отвечают за пагинацию в таблице <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>options</strong>: Варианты в выпадающем селекторе для установки кол-ва строк на страницу <br>
   * <strong>optionsLabel</strong>: Текст для селектора кол-ва строк на страницу @default 'Rows volume: ' <br>
   * <strong>onChange</strong>: Колбэк на изменение пагинации
   *  */
  pagination?: {
    state?: PaginationState;
    options?: number[];
    optionsLabel?: string;
    onChange?(state: PaginationState): void;
  };

  /** Кол-во страниц (используется для внешнего управления) */
  pageCount?: number;

  /** Колбэк клика по строке */
  onRowClick?: RowClickHandler<TData>;
  /** CSS-класс */
  className?: string;

  /** Состояние загрузки */
  loading?: boolean;

  /** Колбек обновления данных */
  onRefresh?(): void;

  /** Колбек удаления выбранных */
  onDelete?(selectionState: RowSelectionState, resetRowSelection: (defaultState?: boolean) => void): void;

  /** Внешний бордер для тулбара и таблицы */
  outline?: boolean;

  /** Фильтры */
  columnFilters?: ReactNode;

  /** Название файла при экспорте CSV/XLSX */
  exportFileName?: string;

  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: ToolbarProps['moreActions'];

  /** Экран при отстутствии данных */
  noDataState?: TableEmptyStateProps;
  /** Экран при отстутствии результатов поиска */
  noResultsState?: TableEmptyStateProps;

  /** Отключение тулбара */
  suppressToolbar?: boolean;
  /** Дополнительный слот в `Toolbar` перед строкой поиска */
  toolbarBefore?: ReactNode;

  /** Отключение пагинации */
  suppressPagination?: boolean;
}>;

/** Компонент таблицы */
export function Table<TData extends object>({
  data,
  columnDefinitions,

  rowSelection: rowSelectionProp,
  search,
  sorting: sortingProp,
  columnFilters: columnFiltersProp,

  pagination: paginationProp,

  className,

  onRowClick,
  onRefresh,
  onDelete,

  pageSize = 10,
  pageCount,
  loading = false,
  outline = false,

  moreActions,
  exportFileName,

  noDataState = DEFAULT_NO_DATA_TABLE_STATE,
  noResultsState = DEFAULT_NO_RESULTS_TABLE_STATE,

  suppressToolbar = false,
  toolbarBefore,

  suppressPagination = false,

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

  const tableColumns: ColumnDefinition<TData>[] = useMemo(() => {
    let cols: ColumnDefinition<TData>[] = columnDefinitions.map(column =>
      column.cell
        ? column
        : {
            ...column,
            cell: (cell: CellContext<TData, unknown>) => <TruncateString text={String(cell.getValue())} maxLines={1} />,
          },
    );

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
    },

    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange,

    onRowSelectionChange,
    enableRowSelection: rowSelectionProp?.enable,
    enableMultiRowSelection: rowSelectionProp?.multiRow,

    enableFilters: true,
    getFilteredRowModel: getFilteredRowModel(),

    enableColumnResizing: true,

    enableSorting: true,
    manualSorting: false,
    enableMultiSort: false,
    manualPagination: pageCount !== undefined,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange,
    getPaginationRowModel: getPaginationRowModel(),

    getCoreRowModel: getCoreRowModel(),
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

  return (
    <>
      <div
        style={{ '--page-size': !suppressPagination ? tablePagination?.pageSize : pageSize }}
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
                placeholder: search?.placeholder || 'Search',
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
                exportFileName ? (
                  <ExportButton fileName={exportFileName} columnDefinitions={columnDefinitions} data={data} />
                ) : undefined
              }
              moreActions={moreActions}
            />

            {columnFiltersProp && <div className={styles.filtersWrapper}> {columnFiltersProp} </div>}
          </div>
        )}

        <div className={styles.scrollWrapper} data-outline={outline || undefined}>
          <Scroll size='s' className={styles.table}>
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

                    {!tableRows.length && globalFilter && <TableEmptyState {...noResultsState} />}
                    {!tableRows.length && !globalFilter && <TableEmptyState {...noDataState} />}
                  </>
                )}
              </TableContext.Provider>
            </div>
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
