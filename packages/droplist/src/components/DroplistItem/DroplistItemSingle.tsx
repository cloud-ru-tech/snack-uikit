import { forwardRef } from 'react';

import { DroplistItem, DroplistItemProps } from '../../helperCompoonents';

export type DroplistItemSingleProps = Omit<DroplistItemProps, 'variant' | 'indeterminate'>;

export const DroplistItemSingle = forwardRef<HTMLButtonElement, DroplistItemSingleProps>(function DroplistItemSingle(
  props,
  ref,
) {
  return <DroplistItem variant={DroplistItem.variants.Single} ref={ref} {...props} />;
});
