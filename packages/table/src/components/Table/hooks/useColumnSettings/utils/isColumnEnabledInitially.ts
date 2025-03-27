import { ColumnDefinition } from '../../../../../types';

export function isColumnEnabledInitially<TData extends object>(colDef: ColumnDefinition<TData>) {
  if ('columnSettings' in colDef && colDef.columnSettings !== undefined) {
    return colDef.columnSettings?.mode !== 'defaultFalse';
  }

  return true;
}
