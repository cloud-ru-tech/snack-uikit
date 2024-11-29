import { Table } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CollMap, UpdateCellMapOptions } from '../types';

export const useCellAutoResizeController = <TData>(table: Table<TData>) => {
  const [cellMap, setCellMap] = useState<CollMap>({});

  const updateCellMap = useCallback(({ columnId, size, cellId }: UpdateCellMapOptions) => {
    setCellMap(prevMap => ({
      ...prevMap,
      [columnId]: {
        ...prevMap[columnId],
        [cellId]: size,
      },
    }));
  }, []);

  const maxSizes = useMemo(
    () =>
      Object.entries(cellMap).reduce((acc, [columnId, sizes]) => {
        const maxSize = Math.max(...Object.values(sizes));
        return { ...acc, [columnId]: maxSize };
      }, {}),
    [cellMap],
  );

  useEffect(() => {
    table.setColumnSizing(old => ({ ...old, ...maxSizes }));
  }, [maxSizes, table]);

  return {
    updateCellMap,
  };
};
