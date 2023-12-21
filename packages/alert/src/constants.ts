import { LinkProps } from '@snack-uikit/link';
import { ValueOf } from '@snack-uikit/utils';

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
} as const;

export const APPEARANCE_TO_COLOR_MAP: Record<ValueOf<typeof APPEARANCE>, LinkProps['appearance']> = {
  [APPEARANCE.Neutral]: 'neutral',
  [APPEARANCE.Primary]: 'primary',
  [APPEARANCE.Error]: 'red',
  [APPEARANCE.Warning]: 'yellow',
  [APPEARANCE.Success]: 'green',
} as const;
