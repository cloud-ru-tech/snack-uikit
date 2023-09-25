import { flexRender, Header } from '@tanstack/react-table';
import cn from 'classnames';

import { TruncateString } from '@snack-ui/truncate-string';

import { TEST_IDS } from '../../../constants';
import { ColumnDefinition } from '../../../types';
import { useCellSizes } from '../../hooks';
import { Cell, CellProps } from '../Cell';
import { getSortingIcon } from './helpers';
import styles from './styles.module.scss';

type HeaderCellProps<TData> = Omit<CellProps, 'align' | 'children' | 'onClick' | 'style'> & {
  header: Header<TData, unknown>;
};

export function HeaderCell<TData>({ header, className }: HeaderCellProps<TData>) {
  const isSortable = header.column.getCanSort();
  const sortDirection = isSortable && (header.column.getIsSorted() || undefined);
  const sortIcon = getSortingIcon(sortDirection);

  const columnDef: ColumnDefinition<TData> = header.column.columnDef;

  const style = useCellSizes(header);

  return (
    <Cell
      style={style}
      onClick={header.column.getToggleSortingHandler()}
      data-sortable={isSortable || undefined}
      data-no-padding={columnDef.noHeaderCellPadding || undefined}
      data-no-offset={columnDef.noHeaderCellBorderOffset || undefined}
      data-test-id={TEST_IDS.headerCell}
      className={cn(styles.tableHeaderCell, className, columnDef.headerClassName)}
    >
      {columnDef.header && (
        <div className={styles.tableHeaderCellName}>
          <TruncateString text={flexRender(columnDef.header, header.getContext()) as string} />
        </div>
      )}

      {Boolean(sortIcon) && (
        <div
          className={styles.tableHeaderSortIcon}
          data-sort-direction={sortDirection}
          data-test-id={TEST_IDS.headerSortIndicator}
        >
          {sortIcon}
        </div>
      )}
    </Cell>
  );
}
