import { Cell as TableCell, flexRender } from '@tanstack/react-table';
import cn from 'classnames';

import { TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { useCellSizes } from '../../hooks';
import { Cell, CellProps } from '../Cell';
import styles from './styles.module.scss';

type BodyCellProps<TData> = Omit<CellProps, 'style' | 'children'> & {
  cell: TableCell<TData, unknown>;
};

export function BodyCell<TData>({ cell, className, ...props }: BodyCellProps<TData>) {
  const columnDef: ColumnDefinition<TData> = cell.column.columnDef;

  const style = useCellSizes(cell);

  return (
    <Cell
      {...props}
      style={style}
      className={cn(styles.tableBodyCell, className, columnDef.cellClassName)}
      data-align={columnDef.align}
      data-no-padding={columnDef.noBodyCellPadding || undefined}
      data-column-id={cell.column.id}
      data-test-id={TEST_IDS.bodyCell}
    >
      {flexRender(columnDef.cell, cell.getContext())}
    </Cell>
  );
}
