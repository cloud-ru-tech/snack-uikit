import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Cell, Header, HeaderGroup, Row } from '@tanstack/react-table';
import { CSSProperties, useMemo } from 'react';

import { useTableContext } from './contexts';

function hasHeaders<TData>(groups: HeaderGroup<TData>[]) {
  return groups.some(group => group.headers.length);
}

export function useHeaderGroups() {
  const { table } = useTableContext();

  const columnDefs = table._getColumnDefs();
  const pinEnabled = table.getIsSomeColumnsPinned();
  const { columnOrder } = table.getState();

  return useMemo(() => {
    if (!pinEnabled) {
      return {
        unpinned: table.getHeaderGroups(),
      };
    }

    const left = table.getLeftHeaderGroups();
    const right = table.getRightHeaderGroups();

    return {
      leftPinned: hasHeaders(left) ? left : undefined,
      rightPinned: hasHeaders(right) ? right : undefined,
      unpinned: table.getCenterHeaderGroups(),
    };
    // need to rebuild if columnDefinitions has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, pinEnabled, columnDefs, columnOrder]);
}

export function useRowCells<TData>(row: Row<TData>) {
  const { table } = useTableContext();

  const pinEnabled = table.getIsSomeColumnsPinned();
  const columnDefs = table._getColumnDefs();
  const { columnOrder } = table.getState();

  return useMemo(() => {
    if (!pinEnabled) {
      return {
        unpinned: row.getVisibleCells(),
      };
    }

    const left = row.getLeftVisibleCells();
    const right = row.getRightVisibleCells();

    return {
      leftPinned: left.length ? left : undefined,
      rightPinned: right.length ? right : undefined,
      unpinned: row.getCenterVisibleCells(),
    };
    // need to rebuild if columnDefinitions has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, pinEnabled, columnDefs, columnOrder]);
}

type CellSizesOptions = {
  isDraggable?: boolean;
};

export function useCellSizes<TData>(
  element: Cell<TData, unknown> | Header<TData, unknown>,
  options?: CellSizesOptions,
) {
  const column = element.column;

  const { isDragging, transform } = useSortable({
    id: column.id,
  });

  const minWidth = column.columnDef.minSize;
  const maxWidth = column.columnDef.maxSize;
  const width = `var(--table-column-${column.id}-size)`;
  const flexShrink = `var(--table-column-${column.id}-flex)`;

  const isHeaderCell = 'headerGroup' in element;

  return useMemo(() => {
    const styles: CSSProperties = {
      minWidth,
      width,
      maxWidth,
      flexShrink,
    };

    if (options?.isDraggable) {
      styles.opacity = isDragging ? 0.8 : 1;
      styles.position = 'relative';
      styles.transform = CSS.Translate.toString(transform);
      styles.transition = 'width transform 0.2s ease-in-out';
      styles.zIndex = isDragging ? 1 : undefined;

      if (isHeaderCell) {
        styles.whiteSpace = 'nowrap';
      }
    }

    return styles;
  }, [options?.isDraggable, flexShrink, isDragging, isHeaderCell, maxWidth, minWidth, transform, width]);
}
