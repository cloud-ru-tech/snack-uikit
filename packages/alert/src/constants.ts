import { ON_COLOR } from '@snack-uikit/link';

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
} as const;

export const APPEARANCE_TO_COLOR_MAP = {
  [APPEARANCE.Neutral]: ON_COLOR.Neutral,
  [APPEARANCE.Primary]: ON_COLOR.Primary,
  [APPEARANCE.Error]: ON_COLOR.Red,
  [APPEARANCE.Warning]: ON_COLOR.Yellow,
  [APPEARANCE.Success]: ON_COLOR.Green,
} as const;
