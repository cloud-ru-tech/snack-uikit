import { ReactNode } from 'react';

export const getLayout = (icon?: ReactNode, label?: string) => {
  if (icon && label) {
    return 'icon-before';
  }

  if (label) {
    return 'label-only';
  }

  return 'icon-only';
};
