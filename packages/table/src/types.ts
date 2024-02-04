import {
  CellContext,
  ColumnDef,
  ColumnMeta,
  HeaderContext,
  PaginationState,
  RowSelectionOptions,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';

import { ToolbarProps } from '@snack-uikit/toolbar';
import { ValueOf } from '@snack-uikit/utils';

import { TableEmptyStateProps } from './components/TableEmptyState';
import { COLUMN_ALIGN, COLUMN_PIN_POSITION } from './constants';
import { Except } from './helperComponents';

type ColumnAlign = ValueOf<typeof COLUMN_ALIGN>;

type ColumnPinPosition = ValueOf<typeof COLUMN_PIN_POSITION>;

type BaseColumnDefinition<TData> = Except<
  ColumnDef<TData>,
  | 'footer'
  | 'enablePinning'
  | 'enableGrouping'
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
  /** Пропуск в экспорте */
  meta?: ColumnMeta<TData, unknown> & { skipOnExport?: boolean };
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
  ActionsGenerator,
  CopyCellProps,
  MapStatusToAppearanceFnType,
} from './helperComponents';

export type {
  PaginationState,
  SortingState,
  RowSelectionState,
  RowSelectionOptions,
  TableEmptyStateProps,
  ToolbarProps,
  HeaderContext,
  CellContext,
};
