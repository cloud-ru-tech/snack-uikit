export const VIEW_MODE = {
  Month: 'month',
  Year: 'year',
  Decade: 'decade',
} as const;

export const CALENDAR_MODE = {
  Date: 'date',
  DateTime: 'date-time',
  Range: 'range',
  Month: 'month',
} as const;

export const IN_RANGE_POSITION = {
  Out: 'out',
  Start: 'start',
  In: 'in',
  End: 'end',
  StartEnd: 'start-end',
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const GRID_SIZE = {
  [VIEW_MODE.Month]: { rows: 6, columns: 7 },
  [VIEW_MODE.Year]: { rows: 4, columns: 3 },
  [VIEW_MODE.Decade]: { rows: 4, columns: 3 },
} as const;

export const AUTOFOCUS = 'autofocus';

export const HOURS = 24;
export const MINUTES = 60;
export const SECONDS = 60;
