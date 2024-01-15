import { Cell, Header, HeaderGroup, Row } from '@tanstack/react-table';
import { useMemo } from 'react';

import { useTableContext } from './contexts';

function hasHeaders<TData>(groups: HeaderGroup<TData>[]) {
  return groups.some(group => group.headers.length);
}

export function useHeaderGroups() {
  const { table } = useTableContext();

  const columnDefs = table._getColumnDefs();
  const pinEnabled = table.getIsSomeColumnsPinned();

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
  }, [table, pinEnabled, columnDefs]);
}

export function useRowCells<TData>(row: Row<TData>) {
  const { table } = useTableContext();

  const pinEnabled = table.getIsSomeColumnsPinned();
  const columnDefs = table._getColumnDefs();

  return useMemo(() => {
    if (!pinEnabled) {
      return {
        unpinned: row.getVisibleCells(),
      };
    }

    const left = row.getLeftVisibleCells();
    const right = row.getRightVisibleCells();

    return {
      pinnedLeft: left.length ? left : undefined,
      pinnedRight: right.length ? right : undefined,
      unpinned: row.getCenterVisibleCells(),
    };
    // need to rebuild if columnDefinitions has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row, pinEnabled, columnDefs]);
}

export function useCellSizes<TData>(element: Cell<TData, unknown> | Header<TData, unknown>) {
  const column = element.column;

  const minWidth = column.columnDef.minSize;
  const maxWidth = column.columnDef.maxSize;
  const width = `var(--table-column-${column.id}-size)`;
  const flexShrink = `var(--table-column-${column.id}-flex)`;

  return useMemo(
    () => ({
      minWidth,
      width,
      maxWidth,
      flexShrink,
    }),
    [flexShrink, maxWidth, minWidth, width],
  );
}
