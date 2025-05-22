import { ReactElement } from 'react';

import { ButtonProps } from '@snack-uikit/input-private';

import { useAddonButton, UseAddonProps } from './useAddonButton';

export function usePrefixButton({
  prefixIcon,
  ...props
}: Omit<UseAddonProps, 'type' | 'variant'> & { prefixIcon?: ReactElement }): ButtonProps {
  return useAddonButton({ ...props, icon: prefixIcon, type: 'prefix', variant: 'before' });
}
