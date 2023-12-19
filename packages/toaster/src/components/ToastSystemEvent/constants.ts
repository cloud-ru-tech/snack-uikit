import { LinkProps } from '@snack-uikit/link';
import { ValueOf } from '@snack-uikit/utils';

export const TOAST_SYSTEM_EVENT_APPEARANCE = {
  Neutral: 'neutral',
  Error: 'error',
  ErrorCritical: 'errorCritical',
  Warning: 'warning',
  Success: 'success',
} as const;

export const APPEARANCE_TO_ON_COLOR_MAP: Record<
  ValueOf<typeof TOAST_SYSTEM_EVENT_APPEARANCE>,
  LinkProps['appearance']
> = {
  [TOAST_SYSTEM_EVENT_APPEARANCE.Neutral]: 'invert-neutral',
  [TOAST_SYSTEM_EVENT_APPEARANCE.Error]: 'invert-neutral',
  [TOAST_SYSTEM_EVENT_APPEARANCE.ErrorCritical]: 'red',
  [TOAST_SYSTEM_EVENT_APPEARANCE.Warning]: 'invert-neutral',
  [TOAST_SYSTEM_EVENT_APPEARANCE.Success]: 'invert-neutral',
} as const;
