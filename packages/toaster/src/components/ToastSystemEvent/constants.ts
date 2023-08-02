import { OnColor } from '@snack-ui/link';

export enum ToastSystemEventAppearance {
  Neutral = 'neutral',
  Error = 'error',
  ErrorCritical = 'error-critical',
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
