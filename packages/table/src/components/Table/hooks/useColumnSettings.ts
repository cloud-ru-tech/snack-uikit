import { useState } from 'react';

import { ColumnDefinition } from '../../../types';
import { TableProps } from '../../types';
import { getColumnIdentifier } from '../utils';

const validateSettingsLocalStorageValue = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(setting => typeof setting === 'string');

export function useColumnSettings<TData extends object, TFilter extends Record<string, unknown>>(
  columnDefinitions: ColumnDefinition<TData>[],
  savedState: TableProps<TFilter>['savedState'],
): [string[], (value: string[]) => void] {
  const localStorageKey = `${savedState?.id}_columnSettings`;

  const [enabledColumns, setEnabledColumns] = useState<string[]>(() => {
    const persistState = JSON.parse(localStorage.getItem(localStorageKey) || 'null');
    const persistValue: string[] | null = validateSettingsLocalStorageValue(persistState) ? persistState : null;

    return columnDefinitions
      .filter(colDef => {
        const columnIdentifier = getColumnIdentifier(colDef);

        if ('columnSettings' in colDef) {
          if (colDef.columnSettings?.mode === 'hidden') {
            return true;
          } else if (persistValue !== null && savedState?.columnSettings) {
            if (persistValue.find(el => el === columnIdentifier)) {
              return true;
            }

            return false;
          }

          return colDef.columnSettings?.mode !== 'defaultFalse';
        }

        return true;
      })
      .map(getColumnIdentifier);
  });

  return [
    enabledColumns,
    (value: string[]) => {
      if (savedState?.columnSettings) {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      }

      setEnabledColumns(value);
    },
  ];
}
