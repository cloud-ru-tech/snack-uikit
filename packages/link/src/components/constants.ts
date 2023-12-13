export const ON_COLOR = {
  InvertNeutral: 'invert-neutral',
  Neutral: 'neutral',
  Primary: 'primary',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const TARGET = {
  Self: '_self',
  Blank: '_blank',
  Parent: '_parent',
  Top: '_top',
} as const;

export const ON_SURFACE = {
  Background: 'background',
  Decor: 'decor',
  Accent: 'accent',
} as const;
