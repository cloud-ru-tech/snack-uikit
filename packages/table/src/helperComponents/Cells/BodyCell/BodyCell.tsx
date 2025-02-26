import { useSortable } from '@dnd-kit/sortable';
import { Cell as TableCell, flexRender } from '@tanstack/react-table';
import cn from 'classnames';

import { TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { useCellSizes } from '../../hooks';
import { Cell, CellProps } from '../Cell';
import styles from './styles.module.scss';

type BodyCellProps<TData> = Omit<CellProps, 'style' | 'children'> & {
  cell: TableCell<TData, unknown>;
  rowAutoHeight?: boolean;
  isDraggable?: boolean;
};

export function BodyCell<TData>({ cell, className, rowAutoHeight, isDraggable, ...props }: BodyCellProps<TData>) {
  const columnDef: ColumnDefinition<TData> = cell.column.columnDef;

  const style = useCellSizes(cell, { isDraggable });

  const { setNodeRef } = useSortable({
    id: cell.column.id,
  });

  return (
    <Cell
      {...props}
      ref={setNodeRef}
      style={style}
      className={cn(styles.tableBodyCell, className, columnDef.cellClassName)}
      data-row-auto-height={rowAutoHeight || undefined}
      data-align={columnDef.align}
      data-no-padding={columnDef.noBodyCellPadding || undefined}
      data-column-id={cell.column.id}
      data-test-id={TEST_IDS.bodyCell}
    >
      {flexRender(columnDef.cell, cell.getContext())}
    </Cell>
  );
}
