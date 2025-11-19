import { useCallback, useMemo, useState } from 'react';

import { useLocale } from '@snack-uikit/locale';
import { isBrowser } from '@snack-uikit/utils';

import { TableProps } from '../../../types';
import { getColumnIdentifier, getTableColumnsDefinitions, PinnedGroupsState } from '../../utils';
import {
  getEnabledColumnsInitialState,
  isColumnVisibilityConfigurable,
  isFilterableColumn,
  prepareColumnsSettings,
} from './utils';

type useColumnSettingsProps<TData extends object, TFilters extends Record<string, unknown>> = Pick<
  TableProps<TData, TFilters>,
  'columnDefinitions' | 'columnsSettings' | 'savedState' | 'rowSelection' | 'expanding'
> &
  Required<Pick<TableProps<TData, TFilters>, 'enableSelectPinned'>> & {
    pinnedGroups: PinnedGroupsState<TData>;
  };

export function useColumnSettings<TData extends object, TFilters extends Record<string, unknown>>({
  columnDefinitions,
  columnsSettings,
  pinnedGroups,
  savedState,
  rowSelection,
  enableSelectPinned,
  expanding,
}: useColumnSettingsProps<TData, TFilters>) {
  const { t } = useLocale('Table');
  const localStorageKey = `${savedState?.id}_columnSettings`;

  const configurableColumns = useMemo(
    () => columnDefinitions.filter(isColumnVisibilityConfigurable),
    [columnDefinitions],
  );
  const [enabledColumns, setEnabledColumns] = useState<string[]>(() =>
    getEnabledColumnsInitialState(configurableColumns, savedState, localStorageKey),
  );

  const setEnabledColumnsOuter = useCallback(
    (value: string[]) => {
      if (savedState?.columnSettings && isBrowser()) {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      }

      setEnabledColumns(value);
    },
    [localStorageKey, savedState?.columnSettings],
  );

  const areColumnsSettingsEnabled = Boolean(columnsSettings?.enableSettingsMenu);
  const enabledColumnsDefinitions = useMemo(() => {
    if (!areColumnsSettingsEnabled) {
      return columnDefinitions;
    }

    return columnDefinitions.filter(colDef => {
      if (isFilterableColumn(colDef)) {
        return enabledColumns.includes(getColumnIdentifier(colDef));
      }

      return true;
    });
  }, [columnDefinitions, enabledColumns, areColumnsSettingsEnabled]);

  const enableSelection = Boolean(rowSelection?.enable);
  const enabledTableColumns = useMemo(
    () =>
      getTableColumnsDefinitions({
        columnDefinitions: enabledColumnsDefinitions,
        enableSelection,
        enableSelectPinned,
        expanding,
        rowSelectionAppearance: rowSelection?.appearance,
      }),
    [enableSelectPinned, enableSelection, enabledColumnsDefinitions, expanding, rowSelection?.appearance],
  );

  const areAllColumnsEnabled = enabledColumns.length === configurableColumns.length;
  const getColumnsSettings = useCallback(
    (columnOrder: string[]) =>
      prepareColumnsSettings({
        pinnedGroups,
        columnOrder,
        areAllColumnsEnabled,
        t,
      }),
    [areAllColumnsEnabled, pinnedGroups, t],
  );

  return {
    enabledColumns,
    setEnabledColumns: setEnabledColumnsOuter,

    enabledColumnsDefinitions,
    enabledTableColumns,
    getColumnsSettings,

    areColumnsSettingsEnabled,
  };
}
