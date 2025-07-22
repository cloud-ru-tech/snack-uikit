import { getSelectionCellColumnDef, getTreeColumnDef } from '../../../helperComponents';
import { ColumnDefinition } from '../../../types';
import { TableProps } from '../../types';

type GetTableColumnsDefinitionsProps<TData extends object> = {
  columnDefinitions: ColumnDefinition<TData>[];
  enableSelection: boolean;
  enableSelectPinned: boolean;
  expanding: TableProps<TData>['expanding'];
};

export function getTableColumnsDefinitions<TData extends object>({
  columnDefinitions,
  enableSelection,
  enableSelectPinned,
  expanding,
}: GetTableColumnsDefinitionsProps<TData>): ColumnDefinition<TData>[] {
  let cols: ColumnDefinition<TData>[] = columnDefinitions;
  if (enableSelection && !expanding) {
    cols = [getSelectionCellColumnDef(enableSelectPinned), ...cols];
  }
  if (expanding) {
    cols = [getTreeColumnDef({ ...expanding.expandingColumnDefinition, enableSelection }), ...cols];
  }
  return cols;
}
