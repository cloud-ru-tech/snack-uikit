export enum Size {
  S = 's',
  M = 'm',
}

export enum BarHideStrategy {
  Never = 'never',
  Leave = 'leave',
  Scroll = 'scroll',
  Move = 'move',
}

export enum Resize {
  None = 'none',
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Both = 'both',
}

export enum AutoscrollTo {
  Bottom = 'bottom',
  Right = 'right',
}

export const BAR_AUTO_HIDE_DELAY_MS = 100;

/*
 * Значение отступа до края контейнера при котором считается что контейнер проскролен до конца вниз или вправо, в пикселях.
 */
export const AUTOSCROLL_ENABLE_LIMIT = 2;
