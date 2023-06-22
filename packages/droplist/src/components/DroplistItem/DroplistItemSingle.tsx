import { forwardRef } from 'react';

import { DroplistItem } from './DroplistItem';
import { BaseDroplistItemProps } from './types';

export type DroplistItemSingleProps = BaseDroplistItemProps & {
  checked: boolean;
  onChange(checked: boolean): void;
};

export const DroplistItemSingle = forwardRef<HTMLInputElement, DroplistItemSingleProps>((props, ref) => (
  <DroplistItem variant={DroplistItem.variants.Single} ref={ref} {...props} />
));
