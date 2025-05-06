import { ReactNode } from 'react';

export const getLayout = (icon?: ReactNode, label?: string, size?: string) => {
  if (size === 'xs') {
    return 'label-only';
  }

  if (icon && label) {
    return 'icon-before';
  }

  if (label) {
    return 'label-only';
  }

  return 'icon-only';
};
