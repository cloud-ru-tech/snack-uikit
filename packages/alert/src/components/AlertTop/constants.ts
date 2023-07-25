import { Appearance } from '../../constants';

export enum Color {
  InvertNeutral = 'invert-neutral',
  Primary = 'primary',
  Red = 'red',
  Yellow = 'yellow',
  Green = 'green',
}

export const APPEARANCE_TO_COLOR_MAP_INVERT = {
  [Appearance.Neutral]: Color.InvertNeutral,
  [Appearance.Primary]: Color.Primary,
  [Appearance.Error]: Color.Red,
  [Appearance.Warning]: Color.Yellow,
  [Appearance.Success]: Color.Green,
} as const;
