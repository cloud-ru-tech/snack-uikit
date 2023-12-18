import { APPEARANCE } from '@snack-uikit/link';

export enum ToastSystemEventAppearance {
  Neutral = 'neutral',
  Error = 'error',
  ErrorCritical = 'errorCritical',
  Warning = 'warning',
  Success = 'success',
}

export const APPEARANCE_TO_ON_COLOR_MAP = {
  [ToastSystemEventAppearance.Neutral]: APPEARANCE.InvertNeutral,
  [ToastSystemEventAppearance.Error]: APPEARANCE.InvertNeutral,
  [ToastSystemEventAppearance.ErrorCritical]: APPEARANCE.Red,
  [ToastSystemEventAppearance.Warning]: APPEARANCE.InvertNeutral,
  [ToastSystemEventAppearance.Success]: APPEARANCE.InvertNeutral,
} as const;
