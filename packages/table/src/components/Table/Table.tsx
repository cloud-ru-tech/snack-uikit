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
import { ReactNode, useCallback, useMemo } from 'react';

import { Scroll } from '@snack-ui/scroll';
import { SkeletonContextProvider } from '@snack-ui/skeleton';
import { Toolbar, ToolbarProps } from '@snack-ui/toolbar';
import { TruncateString } from '@snack-ui/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ColumnAlign, ColumnPinPosition } from '../../constants';
import {
  BodyRow,
  ExportButton,
  getColumnId,
  getRowActionsColumnDef,
  getSelectionCellColumnDef,
  getStatusColumnDef,
  HeaderRow,
  RowClickHandler,
  StatusAppearance,
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
  /** Параметры за глобальный поиск в таблице <br>
   * <strong>initialState</strong>: Начальное состояние строки поиска <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>placeholder</strong>: Placeholder строки поиска @default 'Search...'<br>
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

  /** Параметры за пагинацию в таблице <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>options</strong>: Варианты в выпадающем селекторе для установки кол-ва строк на страницу<br>
   * <strong>optionsLabel</strong>: Текст для селектора кол-ва строк на страницу @default 'Rows volume' <br>
   * <strong>onChange</strong>: Колбэк на изменение пагинации
   *  */
  pagination?: {
    state?: PaginationState;
    options?: number[];
    optionsLabel?: string;
    onChange?(state: PaginationState): void;
  };

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

  /** Внешний бордер для тулбара и таблицы*/
  outline?: boolean;

  /** Фильтры*/
  columnFilters?: ReactNode;

  /** Название файла при экспорте CSV/XLXS*/
  exportFileName?: string;

  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: ToolbarProps['moreActions'];

  /** Экран при отстутствии данных */
  noDataState?: TableEmptyStateProps;
  /** Экран при отстутствии результатов поиска */
  noResultsState?: TableEmptyStateProps;
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
  loading = false,
  outline = false,

  moreActions,
  exportFileName,

  noDataState = DEFAULT_NO_DATA_TABLE_STATE,
  noResultsState = DEFAULT_NO_RESULTS_TABLE_STATE,

  ...rest
}: TableProps<TData>) {
  const { state: globalFilter, onStateChange: onGlobalFilterChange } = useStateControl<string>(search, '');
  const { state: rowSelection, onStateChange: onRowSelectionChange } = useStateControl<RowSelectionState>(
    rowSelectionProp,
    {},
  );

  const { state: sorting, onStateChange: onSortingChange } = useStateControl<SortingState>(sortingProp, []);
  const { state: pagination, onStateChange: onPaginationChange } = useStateControl<PaginationState>(paginationProp, {
    pageIndex: 0,
    pageSize,
  });

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
    data: data,
    columns: tableColumns,

    state: {
      columnPinning,
      globalFilter,
      rowSelection,
      sorting,
      pagination,
    },

    defaultColumn: {
      enableSorting: false,
    },

    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange,

    onRowSelectionChange,
    enableRowSelection: rowSelectionProp?.enable,
    enableMultiRowSelection: rowSelectionProp?.multiRow,

    enableFilters: true,
    getFilteredRowModel: getFilteredRowModel(),

    enableSorting: true,
    manualSorting: false,
    enableMultiSort: false,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),

    onPaginationChange,
    getPaginationRowModel: getPaginationRowModel(),

    getCoreRowModel: getCoreRowModel(),
  });

  const { loadingTable } = useLoadingTable({ pageSize, columnDefinitions: tableColumns, columnPinning });

  const handleOnRefresh = useCallback(() => {
    table.resetGlobalFilter();
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

    return undefined;
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

  const tableRows = table.getRowModel().rows;
  const loadingTableRows = loadingTable.getRowModel().rows;
  const tablePaginationState = table.getState().pagination;

  return (
    <>
      <div style={{ '--page-size': tablePaginationState.pageSize }} className={className}>
        <div className={styles.header}>
          <Toolbar
            value={globalFilter}
            onChange={onGlobalFilterChange}
            checked={rowSelectionProp?.multiRow ? table.getIsAllPageRowsSelected() : false}
            indeterminate={table.getIsSomePageRowsSelected() && !loading}
            className={styles.toolbar}
            onRefresh={handleOnRefresh}
            onDelete={handleOnDelete}
            onCheck={handleOnCheck}
            outline={outline}
            loading={search?.loading}
            placeholder={search?.placeholder || 'Search...'}
            actions={
              exportFileName ? (
                <ExportButton fileName={exportFileName} columnDefinitions={columnDefinitions} data={data} />
              ) : undefined
            }
            moreActions={moreActions}
          />

          {columnFiltersProp && <div className={styles.filtersWrapper}> {columnFiltersProp} </div>}
        </div>

        <div className={styles.scrollWrapper} data-outline={outline || undefined}>
          <Scroll size={Scroll.sizes.S} className={styles.table} {...extractSupportProps(rest)}>
            <div className={styles.tableContent}>
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

        <TablePagination table={table} options={paginationProp?.options} optionsLabel={paginationProp?.optionsLabel} />
      </div>
    </>
  );
}

Table.columnPinPositions = ColumnPinPosition;
Table.columnAligns = ColumnAlign;
Table.getStatusColumnDef = getStatusColumnDef;
Table.statusAppearances = StatusAppearance;
Table.getRowActionsColumnDef = getRowActionsColumnDef;
