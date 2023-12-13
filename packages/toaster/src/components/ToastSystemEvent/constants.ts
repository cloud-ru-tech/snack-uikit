import { ON_COLOR } from '@snack-uikit/link';

export enum ToastSystemEventAppearance {
  Neutral = 'neutral',
  Error = 'error',
  ErrorCritical = 'errorCritical',
  Warning = 'warning',
  Success = 'success',
}

export const APPEARANCE_TO_ON_COLOR_MAP = {
  [ToastSystemEventAppearance.Neutral]: ON_COLOR.InvertNeutral,
  [ToastSystemEventAppearance.Error]: ON_COLOR.InvertNeutral,
  [ToastSystemEventAppearance.ErrorCritical]: ON_COLOR.Red,
  [ToastSystemEventAppearance.Warning]: ON_COLOR.InvertNeutral,
  [ToastSystemEventAppearance.Success]: ON_COLOR.InvertNeutral,
} as const;
