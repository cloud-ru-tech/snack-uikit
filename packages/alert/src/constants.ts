import { OnColor } from '@snack-ui/link';

export enum Appearance {
  Neutral = 'neutral',
  Primary = 'primary',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export const APPEARANCE_TO_COLOR_MAP = {
  [Appearance.Neutral]: OnColor.Neutral,
  [Appearance.Primary]: OnColor.Primary,
  [Appearance.Error]: OnColor.Red,
  [Appearance.Warning]: OnColor.Yellow,
  [Appearance.Success]: OnColor.Green,
} as const;
