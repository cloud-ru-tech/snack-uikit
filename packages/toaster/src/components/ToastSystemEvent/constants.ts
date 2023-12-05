import { OnColor } from '@snack-uikit/link';

export enum ToastSystemEventAppearance {
  Neutral = 'neutral',
  Error = 'error',
  ErrorCritical = 'errorCritical',
  Warning = 'warning',
  Success = 'success',
}

export const APPEARANCE_TO_ON_COLOR_MAP = {
  [ToastSystemEventAppearance.Neutral]: OnColor.InvertNeutral,
  [ToastSystemEventAppearance.Error]: OnColor.InvertNeutral,
  [ToastSystemEventAppearance.ErrorCritical]: OnColor.Red,
  [ToastSystemEventAppearance.Warning]: OnColor.InvertNeutral,
  [ToastSystemEventAppearance.Success]: OnColor.InvertNeutral,
} as const;
