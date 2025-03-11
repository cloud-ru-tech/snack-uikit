import { BaseItemProps, GroupSelectItemProps } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';
import { isBrowser } from '@snack-uikit/utils';

import { ColumnDefinition, FilterableColumnDefinition } from '../../types';
import { TableProps } from '../types';

export function getCurrentlyConfiguredHeaderWidth(id: string): number {
  if (isBrowser()) {
    const cell = document.querySelector<HTMLDivElement>(`[data-header-id="${id}"]`);
    const resizeHandler = cell?.querySelector<HTMLDivElement>(
      '[data-test-id="table__header-cell-resize-handle-moving-part"]',
    );

    if (cell) {
      const { width } = cell.getBoundingClientRect();

      if (resizeHandler) {
        const offset = parseInt(resizeHandler.style.getPropertyValue('--offset'));
        return width + offset;
      }

      return width;
    }
  }

  return 0;
}

export function getColumnStyleVars(id: string) {
  return {
    sizeKey: `--table-column-${id}-size`,
    flexKey: `--table-column-${id}-flex`,
  };
}

const RESIZED_KEY = 'RESIZED_COLUMN_KEY';

type GetSavedStateFromLocalStorageProps = {
  id: string;
  columnId: string;
};

type SavedState = {
  resizeState?: Record<string, string>;
};

export function getInitColumnSizeFromLocalStorage({ id, columnId }: GetSavedStateFromLocalStorageProps) {
  const savedStateFromStorage: SavedState | null = JSON.parse(localStorage.getItem(id || '') || 'null');

  if (savedStateFromStorage) {
    const currentSize = savedStateFromStorage.resizeState?.[`${RESIZED_KEY}-${columnId}`] as string | undefined;
    return currentSize;
  }
}

type SaveStateToLocalStorageProps = {
  id: string;
  columnId: string;
  size: string;
};

export function saveStateToLocalStorage({ id, columnId, size }: SaveStateToLocalStorageProps) {
  const savedStateFromStorage: SavedState | null = JSON.parse(localStorage.getItem(id) || 'null');

  const newResizeState: Record<string, string> = savedStateFromStorage?.resizeState || {};
  newResizeState[`${RESIZED_KEY}-${columnId}`] = size;

  localStorage.setItem(id, JSON.stringify({ ...(savedStateFromStorage || {}), resizeState: newResizeState }));
}

export function isFilterableColumn<TData extends object>(
  colDef: ColumnDefinition<TData>,
): colDef is FilterableColumnDefinition<TData> {
  return ('id' in colDef || 'accessorKey' in colDef) && 'headerConfigLabel' in colDef;
}

export function getColumnIdentifier<TData extends object>(colDef: ColumnDefinition<TData>): string {
  if ('id' in colDef && colDef.id) {
    return colDef.id;
  }

  // Either id or accessorKey is always present
  // eslint-disable-next-line
  // @ts-ignore
  return colDef.accessorKey as unknown as string;
}

export function prepareColumnsSettingsMap<TData extends object>(
  columnDefinitions: ColumnDefinition<TData>[],
): string[] {
  return columnDefinitions.filter(isFilterableColumn).map(getColumnIdentifier);
}

const sortColumnDefinitions = (columnOrder: string[]) =>
  function sortColDefs<TData extends object>(
    colDefA: FilterableColumnDefinition<TData>,
    colDefB: FilterableColumnDefinition<TData>,
  ) {
    const indexItemA = columnOrder.findIndex(columnIndex => columnIndex === getColumnIdentifier(colDefA));
    const indexItemB = columnOrder.findIndex(columnIndex => columnIndex === getColumnIdentifier(colDefB));

    return indexItemA - indexItemB;
  };

function createColumnsSettingsOption<TData extends object>(
  columnDefinition: FilterableColumnDefinition<TData>,
): BaseItemProps {
  return {
    id: getColumnIdentifier(columnDefinition),
    content: {
      option: columnDefinition.headerConfigLabel as string,
    },
    switch: true,
    showSwitchIcon: true,
  };
}

type ColumnGroups = {
  pinTop: BaseItemProps[];
  unpinned: BaseItemProps[];
  pinBottom: BaseItemProps[];
};

type PrepareColumnsSettingsProps<TData extends object> = {
  columnDefinitions: ColumnDefinition<TData>[];
  columnOrder: string[];
  areAllColumnsEnabled: boolean;
  t: ReturnType<typeof useLocale<'Table'>>['t'];
};

export function prepareColumnsSettings<TData extends object>({
  columnDefinitions,
  columnOrder,
  areAllColumnsEnabled,
  t,
}: PrepareColumnsSettingsProps<TData>): [GroupSelectItemProps] {
  const groupedItems = columnDefinitions
    .filter(isFilterableColumn)
    .sort(sortColumnDefinitions(columnOrder))
    .reduce(
      (accSettings: ColumnGroups, colDef: FilterableColumnDefinition<TData>) => {
        const item = createColumnsSettingsOption(colDef);

        switch (colDef.pinned) {
          case 'left':
            accSettings.pinTop.push(item);
            break;

          case 'right':
            accSettings.pinBottom.push(item);
            break;

          default:
            accSettings.unpinned.push(item);
        }

        return accSettings;
      },
      {
        pinTop: [],
        unpinned: [],
        pinBottom: [],
      },
    );

  return [
    {
      divider: false,
      items: [
        {
          divider: false,
          items: groupedItems.pinTop,
          type: 'group',
        },
        {
          divider: true,
          items: groupedItems.unpinned,
          type: 'group',
        },
        {
          divider: true,
          items: groupedItems.pinBottom,
          type: 'group',
        },
      ],
      selectButtonLabel: areAllColumnsEnabled ? t('groupSelectButton.hide') : t('groupSelectButton.show'),
      label: t('settingsHeaderLabel'),
      mode: 'primary',
      type: 'group-select',
    },
  ];
}

export function getInitialColumnsOpenValue<TData extends object>(columnFilters: TableProps<TData>['columnFilters']) {
  if (!columnFilters) {
    return false;
  }

  return 'initialOpen' in columnFilters && typeof columnFilters.initialOpen === 'boolean'
    ? columnFilters.initialOpen
    : true;
}
