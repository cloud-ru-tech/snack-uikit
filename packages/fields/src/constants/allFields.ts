export const VALIDATION_STATE = {
  Default: 'default',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
} as const;

export const CONTAINER_VARIANT = {
  SingleLine: 'single-line-container',
  SingleLineButtonBefore: 'single-line-container-button-before',
  SingleLineButtonAfter: 'single-line-container-button-after',
  MultiLine: 'multi-line-container',
} as const;

export const BUTTON_VARIANT = {
  Before: 'before',
  After: 'after',
} as const;
