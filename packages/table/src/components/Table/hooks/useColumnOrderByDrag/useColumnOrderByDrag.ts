import {
  closestCenter,
  DndContextProps,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  SensorOptions,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

import { ColumnDefinition } from '../../../../types';
import { TableProps } from '../../../types';
import { getLocalStorageColumnOrderKey, prepareInitialState } from './utils/prepareInitialState';

const draggingOptions: SensorOptions = {
  activationConstraint: {
    distance: 5, // Is required to differ click (sort) from drag
  },
};

type useColumnOrderByDragProps<TData extends object> = {
  tableColumns: ColumnDefinition<TData>[];
  savedState: TableProps<TData>['savedState'];
  columnSettings: TableProps<TData>['columnsSettings'];
};

export function useColumnOrderByDrag<TData extends object>({
  tableColumns,
  savedState,
  columnSettings,
}: useColumnOrderByDragProps<TData>) {
  const [columnOrder, setColumnOrderState] = useState<string[]>(() => prepareInitialState(tableColumns, savedState));

  const setColumnOrder: Dispatch<SetStateAction<string[]>> = useCallback(
    value => {
      let updatedOrder: string[];

      if (value instanceof Function) {
        updatedOrder = value(columnOrder);
      } else {
        updatedOrder = value;
      }

      if (savedState?.columnSettings) {
        localStorage.setItem(getLocalStorageColumnOrderKey(savedState.id), JSON.stringify(updatedOrder));
      }

      setColumnOrderState(updatedOrder);
    },
    [columnOrder, savedState],
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!active || !over) {
        return;
      }

      const activeId = active.id.toString();
      const overId = over.id.toString();

      if (activeId === overId) {
        return;
      }

      if (!columnOrder.includes(overId)) {
        return;
      }

      setColumnOrder(columnOrder => {
        const oldIndex = columnOrder.indexOf(activeId);
        const newIndex = columnOrder.indexOf(overId);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    },
    [columnOrder, setColumnOrder],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, draggingOptions),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const enableColumnsOrderSortByDrag = Boolean(columnSettings?.enableDrag);
  const dndContextProps: DndContextProps = useMemo(() => {
    if (!enableColumnsOrderSortByDrag) {
      return {};
    }

    return {
      collisionDetection: closestCenter,
      modifiers: [restrictToHorizontalAxis],
      onDragEnd: handleDragEnd,
      sensors,
    };
  }, [enableColumnsOrderSortByDrag, handleDragEnd, sensors]);

  return {
    columnOrder,
    setColumnOrder,

    dndContextProps,
    enableColumnsOrderSortByDrag,
  };
}
