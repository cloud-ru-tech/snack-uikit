import { ColumnDefinition } from '../../../../../types';
import { TableProps } from '../../../../types';
import { getColumnIdentifier, isEveryArrayItemString } from '../../../utils';

export const getLocalStorageColumnOrderKey = (id: string) => `${id}_columnOrder`;

export function prepareInitialState<TData extends object>(
  tableColumns: ColumnDefinition<TData>[],
  savedState: TableProps<TData>['savedState'],
) {
  const columnOrder = tableColumns
    .filter(column => column.pinned !== 'left' && column.pinned !== 'right')
    .map(getColumnIdentifier);

  if (savedState?.columnSettings) {
    const persistState = JSON.parse(localStorage.getItem(getLocalStorageColumnOrderKey(savedState.id)) || 'null');
    const persistValue: string[] | null = isEveryArrayItemString(persistState) ? persistState : null;

    if (persistValue !== null) {
      return [...persistValue, ...columnOrder.filter(column => !persistValue?.includes(column))];
    }

    localStorage.setItem(getLocalStorageColumnOrderKey(savedState.id), JSON.stringify(columnOrder));
  }

  return columnOrder;
}
