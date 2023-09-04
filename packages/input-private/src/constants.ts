export enum Size {
  S = 's',
  M = 'm',
  L = 'l',
}

export enum IconSize {
  Xs = 16,
  S = 24,
}

export enum ButtonSize {
  S = 's',
  M = 'm',
}

export const BUTTON_SIZE_MAP = {
  [Size.S]: ButtonSize.S,
  [Size.M]: ButtonSize.M,
  [Size.L]: ButtonSize.M,
};
