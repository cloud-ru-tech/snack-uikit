import { ColumnDefinition } from '../types';

export function getColumnId<TData>(column: ColumnDefinition<TData>): string | undefined {
  if (column.id) {
    return column.id;
  }

  if ('accessorKey' in column && column.accessorKey) {
    return String(column.accessorKey);
  }

  return typeof column.header === 'string' ? column.header : undefined;
}
