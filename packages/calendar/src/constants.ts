export enum ViewLevel {
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
  [ViewLevel.Month]: { rows: 6, columns: 7 },
  [ViewLevel.Year]: { rows: 4, columns: 3 },
  [ViewLevel.Decade]: { rows: 4, columns: 3 },
} as const;

export const AUTOFOCUS = 'autofocus';
