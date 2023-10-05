import { CellContext, ColumnDef, HeaderContext, RowSelectionState, SortingState } from '@tanstack/react-table';

import { ColumnAlign, ColumnPinPosition } from './constants';
import { Except } from './helperComponents/types';

type BaseColumnDefinition<TData> = Except<
  ColumnDef<TData>,
  | 'footer'
  | 'enablePinning'
  | 'enableGrouping'
  | 'enableResizing'
  | 'enableColumnFilter'
  | 'filterFn'
  | 'enableGlobalFilter'
  | 'enableMultiSort'
  | 'enableHiding'
> & {
  /** Заголовок колонки */
  header?: string | ((ctx: HeaderContext<TData, unknown>) => string);
  /** Позиционирование контента ячейки в теле таблицы */
  align?: ColumnAlign;
  /** Отключить паддинг у ячейки в теле таблицы */
  noBodyCellPadding?: boolean;
  /** Отключить паддинг у ячейки в шапке таблицы */
  noHeaderCellPadding?: boolean;
  /** Отключить смещение бордера слева у ячейки хедера */
  noHeaderCellBorderOffset?: boolean;
  /** CSS-класс для ячейки в теле таблицы */
  cellClassName?: string;
  /** CSS-класс для ячейки в теле таблицы */
  headerClassName?: string;
};

type NormalColumnDefinition<TData> = BaseColumnDefinition<TData> & {
  pinned?: never;
};

type PinnedColumnDefinition<TData> = BaseColumnDefinition<TData> & {
  id: string;
  /** Закрепление колонки слева/справа в таблице */
  pinned: ColumnPinPosition;
  /** Размер ячейки */
  size: number;
};

export type ColumnDefinition<TData> = NormalColumnDefinition<TData> | PinnedColumnDefinition<TData>;

export type {
  RowActionInfo,
  RowActionProps,
  RowActionsColumnDefProps,
  StatusColumnDefinitionProps,
  RowInfo,
  RowClickHandler,
} from './helperComponents';

export type { RowSelectionState, SortingState, CellContext, HeaderContext };