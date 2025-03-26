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
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { ColumnDefinition } from '../../../types';
import { TableProps } from '../../types';
import { getColumnIdentifier } from '../utils';

const validateColumnOrderLocalStorageValue = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(setting => typeof setting === 'string');

const getLocalStorageColumnOrderKey = (id: string) => `${id}_columnOrder`;

function prepareInitialState<TData extends object>(
  tableColumns: ColumnDefinition<TData>[],
  savedState: TableProps<TData>['savedState'],
) {
  const columnOrder = tableColumns
    .filter(column => column.pinned !== 'left' && column.pinned !== 'right')
    .map(getColumnIdentifier);

  if (savedState?.columnSettings) {
    const persistState = JSON.parse(localStorage.getItem(getLocalStorageColumnOrderKey(savedState.id)) || 'null');
    const persistValue: string[] | null = validateColumnOrderLocalStorageValue(persistState) ? persistState : null;

    if (persistValue !== null) {
      return [...persistValue, ...columnOrder.filter(column => !persistValue?.includes(column))];
    }

    localStorage.setItem(getLocalStorageColumnOrderKey(savedState.id), JSON.stringify(columnOrder));
  }

  return columnOrder;
}

const draggingOptions: SensorOptions = {
  activationConstraint: {
    distance: 5, // Is required to differ click (sort) from drag
  },
};

export function useColumnOrderByDrag<TData extends object>(
  tableColumns: ColumnDefinition<TData>[],
  savedState: TableProps<TData>['savedState'],
) {
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
    [columnOrder, savedState?.columnSettings, savedState?.id],
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

  return {
    columnOrder,
    setColumnOrder,

    handleDragEnd,
    sensors,
  };
}
