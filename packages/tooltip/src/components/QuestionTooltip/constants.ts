import { TRIGGER as POPOVER_TRIGGER } from '@snack-uikit/popover-private';

export const SIZE = {
  S: 's',
  Xs: 'xs',
} as const;

export const SIZES_MAP = {
  [SIZE.Xs]: 16,
  [SIZE.S]: 24,
};

export const TRIGGER = {
  Hover: 'hover',
  Click: 'click',
} as const;

export const TRIGGER_MAP = {
  [TRIGGER.Hover]: POPOVER_TRIGGER.HoverAndFocusVisible,
  [TRIGGER.Click]: POPOVER_TRIGGER.ClickAndFocusVisible,
};
