import { ButtonFunctionProps } from '@snack-uikit/button';

export const SELECT_BUTTON_SIZE_MAP: Record<string, ButtonFunctionProps['size']> = {
  s: 'xs',
  m: 's',
  l: 'm',
} as const;
