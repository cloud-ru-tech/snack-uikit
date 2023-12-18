import { APPEARANCE as LINK_APPEARANCE } from '@snack-uikit/link';

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
} as const;

export const APPEARANCE_TO_COLOR_MAP = {
  [APPEARANCE.Neutral]: LINK_APPEARANCE.Neutral,
  [APPEARANCE.Primary]: LINK_APPEARANCE.Primary,
  [APPEARANCE.Error]: LINK_APPEARANCE.Red,
  [APPEARANCE.Warning]: LINK_APPEARANCE.Yellow,
  [APPEARANCE.Success]: LINK_APPEARANCE.Green,
} as const;
