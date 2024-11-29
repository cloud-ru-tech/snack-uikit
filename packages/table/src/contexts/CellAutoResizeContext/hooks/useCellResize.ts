import { Cell } from '@tanstack/react-table';
import { useContext, useEffect, useRef } from 'react';

import { CellAutoResizeContext } from '../CellAutoResizeContext';
import { TREE_CELL_ADDITIONAL_WIDTH } from '../constants';

export const useCellResize = <TData, TValue>(columnId: string, cell: Cell<TData, TValue>) => {
  const { updateCellMap } = useContext(CellAutoResizeContext);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    updateCellMap({
      columnId,
      size: (ref.current?.clientWidth || 0) + TREE_CELL_ADDITIONAL_WIDTH,
      cellId: cell.id,
    });
    return () => {
      updateCellMap({ columnId, size: 0, cellId: cell.id });
    };
  }, [columnId, cell, updateCellMap]);

  return { ref };
};
