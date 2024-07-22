import { LinkProps } from '@snack-uikit/link';
import { ValueOf } from '@snack-uikit/utils';

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
  Info: 'info',
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
} as const;

export const APPEARANCE_TO_COLOR_MAP: Record<ValueOf<typeof APPEARANCE>, LinkProps['appearance']> = {
  [APPEARANCE.Neutral]: 'neutral',
  [APPEARANCE.Primary]: 'primary',
  [APPEARANCE.Error]: 'red',
  [APPEARANCE.Warning]: 'yellow',
  [APPEARANCE.Success]: 'green',
  [APPEARANCE.Info]: 'blue',
} as const;
