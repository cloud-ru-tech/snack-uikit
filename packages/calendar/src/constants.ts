export enum ViewMode {
  Month = 'month',
  Year = 'year',
  Decade = 'decade',
}

export enum CalendarMode {
  Date = 'date',
  Range = 'range',
}

export enum InRangePosition {
  Out = 'out',
  Start = 'start',
  In = 'in',
  End = 'end',
  StartEnd = 'start-end',
}

export enum Size {
  S = 's',
  M = 'm',
}

export const GRID_SIZE = {
  [ViewMode.Month]: { rows: 6, columns: 7 },
  [ViewMode.Year]: { rows: 4, columns: 3 },
  [ViewMode.Decade]: { rows: 4, columns: 3 },
} as const;

export const AUTOFOCUS = 'autofocus';
