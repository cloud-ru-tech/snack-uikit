import { ProgressBarProps } from '@snack-uikit/progress-bar';

import { ToastUploadStatus } from './types';

export const TOAST_UPLOAD_STATUS = {
  Loading: 'loading',
  Pause: 'pause',
  Error: 'error',
  Uploaded: 'uploaded',
  ErrorUploaded: 'errorUploaded',
} as const;

export const TOAST_UPLOAD_ITEM_STATUS = {
  Loading: 'loading',
  Pause: 'pause',
  Error: 'error',
  Uploaded: 'uploaded',
} as const;

export const progressBarAppearanceByStatus: Record<ToastUploadStatus, ProgressBarProps['appearance']> = {
  pause: 'neutral',
  loading: 'green',
  uploaded: 'green',
  errorUploaded: 'red',
  error: 'red',
};
