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
  tree: {
    node: 'tree__node',
    chevron: 'tree__chevron',
    checkbox: 'tree__checkbox',
    radio: 'tree__radio',
    icon: 'tree__icon',
  },
  rowActions: {
    droplistTrigger: 'table__body-row__droplistTrigger',
    droplist: 'table__body-row__actions-droplist',
    option: 'list__base-item-option',
  },
  statusIndicator: 'table__status-indicator',
  statusLabel: 'table__status-label',
  toolbar: 'table__toolbar',
};

export const SORT_FN = {
  DateTime: 'datetime',
  AlphaNumeric: 'alphanumeric',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
