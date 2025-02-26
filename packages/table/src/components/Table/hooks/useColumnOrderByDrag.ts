import {
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  SensorOptions,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';

import { ColumnDefinition } from '../../../types';

function prepareInitialState<TData extends object>(tableColumns: ColumnDefinition<TData>[]) {
  return tableColumns.filter(column => column.pinned !== 'left' && column.pinned !== 'right').map(c => c.id as string);
}

const draggingOptions: SensorOptions = {
  activationConstraint: {
    distance: 5, // Is required to differ click (sort) from drag
  },
};

export function useColumnOrderByDrag<TData extends object>(tableColumns: ColumnDefinition<TData>[]) {
  const [columnOrder, setColumnOrder] = useState<string[]>(() => prepareInitialState(tableColumns));

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
    [columnOrder],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, draggingOptions),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return {
    columnOrder,
    setColumnOrder,

    handleDragEnd,
    sensors,
  };
}
