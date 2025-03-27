import { useSortable } from '@dnd-kit/sortable';
import { flexRender, Header } from '@tanstack/react-table';
import cn from 'classnames';
import { MouseEvent, useMemo, useRef } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';

import { DEFAULT_COLUMNS, TEST_IDS } from '../../../constants';
import { ColumnDefinition, ColumnPinPosition } from '../../../types';
import { useCellSizes } from '../../hooks';
import { Cell, CellProps } from '../Cell';
import { getSortingIcon } from './helpers';
import { ResizeHandle } from './ResizeHandle';
import styles from './styles.module.scss';

type HeaderCellProps<TData> = Omit<CellProps, 'align' | 'children' | 'onClick' | 'style'> & {
  header: Header<TData, unknown>;
  pinPosition?: ColumnPinPosition;
  rowAutoHeight?: boolean;
  isDraggable?: boolean;
};

export function HeaderCell<TData>({
  header,
  pinPosition,
  className,
  rowAutoHeight,
  isDraggable,
}: HeaderCellProps<TData>) {
  const cellRef = useRef<HTMLDivElement>(null);
  const isSortable = header.column.getCanSort();
  const isResizable = header.column.getCanResize();
  const isResizing = isResizable && header.column.getIsResizing();

  const sortDirection = isSortable && (header.column.getIsSorted() || undefined);
  const sortIcon = getSortingIcon(sortDirection);

  const columnSizingInfo = header.getContext().table.getState().columnSizingInfo;
  const isSomeColumnResizing = columnSizingInfo.isResizingColumn;

  const columnDef: ColumnDefinition<TData> = header.column.columnDef;

  const style = useCellSizes(header, { isDraggable });

  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: header.column.id,
  });

  const sortingHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (isSomeColumnResizing) return;

    return header.column.getToggleSortingHandler()?.(e);
  };

  const draggableProps = useMemo(() => {
    if (!isDraggable || (DEFAULT_COLUMNS as string[]).includes(header.column.id)) {
      return {};
    }

    return {
      ...attributes,
      ...listeners,
    };
  }, [attributes, header.column.id, isDraggable, listeners]);

  return (
    <Cell
      style={style}
      onClick={sortingHandler}
      data-sortable={isSortable || undefined}
      data-draggable={isDraggable || undefined}
      data-no-padding={columnDef.noHeaderCellPadding || undefined}
      data-no-offset={columnDef.noHeaderCellBorderOffset || undefined}
      data-test-id={TEST_IDS.headerCell}
      data-header-id={header.id}
      data-resizing={isResizing || undefined}
      data-pin-position={pinPosition || undefined}
      data-row-auto-height={rowAutoHeight || undefined}
      role='columnheader'
      className={cn(styles.tableHeaderCell, className, columnDef.headerClassName)}
      ref={element => {
        if (isDraggable) {
          setNodeRef(element);
        }
        return cellRef;
      }}
    >
      <div
        className={styles.tableHeaderCellDragWrapper}
        data-dragging={(isDraggable && isDragging) || undefined}
        {...draggableProps}
      >
        <div className={styles.tableHeaderCellMain} data-align={columnDef.headerAlign || undefined}>
          {columnDef.header && (
            <div className={styles.tableHeaderCellName}>
              {rowAutoHeight ? (
                flexRender(columnDef.header, header.getContext())
              ) : (
                <TruncateString text={flexRender(columnDef.header, header.getContext()) as string} />
              )}
            </div>
          )}

          {Boolean(sortIcon) && (
            <div
              className={styles.tableHeaderIcon}
              data-sort-direction={sortDirection}
              data-test-id={TEST_IDS.headerSortIndicator}
            >
              {sortIcon}
            </div>
          )}
        </div>
      </div>

      {Boolean(isResizable) && <ResizeHandle header={header} cellRef={cellRef} />}
    </Cell>
  );
}
