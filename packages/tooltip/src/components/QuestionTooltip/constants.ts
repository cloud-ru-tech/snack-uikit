import { Tooltip } from '../Tooltip';

export enum Size {
  S = 's',
  Xs = 'xs',
}

export const SIZES_MAP = {
  [Size.Xs]: 16,
  [Size.S]: 24,
};

export enum Trigger {
  Hover = 'hover',
  Click = 'click',
}

export const TRIGGER_MAP = {
  [Trigger.Hover]: Tooltip.triggers.HoverAndFocusVisible,
  [Trigger.Click]: Tooltip.triggers.ClickAndFocusVisible,
};
