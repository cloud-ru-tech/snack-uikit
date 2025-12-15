import { ColumnDefinition, FilterableColumnDefinition } from '../../../../../types';
/**
 * Проверка на то, должна ли колонка отображаться в таблице
 * @function isFilterableColumn
 */
export function isFilterableColumn<TData extends object>(
  colDef: ColumnDefinition<TData>,
): colDef is FilterableColumnDefinition<TData> {
  return (
    ('id' in colDef || 'accessorKey' in colDef) &&
    'columnSettings' in colDef &&
    colDef.columnSettings?.mode !== 'hidden'
  );
}
