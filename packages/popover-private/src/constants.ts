export const PLACEMENT = {
  Left: 'left',
  LeftStart: 'left-start',
  LeftEnd: 'left-end',

  Right: 'right',
  RightStart: 'right-start',
  RightEnd: 'right-end',

  Top: 'top',
  TopStart: 'top-start',
  TopEnd: 'top-end',

  Bottom: 'bottom',
  BottomStart: 'bottom-start',
  BottomEnd: 'bottom-end',
} as const;

export const TRIGGER = {
  Click: 'click',
  Hover: 'hover',
  FocusVisible: 'focusVisible',
  Focus: 'focus',
  HoverAndFocusVisible: 'hoverAndFocusVisible',
  HoverAndFocus: 'hoverAndFocus',
  ClickAndFocusVisible: 'clickAndFocusVisible',
} as const;

export const POPOVER_WIDTH_STRATEGY = {
  Auto: 'auto',
  Gte: 'gte',
  Eq: 'eq',
} as const;

export const POPOVER_HEIGHT_STRATEGY = {
  Auto: 'auto',
  Lte: 'lte',
  Eq: 'eq',
} as const;

export const DEFAULT_FALLBACK_PLACEMENTS = [
  PLACEMENT.Top,
  PLACEMENT.TopStart,
  PLACEMENT.TopEnd,
  PLACEMENT.RightStart,
  PLACEMENT.Right,
  PLACEMENT.RightEnd,
  PLACEMENT.Bottom,
  PLACEMENT.BottomEnd,
  PLACEMENT.BottomStart,
  PLACEMENT.LeftEnd,
  PLACEMENT.Left,
  PLACEMENT.LeftStart,
];
