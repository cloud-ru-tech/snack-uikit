import { ColumnDefinition } from '../../../types';

export function getColumnIdentifier<TData extends object>(colDef: ColumnDefinition<TData>): string {
  if ('id' in colDef && colDef.id) {
    return colDef.id;
  }

  // @ts-expect-error Either id or accessorKey is always present
  return colDef.accessorKey as unknown as string;
}
