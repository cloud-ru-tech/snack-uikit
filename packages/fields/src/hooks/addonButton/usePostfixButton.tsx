import { ReactElement } from 'react';

import { ButtonProps } from '@snack-uikit/input-private';

import { useAddonButton, UseAddonProps } from './useAddonButton';

export function usePostfixButton({
  postfixIcon,
  ...props
}: Omit<UseAddonProps, 'type' | 'variant'> & { postfixIcon?: ReactElement }): ButtonProps {
  return useAddonButton({ ...props, icon: postfixIcon, type: 'postfix', variant: 'after' });
}
