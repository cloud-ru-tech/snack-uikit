export const SIZE = {
  S: 's',
  M: 'm',
} as const;

export const BAR_HIDE_STRATEGY = {
  Never: 'never',
  Leave: 'leave',
  Scroll: 'scroll',
  Move: 'move',
} as const;

export const RESIZE = {
  None: 'none',
  Horizontal: 'horizontal',
  Vertical: 'vertical',
  Both: 'both',
} as const;

export const AUTOSCROLL_TO = {
  Bottom: 'bottom',
  Right: 'right',
} as const;

export const BAR_AUTO_HIDE_DELAY_MS = 100;

/*
 * Значение отступа до края контейнера при котором считается что контейнер проскролен до конца вниз или вправо, в пикселях.
 */
export const AUTOSCROLL_ENABLE_LIMIT = 2;
