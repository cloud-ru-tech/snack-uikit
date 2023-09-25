import {
  ColumnPinningState,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionOptions,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { Scroll } from '@snack-ui/scroll';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ColumnAlign, ColumnPinPosition } from '../constants';
import {
  BodyRow,
  getRowActionsColumnDef,
  getSelectionCellColumnDef,
  getStatusColumnDef,
  HeaderRow,
  RowClickHandler,
  StatusAppearance,
} from '../helperComponents';
import { TableContext } from '../helperComponents/contexts';
import { getColumnId } from '../helperComponents/helpers';
import { ColumnDefinition } from '../types';
import styles from './styles.module.scss';

export type TableProps<TData extends object> = WithSupportProps<{
  /** Данные для отрисовки */
  data: TData[];
  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];
  /** Параметры не отвечают за возможность сортировки, их стоит использовать если нужно отслеживать состояние <br>
   *  <strong>state</strong>: Состояние сортировки для initial state (если initial state не нужен - можно вообще не передавать) <br>
   * <strong>onChange</strong>: Колбэк на изменение сортировки
   *  */
  sort?: {
    state?: SortingState;
    onChange(state: SortingState): void;
  };
  /** <strong>enable</strong>: Отвечает за доступность строк для выбора <br>
   * <strong>onChange</strong>: Колбэк на выбор строк <br>
   * <strong>multiRow</strong>: Мульти-выбор строк (включен по-умолчанию, когда включается выбор)
   *  */
  rowSelection?: {
    enable: RowSelectionOptions<TData>['enableRowSelection'];
    onChange(state: RowSelectionState): void;
    multiRow?: boolean;
  };
  /** Колбэк клика по строке */
  onRowClick?: RowClickHandler<TData>;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент таблицы */
export function Table<TData extends object>({
  data,
  columnDefinitions,
  rowSelection,
  sort,
  className,
  onRowClick,
  ...rest
}: TableProps<TData>) {
  const onSorting: OnChangeFn<SortingState> = useCallback(
    sortingState => {
      if (!sort?.state) return;

      const newState = typeof sortingState === 'function' ? sortingState(sort.state) : sortingState;
      sort?.onChange(newState);
    },
    [sort],
  );

  const [sorting, onSortingChange] = useUncontrolledProp<SortingState>(sort?.state, sort?.state || [], onSorting);

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  const onRowSelectionChange: OnChangeFn<RowSelectionState> = selectionState => {
    const newState = typeof selectionState === 'function' ? selectionState(selectedRows) : selectionState;

    setSelectedRows(newState);

    rowSelection?.onChange(newState);
  };

  const enableSelection = Boolean(rowSelection?.enable);

  const tableColumns: ColumnDefinition<TData>[] = useMemo(() => {
    let cols = columnDefinitions;

    if (enableSelection) {
      cols = [getSelectionCellColumnDef(), ...columnDefinitions];
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
      sorting,
      rowSelection: selectedRows,
      columnPinning,
    },
    defaultColumn: {
      enableSorting: false,
    },
    onRowSelectionChange,
    enableRowSelection: rowSelection?.enable,
    enableMultiRowSelection: rowSelection?.multiRow,
    enableSorting: true,
    manualSorting: false,
    enableMultiSort: false,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={cn(styles.table, className)} {...extractSupportProps(rest)}>
      <Scroll size={Scroll.sizes.S}>
        <div className={styles.tableContent}>
          <TableContext.Provider value={{ table }}>
            <HeaderRow />

            {table.getRowModel().rows.map(row => (
              <BodyRow key={row.id} row={row} onRowClick={onRowClick} />
            ))}
          </TableContext.Provider>
        </div>
      </Scroll>
    </div>
  );
}

Table.columnPinPositions = ColumnPinPosition;
Table.columnAligns = ColumnAlign;
Table.getStatusColumnDef = getStatusColumnDef;
Table.statusAppearances = StatusAppearance;
Table.getRowActionsColumnDef = getRowActionsColumnDef;
