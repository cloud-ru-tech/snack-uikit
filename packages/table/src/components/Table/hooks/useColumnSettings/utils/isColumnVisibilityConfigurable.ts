import { ColumnDefinition } from '../../../../../types';

/**
 * Проверка на то, должна ли колонка отображаться в настройках колонок
 * @function isColumnVisibilityConfigurable
 */
export function isColumnVisibilityConfigurable<TData extends object>(colDef: ColumnDefinition<TData>): boolean {
  if ('columnSettings' in colDef && colDef.columnSettings !== undefined) {
    const { mode } = colDef.columnSettings;
    if (!mode) {
      return true;
    }

    switch (mode) {
      case 'hidden':
        return false;

      case 'defaultTrue':
      case 'defaultFalse':
      default:
        return true;
    }
  }

  return true;
}
