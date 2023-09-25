import { Cell, Header, HeaderGroup, Row } from '@tanstack/react-table';
import { useMemo } from 'react';

import { useTableContext } from './contexts';
import { getColumnId } from './helpers';

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
  return useMemo(() => {
    const column = element.column;

    if (column.getIsPinned()) {
      return {
        width: column.getSize(),
      };
    }

    const originalColumnDef = element
      .getContext()
      .table._getColumnDefs()
      .find(col => getColumnId(col) === column.id);

    return {
      minWidth: originalColumnDef?.size || originalColumnDef?.minSize || column.columnDef.minSize,
      width: originalColumnDef?.size,
      maxWidth: originalColumnDef?.maxSize || column.columnDef.maxSize,
    };
  }, [element]);
}
