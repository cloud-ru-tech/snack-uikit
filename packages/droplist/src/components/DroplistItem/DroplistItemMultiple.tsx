import { forwardRef } from 'react';

import { DroplistItem, DroplistItemProps } from '../../helperComponents';

export type DroplistItemMultipleProps = Omit<DroplistItemProps, 'variant'>;

export const DroplistItemMultiple = forwardRef<HTMLButtonElement, DroplistItemMultipleProps>(
  function DroplistItemMultiple(props, ref) {
    return <DroplistItem variant='multiple' ref={ref} {...props} />;
  },
);
