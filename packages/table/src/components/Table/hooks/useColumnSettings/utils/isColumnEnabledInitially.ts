import { ColumnDefinition } from '../../../../../types';

/**
 * Проверка на то, должна ли колонка быть включена по умолчанию
 * @function isColumnEnabledInitially
 */
export function isColumnEnabledInitially<TData extends object>(colDef: ColumnDefinition<TData>) {
  if ('columnSettings' in colDef && colDef.columnSettings !== undefined) {
    return colDef.columnSettings?.mode !== 'defaultFalse';
  }

  return true;
}
