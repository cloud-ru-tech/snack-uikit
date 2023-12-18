export const APPEARANCE = {
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

export const TEXT_MODE = {
  Default: 'default',
  Accent: 'accent',
  OnAccent: 'on-accent',
} as const;
