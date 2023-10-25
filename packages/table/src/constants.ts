export enum ColumnPinPosition {
  Left = 'left',
  Right = 'right',
}

export enum ColumnAlign {
  Left = 'left',
  Right = 'right',
}

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
    option: 'table__body-row__action-option',
  },
  statusIndicator: 'table__status-indicator',
  statusLabel: 'table__status-label',
};

export enum SortFn {
  DateTime = 'datetime',
  AlphaNumeric = 'alphanumeric',
}
