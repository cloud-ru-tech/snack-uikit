export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const ICON_SIZE = {
  Xs: 16,
  S: 24,
} as const;

export const BUTTON_SIZE = {
  S: 's',
  M: 'm',
} as const;

export const BUTTON_SIZE_MAP = {
  [SIZE.S]: BUTTON_SIZE.S,
  [SIZE.M]: BUTTON_SIZE.M,
  [SIZE.L]: BUTTON_SIZE.M,
};
