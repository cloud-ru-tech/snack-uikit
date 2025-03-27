import { FilterableColumnDefinition } from '../../../types';
import { getColumnIdentifier } from './getColumnIdentifier';

export function sortColumnDefinitions(columnOrder: string[]) {
  return function sortColDefs<TData extends object>(
    colDefA: FilterableColumnDefinition<TData>,
    colDefB: FilterableColumnDefinition<TData>,
  ) {
    const indexItemA = columnOrder.findIndex(columnIndex => columnIndex === getColumnIdentifier(colDefA));
    const indexItemB = columnOrder.findIndex(columnIndex => columnIndex === getColumnIdentifier(colDefB));

    return indexItemA - indexItemB;
  };
}
