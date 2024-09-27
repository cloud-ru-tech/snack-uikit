import { DroplistProps } from '@snack-uikit/list';

import { ButtonVariant } from '../../types';

export function getPlacement({ variant }: { variant?: ButtonVariant }): DroplistProps['placement'] {
  if (variant === 'before') {
    return 'bottom-start';
  }

  if (variant === 'after') {
    return 'bottom-end';
  }
}
