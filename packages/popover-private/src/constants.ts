export enum Placement {
  Left = 'left',
  LeftStart = 'left-start',
  LeftEnd = 'left-end',

  Right = 'right',
  RightStart = 'right-start',
  RightEnd = 'right-end',

  Top = 'top',
  TopStart = 'top-start',
  TopEnd = 'top-end',

  Bottom = 'bottom',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end',
}

export enum Trigger {
  Click = 'click',
  Hover = 'hover',
  FocusVisible = 'focusVisible',
  Focus = 'focus',
  HoverAndFocusVisible = 'hoverAndFocusVisible',
  HoverAndFocus = 'hoverAndFocus',
  ClickAndFocusVisible = 'clickAndFocusVisible',
}

export enum PopoverWidthStrategy {
  Auto = 'auto',
  Gte = 'GreatThanOrEqual',
  Eq = 'Equal',
}

export enum PopoverHeightStrategy {
  Auto = 'auto',
  Lte = 'LessThanOrEqual',
  Eq = 'Equal',
}

export const DEFAULT_FALLBACK_PLACEMENTS = [
  Placement.Top,
  Placement.TopStart,
  Placement.TopEnd,
  Placement.RightStart,
  Placement.Right,
  Placement.RightEnd,
  Placement.Bottom,
  Placement.BottomEnd,
  Placement.BottomStart,
  Placement.LeftEnd,
  Placement.Left,
  Placement.LeftStart,
];
