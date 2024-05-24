import { CellContext } from '@tanstack/react-table';

import { TruncateString } from '@snack-uikit/truncate-string';

export const COLUMN_PIN_POSITION = {
  Left: 'left',
  Right: 'right',
} as const;

export const COLUMN_ALIGN = {
  Left: 'left',
  Right: 'right',
} as const;

export const TEST_IDS = {
  headerSortIndicator: 'table__header__sort-indicator',
  headerRow: 'table__header-row',
  headerCell: 'table__header-cell',
  bodyRow: 'table__body-row',
  bodyCell: 'table__body-cell',
  pinnedCells: 'table__pinned-cells',
  rowSelect: 'table__row-select',
  rowActions: {
    droplistTrigger: 'table__body-row__droplistTrigger',
    droplist: 'table__body-row__actions-droplist',
    option: 'list__base-item-option',
  },
  statusIndicator: 'table__status-indicator',
  statusLabel: 'table__status-label',
};

export const SORT_FN = {
  DateTime: 'datetime',
  AlphaNumeric: 'alphanumeric',
} as const;

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_COLUMN = {
  enableSorting: false,
  enableResizing: false,
  minSize: 40,
  // 'any' is used to bypass type-guard in table prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell: (cell: CellContext<any, unknown>) => <TruncateString text={String(cell.getValue())} maxLines={1} />,
};
