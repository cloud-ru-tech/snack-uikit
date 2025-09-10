import { isBrowser } from '@snack-uikit/utils';

import { ColumnDefinition } from '../../../../../types';
import { TableProps } from '../../../../types';
import { getColumnIdentifier, isEveryArrayItemString } from '../../../utils';
import { isColumnEnabledInitially } from './isColumnEnabledInitially';

function getSettingsFromLocalStorage(localStorageKey: string): string[] | null {
  if (isBrowser()) {
    const localStorageState = JSON.parse(localStorage.getItem(localStorageKey) || 'null');
    return isEveryArrayItemString(localStorageState) ? localStorageState : null;
  }

  return null;
}

export function getEnabledColumnsInitialState<TData extends object, TFilters extends Record<string, unknown>>(
  configurableColumns: ColumnDefinition<TData>[],
  savedState: TableProps<TFilters>['savedState'],
  localStorageKey: string,
) {
  const localStorageSettings = getSettingsFromLocalStorage(localStorageKey);

  return configurableColumns
    .filter(colDef => {
      const columnIdentifier = getColumnIdentifier(colDef);
      if (localStorageSettings && savedState?.columnSettings) {
        return Boolean(localStorageSettings.find(columnKey => columnKey === columnIdentifier));
      }
      return isColumnEnabledInitially(colDef);
    })
    .map(getColumnIdentifier);
}
