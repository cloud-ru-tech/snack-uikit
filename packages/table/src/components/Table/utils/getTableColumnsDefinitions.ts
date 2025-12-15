import { getSelectionCellColumnDef, getTreeColumnDef } from '../../../helperComponents';
import { ColumnDefinition } from '../../../types';
import { RowAppearance, TableProps } from '../../types';

type GetTableColumnsDefinitionsProps<TData extends object> = {
  columnDefinitions: ColumnDefinition<TData>[];
  enableSelection: boolean;
  enableSelectPinned: boolean;
  expanding: TableProps<TData>['expanding'];
  rowSelectionAppearance?: RowAppearance;
};

/**
 * Получение фактического списка columnDefinitions с учётом всевозможных настроек
 * @function getTableColumnsDefinitions
 */
export function getTableColumnsDefinitions<TData extends object>({
  columnDefinitions,
  enableSelection,
  enableSelectPinned,
  expanding,
  rowSelectionAppearance = RowAppearance.Disabled,
}: GetTableColumnsDefinitionsProps<TData>): ColumnDefinition<TData>[] {
  let cols: ColumnDefinition<TData>[] = columnDefinitions;
  if (enableSelection && !expanding) {
    cols = [getSelectionCellColumnDef(enableSelectPinned), ...cols];
  }
  if (expanding) {
    cols = [
      getTreeColumnDef({ ...expanding.expandingColumnDefinition, enableSelection, rowSelectionAppearance }),
      ...cols,
    ];
  }
  return cols;
}
